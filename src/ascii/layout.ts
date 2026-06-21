import {
    footerLabels,
    footerMaxWidth,
    lineGap,
    lineHeightRatio,
    maxFontSize,
    minFontSize,
    profileLines,
} from "./constants"
import {FooterLayout, GridMetrics, GridPoint} from "./types"

export const getGridPosition = (
    {cellWidth, cellHeight, centerX, centerY}: GridMetrics,
    {column, row}: GridPoint,
): GridPoint => ({
    column: centerX + column * cellWidth,
    row: centerY + row * cellHeight,
})

export const getCanvasMargin = (canvasWidth: number): number => (
    canvasWidth < 520 ? 16 : 40
)

export const setCanvasFont = (context: CanvasRenderingContext2D, fontSize: number): void => {
    context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`
}

const getMaxTextWidth = (context: CanvasRenderingContext2D, labels: string[]): number => (
    Math.max(...labels.map(label => context.measureText(label).width))
)

export const getResponsiveFontSize = (context: CanvasRenderingContext2D, canvasWidth: number): number => {
    const margin = getCanvasMargin(canvasWidth)
    const availableWidth = canvasWidth - margin * 2
    const labels = [...profileLines, ...footerLabels]

    for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 1) {
        setCanvasFont(context, fontSize)

        if (getMaxTextWidth(context, labels) <= availableWidth) {
            return fontSize
        }
    }

    return minFontSize
}

export const getGridMetrics = (
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    fontSize: number,
): GridMetrics => ({
    cellWidth: Math.ceil(context.measureText("M").width) + lineGap,
    cellHeight: Math.ceil(fontSize * lineHeightRatio),
    centerX: canvasWidth / 2,
    centerY: canvasHeight / 2,
})

export const getFooterLayout = (
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    cellHeight: number,
): FooterLayout => {
    const margin = getCanvasMargin(canvasWidth)
    const footerGap = canvasWidth < 700 ? 0 : 44
    const totalFooterWidth = footerLabels.reduce(
        (total, label) => total + context.measureText(label).width,
        footerGap * (footerLabels.length - 1),
    )
    const isStacked = totalFooterWidth > canvasWidth - margin * 2
    const bottomY = canvasHeight - Math.max(20, margin)
    const topY = isStacked ? bottomY - (footerLabels.length - 1) * cellHeight : bottomY

    return {
        isStacked,
        topY,
        y: bottomY,
    }
}

export const getFooterBounds = (canvasWidth: number): {left: number, right: number} => {
    const margin = getCanvasMargin(canvasWidth)
    const width = Math.min(canvasWidth - margin * 2, footerMaxWidth)
    const left = (canvasWidth - width) / 2

    return {
        left,
        right: left + width,
    }
}
