import {backgroundColor, flowRamp, minDevicePixelRatio} from "./constants"
import {addPointerFluid, getFluidIndex, getOrCreateFluidField, stepFluid} from "./fluid"
import {getGridMetrics, getResponsiveFontSize, setCanvasFont} from "./layout"
import {FluidField, GridMetrics, PointerState} from "./types"

const fluidVisibilityThreshold = 0.012

export const resizeCanvas = (canvas: HTMLCanvasElement): void => {
    const rect = canvas.getBoundingClientRect()
    const devicePixelRatio = Math.max(window.devicePixelRatio || minDevicePixelRatio, minDevicePixelRatio)
    const width = Math.max(1, Math.round(rect.width * devicePixelRatio))
    const height = Math.max(1, Math.round(rect.height * devicePixelRatio))

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
    }
}

const getFluidStyle = (density: number, speed: number): string => {
    const hue = 182 + Math.min(100, speed * 58 + density * 28)
    const saturation = Math.min(100, 78 + density * 75)
    const lightness = Math.min(84, 48 + density * 82 + speed * 10)

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const getFlowCharacter = (density: number, speed: number): string => {
    const rampIndex = Math.min(
        flowRamp.length - 1,
        Math.floor(Math.min(1, density * 1.25 + speed * 0.18) * (flowRamp.length - 1)),
    )

    return flowRamp[rampIndex]
}

const drawFluidField = (
    context: CanvasRenderingContext2D,
    fluidField: FluidField,
    metrics: GridMetrics,
): void => {
    context.save()
    context.textAlign = "center"
    context.textBaseline = "middle"

    const centerColumn = (fluidField.columns - 1) / 2
    const centerRow = (fluidField.rows - 1) / 2

    for (let row = 0; row < fluidField.rows; row += 1) {
        for (let column = 0; column < fluidField.columns; column += 1) {
            const index = getFluidIndex(fluidField.columns, column, row)
            const density = fluidField.density[index]

            if (density < fluidVisibilityThreshold) {
                continue
            }

            const speed = Math.hypot(fluidField.velocityX[index], fluidField.velocityY[index])

            context.globalAlpha = Math.min(0.34, 0.035 + density * 0.24)
            context.fillStyle = getFluidStyle(density, speed)
            context.fillText(
                getFlowCharacter(density, speed),
                metrics.centerX + (column - centerColumn) * metrics.cellWidth,
                metrics.centerY + (row - centerRow) * metrics.cellHeight,
            )
        }
    }

    context.restore()
}

export const drawAsciiBackground = (
    canvas: HTMLCanvasElement,
    fluidField: FluidField | null,
    pointer: PointerState,
    elapsedSeconds: number,
    deltaSeconds: number,
): FluidField | null => {
    const context = canvas.getContext("2d")

    if (!context) {
        return fluidField
    }

    const rect = canvas.getBoundingClientRect()
    const devicePixelRatio = Math.max(window.devicePixelRatio || minDevicePixelRatio, minDevicePixelRatio)

    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    context.clearRect(0, 0, rect.width, rect.height)
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, rect.width, rect.height)

    const fontSize = getResponsiveFontSize(context, rect.width)

    setCanvasFont(context, fontSize)
    context.textAlign = "center"
    context.textBaseline = "middle"

    const metrics = getGridMetrics(context, rect.width, rect.height, fontSize)
    const nextFluidField = getOrCreateFluidField(fluidField, rect.width, rect.height, metrics.cellWidth, metrics.cellHeight)

    if (pointer.isInside) {
        addPointerFluid(nextFluidField, pointer, metrics, elapsedSeconds)
    }

    stepFluid(nextFluidField, {
        elapsedSeconds,
        deltaSeconds,
    })

    drawFluidField(context, nextFluidField, metrics)

    return nextFluidField
}
