export const smoothstep = (edge0: number, edge1: number, value: number): number => {
    const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)))

    return t * t * (3 - 2 * t)
}

export const getHashNoise = (x: number, y: number): number => {
    const dot = x * 127.1 + y * 311.7
    const sine = Math.sin(dot) * 43758.5453123

    return sine - Math.floor(sine)
}

export const getValueNoise = (x: number, y: number): number => {
    const x0 = Math.floor(x)
    const y0 = Math.floor(y)
    const tx = smoothstep(0, 1, x - x0)
    const ty = smoothstep(0, 1, y - y0)
    const top = getHashNoise(x0, y0) * (1 - tx) + getHashNoise(x0 + 1, y0) * tx
    const bottom = getHashNoise(x0, y0 + 1) * (1 - tx) + getHashNoise(x0 + 1, y0 + 1) * tx

    return top * (1 - ty) + bottom * ty
}
