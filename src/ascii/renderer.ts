import {backgroundColor, flowRamp, footerLinks, foregroundColor, glitchRamp, minDevicePixelRatio} from "./constants"
import {addPointerFluid, getFluidIndex, getOrCreateFluidField, stepFluid} from "./fluid"
import {
    getFooterBounds,
    getFooterLayout,
    getGridMetrics,
    getGridPosition,
    getResponsiveFontSize,
    setCanvasFont,
} from "./layout"
import {createCenteredTextCells, getTextCellKey} from "./text-grid"
import {FluidField, FooterLayout, GlitchState, GridMetrics, LinkTarget, PointerState, RenderResult} from "./types"

const textCells = createCenteredTextCells()
const fluidVisibilityThreshold = 0.012
const textColorThreshold = 0.035
const textOverwriteThreshold = 0.18
const textGlitchThreshold = 0.38
const linkHighlightColor = "#9eeaff"

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

const drawMergedTextGrid = (
    context: CanvasRenderingContext2D,
    metrics: GridMetrics,
    fluidField: FluidField,
    glitchState: GlitchState,
    elapsedSeconds: number,
): void => {
    context.save()
    context.textAlign = "center"
    context.textBaseline = "middle"

    for (const textCell of textCells) {
        const key = getTextCellKey(textCell.column, textCell.row)
        const {column: x, row: y} = getGridPosition(metrics, textCell)

        drawMergedGlyph(context, fluidField, metrics, glitchState, elapsedSeconds, `profile:${key}`, textCell.character, x, y)
    }

    context.restore()
}

const drawMergedTextLine = (
    context: CanvasRenderingContext2D,
    fluidField: FluidField,
    metrics: GridMetrics,
    glitchState: GlitchState,
    elapsedSeconds: number,
    text: string,
    x: number,
    y: number,
    alignment: CanvasTextAlign,
    keyPrefix: string,
    isStable = false,
): void => {
    const startX = alignment === "center"
        ? x - (text.length * metrics.cellWidth) / 2 + metrics.cellWidth / 2
        : alignment === "right"
            ? x - text.length * metrics.cellWidth + metrics.cellWidth / 2
            : x + metrics.cellWidth / 2

    Array.from(text).forEach((character, index) => {
        if (character === " ") {
            return
        }

        if (isStable) {
            context.globalAlpha = 1
            context.fillStyle = linkHighlightColor
            context.fillText(character, startX + index * metrics.cellWidth, y)

            return
        }

        drawMergedGlyph(
            context,
            fluidField,
            metrics,
            glitchState,
            elapsedSeconds,
            `${keyPrefix}:${index}`,
            character,
            startX + index * metrics.cellWidth,
            y,
        )
    })
}

const getLinkTarget = (
    id: string,
    href: string,
    text: string,
    x: number,
    y: number,
    alignment: CanvasTextAlign,
    metrics: GridMetrics,
): LinkTarget => {
    const left = alignment === "center"
        ? x - (text.length * metrics.cellWidth) / 2
        : alignment === "right"
            ? x - text.length * metrics.cellWidth
            : x

    return {
        id,
        href,
        left,
        right: left + text.length * metrics.cellWidth,
        top: y - metrics.cellHeight / 2,
        bottom: y + metrics.cellHeight / 2,
    }
}

const drawMergedFooter = (
    context: CanvasRenderingContext2D,
    fluidField: FluidField,
    metrics: GridMetrics,
    glitchState: GlitchState,
    elapsedSeconds: number,
    canvasWidth: number,
    footerLayout: FooterLayout,
    hoveredLinkId: string | null,
): LinkTarget[] => {
    const {left, right} = getFooterBounds(canvasWidth)
    const linkTargets: LinkTarget[] = []

    context.save()
    context.textAlign = "center"
    context.textBaseline = "middle"

    if (footerLayout.isStacked) {
        footerLinks.forEach(({id, label, href}, index) => {
            const y = footerLayout.topY + index * metrics.cellHeight

            linkTargets.push(getLinkTarget(id, href, label, canvasWidth / 2, y, "center", metrics))
            drawMergedTextLine(
                context,
                fluidField,
                metrics,
                glitchState,
                elapsedSeconds,
                label,
                canvasWidth / 2,
                y,
                "center",
                `footer-stacked:${index}`,
                hoveredLinkId === id,
            )
        })
        context.restore()

        return linkTargets
    }

    linkTargets.push(getLinkTarget(footerLinks[0].id, footerLinks[0].href, footerLinks[0].label, left, footerLayout.y, "left", metrics))
    linkTargets.push(getLinkTarget(footerLinks[1].id, footerLinks[1].href, footerLinks[1].label, canvasWidth / 2, footerLayout.y, "center", metrics))
    linkTargets.push(getLinkTarget(footerLinks[2].id, footerLinks[2].href, footerLinks[2].label, right, footerLayout.y, "right", metrics))

    drawMergedTextLine(context, fluidField, metrics, glitchState, elapsedSeconds, footerLinks[0].label, left, footerLayout.y, "left", "footer-left", hoveredLinkId === footerLinks[0].id)
    drawMergedTextLine(context, fluidField, metrics, glitchState, elapsedSeconds, footerLinks[1].label, canvasWidth / 2, footerLayout.y, "center", "footer-center", hoveredLinkId === footerLinks[1].id)
    drawMergedTextLine(context, fluidField, metrics, glitchState, elapsedSeconds, footerLinks[2].label, right, footerLayout.y, "right", "footer-right", hoveredLinkId === footerLinks[2].id)
    context.restore()

    return linkTargets
}

export const drawAsciiLanding = (
    canvas: HTMLCanvasElement,
    fluidField: FluidField | null,
    glitchState: GlitchState,
    pointer: PointerState,
    hoveredLinkId: string | null,
    elapsedSeconds: number,
    deltaSeconds: number,
): RenderResult => {
    const context = canvas.getContext("2d")

    if (!context) {
        return {
            fluidField,
            linkTargets: [],
        }
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
    const footerLayout = getFooterLayout(context, rect.width, rect.height, metrics.cellHeight)
    const nextFluidField = getOrCreateFluidField(fluidField, rect.width, rect.height, metrics.cellWidth, metrics.cellHeight)

    if (pointer.isInside) {
        addPointerFluid(nextFluidField, pointer, metrics, elapsedSeconds)
    }

    stepFluid(nextFluidField, {
        elapsedSeconds,
        deltaSeconds,
    })

    drawFluidField(context, nextFluidField, metrics)
    drawMergedTextGrid(context, metrics, nextFluidField, glitchState, elapsedSeconds)
    const linkTargets = drawMergedFooter(
        context,
        nextFluidField,
        metrics,
        glitchState,
        elapsedSeconds,
        rect.width,
        footerLayout,
        hoveredLinkId,
    )

    return {
        fluidField: nextFluidField,
        linkTargets,
    }
}
