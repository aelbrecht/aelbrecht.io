import {backgroundColor, emailText, flowRamp, foregroundColor, glitchRamp, minDevicePixelRatio} from "./constants"
import {addPointerFluid, getFluidIndex, getOrCreateFluidField, stepFluid} from "./fluid"
import {getGridMetrics, getResponsiveFontSize, setCanvasFont} from "./layout"
import {FluidField, GlitchState, GridMetrics, PointerState} from "./types"

const fluidVisibilityThreshold = 0.012
const textColorThreshold = 0.035
const textOverwriteThreshold = 0.18
const textGlitchThreshold = 0.38

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

const clamp = (value: number, min: number, max: number): number => (
    Math.max(min, Math.min(max, value))
)

const getFluidStyle = (density: number, speed: number, textBoost = 1): string => {
    const hue = 182 + Math.min(100, speed * 58 + density * 28)
    const saturation = Math.min(100, 78 + density * 75 * textBoost)
    const lightness = Math.min(84, 48 + density * 82 * textBoost + speed * 10)

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const getFlowCharacter = (density: number, speed: number): string => {
    const rampIndex = Math.min(
        flowRamp.length - 1,
        Math.floor(Math.min(1, density * 1.25 + speed * 0.18) * (flowRamp.length - 1)),
    )

    return flowRamp[rampIndex]
}

const getGlitchCharacter = (column: number, row: number, elapsedSeconds: number): string => {
    const value = Math.abs(Math.sin(column * 91.7 + row * 57.3 + elapsedSeconds * 17.9))
    const index = Math.min(glitchRamp.length - 1, Math.floor(value * glitchRamp.length))

    return glitchRamp[index]
}

const getFluidSampleAtPosition = (
    fluidField: FluidField,
    metrics: GridMetrics,
    x: number,
    y: number,
): {column: number, row: number, density: number, speed: number} => {
    const centerColumn = (fluidField.columns - 1) / 2
    const centerRow = (fluidField.rows - 1) / 2
    const column = clamp(Math.round((x - metrics.centerX) / metrics.cellWidth + centerColumn), 0, fluidField.columns - 1)
    const row = clamp(Math.round((y - metrics.centerY) / metrics.cellHeight + centerRow), 0, fluidField.rows - 1)
    const index = getFluidIndex(fluidField.columns, column, row)

    return {
        column,
        row,
        density: fluidField.density[index],
        speed: Math.hypot(fluidField.velocityX[index], fluidField.velocityY[index]),
    }
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

const drawMergedGlyph = (
    context: CanvasRenderingContext2D,
    fluidField: FluidField,
    metrics: GridMetrics,
    glitchState: GlitchState,
    elapsedSeconds: number,
    key: string,
    character: string,
    x: number,
    y: number,
): void => {
    const sample = getFluidSampleAtPosition(fluidField, metrics, x, y)
    const existingGlitch = glitchState.get(key)
    const hasActiveGlitch = existingGlitch !== undefined && existingGlitch.expiresAt > elapsedSeconds
    const shouldStartGlitch = sample.density >= textGlitchThreshold
        && (!hasActiveGlitch || Math.random() < 0.035 + sample.density * 0.08)

    if (shouldStartGlitch) {
        glitchState.set(key, {
            character: getGlitchCharacter(sample.column, sample.row, elapsedSeconds),
            expiresAt: elapsedSeconds + 0.1 + Math.random() * 0.36,
        })
    } else if (existingGlitch && existingGlitch.expiresAt <= elapsedSeconds && sample.density < textColorThreshold) {
        glitchState.delete(key)
    }

    const activeGlitch = glitchState.get(key)
    const nextCharacter = activeGlitch && activeGlitch.expiresAt > elapsedSeconds
        ? activeGlitch.character
        : sample.density >= textOverwriteThreshold
            ? getFlowCharacter(sample.density, sample.speed)
            : character

    context.globalAlpha = 1
    context.fillStyle = sample.density >= textColorThreshold || activeGlitch
        ? getFluidStyle(Math.max(sample.density, 0.2), sample.speed, 1.6)
        : foregroundColor
    context.fillText(nextCharacter, x, y)
}

const drawEmail = (
    context: CanvasRenderingContext2D,
    fluidField: FluidField,
    metrics: GridMetrics,
    glitchState: GlitchState,
    elapsedSeconds: number,
): void => {
    context.save()
    context.textAlign = "center"
    context.textBaseline = "middle"

    const firstColumn = -(emailText.length - 1) / 2

    Array.from(emailText).forEach((character, index) => {
        drawMergedGlyph(
            context,
            fluidField,
            metrics,
            glitchState,
            elapsedSeconds,
            `email:${index}`,
            character,
            metrics.centerX + (firstColumn + index) * metrics.cellWidth,
            metrics.centerY,
        )
    })

    context.restore()
}

export const drawAsciiBackground = (
    canvas: HTMLCanvasElement,
    fluidField: FluidField | null,
    glitchState: GlitchState,
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
    drawEmail(context, nextFluidField, metrics, glitchState, elapsedSeconds)

    return nextFluidField
}
