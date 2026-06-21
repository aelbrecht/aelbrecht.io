export type GridMetrics = {
    cellWidth: number
    cellHeight: number
    centerX: number
    centerY: number
}

export type GridPoint = {
    column: number
    row: number
}

export type FooterLayout = {
    isStacked: boolean
    topY: number
    y: number
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

export type TextCell = {
    column: number
    row: number
    character: string
}

export type GlitchCell = {
    character: string
    expiresAt: number
}

export type GlitchState = Map<string, GlitchCell>

export type LinkTarget = {
    id: string
    href: string
    left: number
    right: number
    top: number
    bottom: number
}

export type RenderResult = {
    fluidField: FluidField | null
    linkTargets: LinkTarget[]
}

export type PointerState = {
    isInside: boolean
    x: number
    y: number
    previousX: number
    previousY: number
}
