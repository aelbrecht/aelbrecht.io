import {lineGap, lineHeightRatio, maxFontSize, minFontSize} from "./constants"
import {GridMetrics} from "./types"

export const getCanvasMargin = (canvasWidth: number): number => (
    canvasWidth < 520 ? 16 : 40
)

export const setCanvasFont = (context: CanvasRenderingContext2D, fontSize: number): void => {
    context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`
}

export const getResponsiveFontSize = (context: CanvasRenderingContext2D, canvasWidth: number): number => {
    const margin = getCanvasMargin(canvasWidth)
    const availableWidth = canvasWidth - margin * 2
    const minColumns = 17

    for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize -= 1) {
        setCanvasFont(context, fontSize)

        if (minColumns * (Math.ceil(context.measureText("M").width) + lineGap) <= availableWidth) {
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
