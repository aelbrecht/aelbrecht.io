import {FC, useEffect, useRef} from "react"
import {FluidField, GlitchState, PointerState} from "../ascii/types"
import {drawAsciiLanding, resizeCanvas} from "../ascii/renderer"

const App: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const fluidFieldRef = useRef<FluidField | null>(null)
    const glitchStateRef = useRef<GlitchState>(new Map())
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
            fluidFieldRef.current = drawAsciiLanding(
                canvas,
                fluidFieldRef.current,
                glitchStateRef.current,
                pointerRef.current,
                timestamp / 1000,
                deltaSeconds,
            )
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
        }

        const clearPointer = (): void => {
            pointerRef.current = {
                ...pointerRef.current,
                isInside: false,
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            fluidFieldRef.current = null
            glitchStateRef.current.clear()
            resizeCanvas(canvas)
        })

        resizeObserver.observe(canvas)
        canvas.addEventListener("pointermove", updatePointer)
        canvas.addEventListener("pointerleave", clearPointer)
        window.addEventListener("blur", clearPointer)
        animationFrame = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(animationFrame)
            resizeObserver.disconnect()
            canvas.removeEventListener("pointermove", updatePointer)
            canvas.removeEventListener("pointerleave", clearPointer)
            window.removeEventListener("blur", clearPointer)
        }
    }, [])

    return <canvas ref={canvasRef} className="site-canvas" aria-label="ASCII grid"/>
}

export default App
