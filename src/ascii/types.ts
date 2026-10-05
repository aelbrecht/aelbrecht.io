export type GridMetrics = {
    cellWidth: number
    cellHeight: number
    centerX: number
    centerY: number
}

export type FluidField = {
    columns: number
    rows: number
    density: Float32Array
    previousDensity: Float32Array
    velocityX: Float32Array
    velocityY: Float32Array
    previousVelocityX: Float32Array
    previousVelocityY: Float32Array
    pressure: Float32Array
    divergence: Float32Array
    seed: number
}

export type PointerState = {
    isInside: boolean
    x: number
    y: number
    previousX: number
    previousY: number
}
