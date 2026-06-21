import {FC, useEffect, useRef} from "react";
import portraitUrl from "../images/rudolf-pixels.jpg"

const minDevicePixelRatio = 1
const maxFontSize = 18
const minFontSize = 11
const minPortraitFontSize = 6
const lineHeightRatio = 1.35
const lineGap = 2
const decoratedLayoutWidth = 1240
const dividerHalfRows = 11
const portraitScale = 3
const portraitColumns = 32 * portraitScale
const portraitRows = 22 * portraitScale
const portraitRamp = " .,:;irsXA253hMHGS#9B&@"
const profileLines = ["Rudolf Aelbrecht", "Senior Software Engineer", "C++  Go  TypeScript  React"]
const footerLabels = [
    "[ mail ] rudolf@aelbrecht.io",
    "[ in ] LinkedIn /aelbrecht",
    "[ git ] GitHub /aelbrecht",
]

type GridMetrics = {
    cellWidth: number
    cellHeight: number
    centerX: number
    centerY: number
}

type GridPoint = {
    column: number
    row: number
}

type FooterLayout = {
    isStacked: boolean
    topY: number
    y: number
}

const resizeCanvas = (canvas: HTMLCanvasElement): void => {
    const rect = canvas.getBoundingClientRect()
    const devicePixelRatio = Math.max(window.devicePixelRatio || minDevicePixelRatio, minDevicePixelRatio)
    const width = Math.max(1, Math.round(rect.width * devicePixelRatio))
    const height = Math.max(1, Math.round(rect.height * devicePixelRatio))

    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
    }
}

const getGridPosition = ({cellWidth, cellHeight, centerX, centerY}: GridMetrics, {column, row}: GridPoint): GridPoint => ({
    column: centerX + column * cellWidth,
    row: centerY + row * cellHeight,
})

const getCanvasMargin = (canvasWidth: number): number => (
    canvasWidth < 520 ? 16 : 40
)

const setCanvasFont = (context: CanvasRenderingContext2D, fontSize: number): void => {
    context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`
}

const getMaxTextWidth = (context: CanvasRenderingContext2D, labels: string[]): number => (
    Math.max(...labels.map(label => context.measureText(label).width))
)

const getResponsiveFontSize = (context: CanvasRenderingContext2D, canvasWidth: number): number => {
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

const drawCenteredGlyph = (
    context: CanvasRenderingContext2D,
    metrics: GridMetrics,
    text: string,
    point: GridPoint,
): void => {
    const {column, row} = getGridPosition(metrics, point)

    context.fillText(text, column, row)
}

const drawLeftAlignedText = (
    context: CanvasRenderingContext2D,
    metrics: GridMetrics,
    text: string,
    point: GridPoint,
): void => {
    const {column, row} = getGridPosition(metrics, point)

    context.textAlign = "left"
    context.fillText(text, column, row)
    context.textAlign = "center"
}

const drawTextRow = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    alignment: CanvasTextAlign,
): void => {
    context.textAlign = alignment
    context.fillText(text, x, y)
    context.textAlign = "center"
}

const drawDivider = (context: CanvasRenderingContext2D, metrics: GridMetrics): void => {
    const topRow = -dividerHalfRows
    const bottomRow = dividerHalfRows
    const middleRow = 0

    drawCenteredGlyph(context, metrics, "\\./", {column: 0, row: topRow})

    for (let row = topRow + 1; row < bottomRow; row += 1) {
        drawCenteredGlyph(context, metrics, row === middleRow ? "><" : "|", {column: 0, row})
    }

    drawCenteredGlyph(context, metrics, "/'\\", {column: 0, row: bottomRow})
}

const drawAsciiPortrait = (
    context: CanvasRenderingContext2D,
    metrics: GridMetrics,
    fontSize: number,
    image: HTMLImageElement,
    topLeft: GridPoint,
    width: number,
    height: number,
): void => {
    const sampleCanvas = document.createElement("canvas")
    const sampleContext = sampleCanvas.getContext("2d", {willReadFrequently: true})

    if (!sampleContext) {
        return
    }

    sampleCanvas.width = width
    sampleCanvas.height = height
    sampleContext.imageSmoothingEnabled = true
    sampleContext.drawImage(image, 0, 0, width, height)

    const pixels = sampleContext.getImageData(0, 0, width, height).data
    const portraitFontSize = Math.max(minPortraitFontSize, Math.floor(fontSize / portraitScale))
    const portraitMetrics = {
        ...metrics,
        cellWidth: metrics.cellWidth / portraitScale,
        cellHeight: metrics.cellHeight / portraitScale,
    }

    context.save()
    setCanvasFont(context, portraitFontSize)
    context.textAlign = "center"
    context.textBaseline = "middle"

    for (let row = 0; row < height; row += 1) {
        for (let column = 0; column < width; column += 1) {
            const pixelIndex = (row * width + column) * 4
            const red = pixels[pixelIndex]
            const green = pixels[pixelIndex + 1]
            const blue = pixels[pixelIndex + 2]
            const brightness = red * 0.2126 + green * 0.7152 + blue * 0.0722

            if (brightness < 8) {
                continue
            }

            const rampIndex = Math.min(
                portraitRamp.length - 1,
                Math.floor((brightness / 255) * (portraitRamp.length - 1)),
            )
            const character = portraitRamp[rampIndex]

            if (character === " ") {
                continue
            }

            context.fillStyle = `rgb(${red}, ${green}, ${blue})`
            drawCenteredGlyph(context, portraitMetrics, character, {
                column: topLeft.column + column,
                row: topLeft.row + row,
            })
        }
    }

    context.restore()
}

const drawProfileText = (context: CanvasRenderingContext2D, metrics: GridMetrics): void => {
    const textColumn = 4

    profileLines.forEach((line, index) => {
        drawLeftAlignedText(context, metrics, line, {column: textColumn, row: -3 + index * 2})
    })
}

const drawCenteredProfileText = (
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    topY: number,
    bottomY: number,
    cellHeight: number,
): void => {
    const blockHeight = (profileLines.length - 1) * cellHeight
    const centerY = topY + Math.max(blockHeight, bottomY - topY) / 2
    const firstRowY = centerY - blockHeight / 2

    profileLines.forEach((line, index) => {
        drawTextRow(context, line, canvasWidth / 2, firstRowY + index * cellHeight, "center")
    })
}

const getFooterLayout = (
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

const drawFooter = (
    context: CanvasRenderingContext2D,
    canvasWidth: number,
    footerLayout: FooterLayout,
    cellHeight: number,
): void => {
    const margin = getCanvasMargin(canvasWidth)

    if (footerLayout.isStacked) {
        footerLabels.forEach((label, index) => {
            drawTextRow(context, label, canvasWidth / 2, footerLayout.topY + index * cellHeight, "center")
        })

        return
    }

    drawTextRow(context, footerLabels[0], margin, footerLayout.y, "left")
    drawTextRow(context, footerLabels[1], canvasWidth / 2, footerLayout.y, "center")
    drawTextRow(context, footerLabels[2], canvasWidth - margin, footerLayout.y, "right")
}

const canDrawDecorations = (
    metrics: GridMetrics,
    canvasWidth: number,
    footerLayout: FooterLayout,
): boolean => {
    const margin = getCanvasMargin(canvasWidth)
    const dividerTop = metrics.centerY - dividerHalfRows * metrics.cellHeight
    const dividerBottom = metrics.centerY + dividerHalfRows * metrics.cellHeight

    return canvasWidth >= decoratedLayoutWidth
        && dividerTop >= margin
        && dividerBottom + metrics.cellHeight <= footerLayout.topY
}

const drawCanvas = (canvas: HTMLCanvasElement, portrait: HTMLImageElement | null): void => {
    const context = canvas.getContext("2d")

    if (!context) {
        return
    }

    const rect = canvas.getBoundingClientRect()
    const devicePixelRatio = Math.max(window.devicePixelRatio || minDevicePixelRatio, minDevicePixelRatio)

    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    context.clearRect(0, 0, rect.width, rect.height)
    context.fillStyle = "#000000"
    context.fillRect(0, 0, rect.width, rect.height)
    const fontSize = getResponsiveFontSize(context, rect.width)
    const cellHeight = Math.ceil(fontSize * lineHeightRatio)

    setCanvasFont(context, fontSize)
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillStyle = "#ffffff"

    const metrics: GridMetrics = {
        cellWidth: Math.ceil(context.measureText("M").width) + lineGap,
        cellHeight,
        centerX: rect.width / 2,
        centerY: rect.height / 2,
    }
    const footerLayout = getFooterLayout(context, rect.width, rect.height, cellHeight)

    if (canDrawDecorations(metrics, rect.width, footerLayout)) {
        if (portrait?.complete && portrait.naturalWidth > 0) {
            drawAsciiPortrait(context, metrics, fontSize, portrait, {column: -147, row: -30}, portraitColumns, portraitRows)
        }

        context.fillStyle = "#ffffff"
        drawDivider(context, metrics)
        drawProfileText(context, metrics)
    } else {
        drawCenteredProfileText(
            context,
            rect.width,
            getCanvasMargin(rect.width),
            footerLayout.topY - getCanvasMargin(rect.width),
            cellHeight,
        )
    }

    drawFooter(context, rect.width, footerLayout, cellHeight)
}

const App: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const portraitRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current

        if (!canvas) {
            return
        }

        let animationFrame = 0

        const requestDraw = (): void => {
            cancelAnimationFrame(animationFrame)
            animationFrame = requestAnimationFrame(() => {
                resizeCanvas(canvas)
                drawCanvas(canvas, portraitRef.current)
            })
        }

        const portrait = new Image()
        portraitRef.current = portrait
        portrait.addEventListener("load", requestDraw)
        portrait.src = portraitUrl

        const resizeObserver = new ResizeObserver(requestDraw)

        resizeObserver.observe(canvas)
        window.addEventListener("resize", requestDraw)
        requestDraw()

        return () => {
            cancelAnimationFrame(animationFrame)
            resizeObserver.disconnect()
            portrait.removeEventListener("load", requestDraw)
            window.removeEventListener("resize", requestDraw)
        }
    }, [])

    return <canvas ref={canvasRef} className="site-canvas" aria-label="ASCII grid"/>
}

export default App
