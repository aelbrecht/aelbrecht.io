import {FC, useEffect, useRef} from "react"
import {FluidField, GlitchState, LinkTarget, PointerState} from "../ascii/types"
import {drawAsciiLanding, resizeCanvas} from "../ascii/renderer"

const getLinkTargetAtPoint = (linkTargets: LinkTarget[], x: number, y: number): LinkTarget | null => (
    linkTargets.find(({left, right, top, bottom}) => (
        x >= left && x <= right && y >= top && y <= bottom
    )) ?? null
)

const App: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const fluidFieldRef = useRef<FluidField | null>(null)
    const glitchStateRef = useRef<GlitchState>(new Map())
    const hoveredLinkIdRef = useRef<string | null>(null)
    const linkTargetsRef = useRef<LinkTarget[]>([])
    const pointerRef = useRef<PointerState>({
        isInside: false,
        x: 0,
        y: 0,
        previousX: 0,
        previousY: 0,
    })

    useEffect(() => {
        const canvas = canvasRef.current

        if (!canvas) {
            return
        }

        let animationFrame = 0
        let previousTimestamp = performance.now()

        const render = (timestamp: number): void => {
            const deltaSeconds = (timestamp - previousTimestamp) / 1000

            previousTimestamp = timestamp
            resizeCanvas(canvas)
            const renderResult = drawAsciiLanding(
                canvas,
                fluidFieldRef.current,
                glitchStateRef.current,
                pointerRef.current,
                hoveredLinkIdRef.current,
                timestamp / 1000,
                deltaSeconds,
            )

            fluidFieldRef.current = renderResult.fluidField
            linkTargetsRef.current = renderResult.linkTargets
            animationFrame = requestAnimationFrame(render)
        }

        const updatePointer = (event: PointerEvent): void => {
            const rect = canvas.getBoundingClientRect()
            const nextX = event.clientX - rect.left
            const nextY = event.clientY - rect.top
            const previousPointer = pointerRef.current

            pointerRef.current = {
                isInside: true,
                x: nextX,
                y: nextY,
                previousX: previousPointer.isInside ? previousPointer.x : nextX,
                previousY: previousPointer.isInside ? previousPointer.y : nextY,
            }

            const hoveredLink = getLinkTargetAtPoint(linkTargetsRef.current, nextX, nextY)

            hoveredLinkIdRef.current = hoveredLink?.id ?? null
            canvas.style.cursor = hoveredLink ? "pointer" : "default"
        }

        const clearPointer = (): void => {
            pointerRef.current = {
                ...pointerRef.current,
                isInside: false,
            }
            hoveredLinkIdRef.current = null
            canvas.style.cursor = "default"
        }

        const openHoveredLink = (): void => {
            const pointer = pointerRef.current
            const linkTarget = getLinkTargetAtPoint(linkTargetsRef.current, pointer.x, pointer.y)

            if (linkTarget) {
                window.location.href = linkTarget.href
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            fluidFieldRef.current = null
            glitchStateRef.current.clear()
            linkTargetsRef.current = []
            hoveredLinkIdRef.current = null
            resizeCanvas(canvas)
        })

        resizeObserver.observe(canvas)
        canvas.addEventListener("pointermove", updatePointer)
        canvas.addEventListener("pointerleave", clearPointer)
        canvas.addEventListener("click", openHoveredLink)
        window.addEventListener("blur", clearPointer)
        animationFrame = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(animationFrame)
            resizeObserver.disconnect()
            canvas.removeEventListener("pointermove", updatePointer)
            canvas.removeEventListener("pointerleave", clearPointer)
            canvas.removeEventListener("click", openHoveredLink)
            window.removeEventListener("blur", clearPointer)
        }
    }, [])

    return <canvas ref={canvasRef} className="site-canvas" aria-label="ASCII grid"/>
}

export default App
