import {getValueNoise, smoothstep} from "./math"
import {FluidField, GridMetrics, PointerState} from "./types"

type FluidStepOptions = {
    deltaSeconds: number
    elapsedSeconds: number
    diffusion?: number
    viscosity?: number
    decay?: number
    ambientStrength?: number
    ambientDensity?: number
}

const solverIterations = 10

export const getFluidIndex = (columns: number, column: number, row: number): number => (
    row * columns + column
)

export const createFluidField = (columns: number, rows: number, seed = Math.random() * 1000): FluidField => {
    const size = columns * rows

    return {
        columns,
        rows,
        density: new Float32Array(size),
        previousDensity: new Float32Array(size),
        velocityX: new Float32Array(size),
        velocityY: new Float32Array(size),
        previousVelocityX: new Float32Array(size),
        previousVelocityY: new Float32Array(size),
        pressure: new Float32Array(size),
        divergence: new Float32Array(size),
        seed,
    }
}

export const getCenteredCellCount = (span: number, cellSize: number): number => {
    const count = Math.ceil(span / cellSize) + 2

    return count % 2 === 0 ? count + 1 : count
}

export const getOrCreateFluidField = (
    fluidField: FluidField | null,
    canvasWidth: number,
    canvasHeight: number,
    cellWidth: number,
    cellHeight: number,
): FluidField => {
    const columns = Math.max(9, getCenteredCellCount(canvasWidth, cellWidth))
    const rows = Math.max(9, getCenteredCellCount(canvasHeight, cellHeight))

    if (fluidField && fluidField.columns === columns && fluidField.rows === rows) {
        return fluidField
    }

    return createFluidField(columns, rows)
}

export const sampleFluid = (
    values: Float32Array,
    columns: number,
    rows: number,
    x: number,
    y: number,
): number => {
    const clampedX = Math.max(0.5, Math.min(columns - 1.5, x))
    const clampedY = Math.max(0.5, Math.min(rows - 1.5, y))
    const x0 = Math.floor(clampedX)
    const y0 = Math.floor(clampedY)
    const x1 = Math.min(columns - 1, x0 + 1)
    const y1 = Math.min(rows - 1, y0 + 1)
    const tx = clampedX - x0
    const ty = clampedY - y0
    const top = values[getFluidIndex(columns, x0, y0)] * (1 - tx) + values[getFluidIndex(columns, x1, y0)] * tx
    const bottom = values[getFluidIndex(columns, x0, y1)] * (1 - tx) + values[getFluidIndex(columns, x1, y1)] * tx

    return top * (1 - ty) + bottom * ty
}

export const addFluidImpulse = (
    fluidField: FluidField,
    x: number,
    y: number,
    velocityX: number,
    velocityY: number,
    amount: number,
    radius: number,
): void => {
    const minColumn = Math.max(1, Math.floor(x - radius))
    const maxColumn = Math.min(fluidField.columns - 2, Math.ceil(x + radius))
    const minRow = Math.max(1, Math.floor(y - radius))
    const maxRow = Math.min(fluidField.rows - 2, Math.ceil(y + radius))

    for (let row = minRow; row <= maxRow; row += 1) {
        for (let column = minColumn; column <= maxColumn; column += 1) {
            const distance = Math.hypot(column - x, row - y)
            const influence = 1 - smoothstep(0, radius, distance)

            if (influence <= 0) {
                continue
            }

            const index = getFluidIndex(fluidField.columns, column, row)

            fluidField.density[index] = Math.min(1, fluidField.density[index] + amount * influence)
            fluidField.velocityX[index] += velocityX * influence
            fluidField.velocityY[index] += velocityY * influence
        }
    }
}

export const addPointerFluid = (
    fluidField: FluidField,
    pointer: PointerState,
    metrics: Pick<GridMetrics, "cellWidth" | "cellHeight" | "centerX" | "centerY">,
    elapsedSeconds: number,
): void => {
    const centerColumn = (fluidField.columns - 1) / 2
    const centerRow = (fluidField.rows - 1) / 2
    const currentColumn = (pointer.x - metrics.centerX) / metrics.cellWidth + centerColumn
    const currentRow = (pointer.y - metrics.centerY) / metrics.cellHeight + centerRow
    const previousColumn = (pointer.previousX - metrics.centerX) / metrics.cellWidth + centerColumn
    const previousRow = (pointer.previousY - metrics.centerY) / metrics.cellHeight + centerRow
    const deltaColumn = currentColumn - previousColumn
    const deltaRow = currentRow - previousRow
    const distance = Math.hypot(deltaColumn, deltaRow)
    const isMoving = distance > 0.1
    const steps = isMoving ? Math.max(1, Math.ceil(distance * 1.5)) : 0
    const amount = isMoving ? Math.min(0.22, 0.08 + distance * 0.03) : 0.018
    const radius = isMoving ? 4.4 : 2.1

    for (let step = 0; step <= steps; step += 1) {
        const t = steps === 0 ? 0 : step / steps
        const x = previousColumn + deltaColumn * t
        const y = previousRow + deltaRow * t
        const swirlAngle = elapsedSeconds * 2.4 + t * Math.PI * 2
        const swirlStrength = 1 + Math.min(2.5, distance) * 0.3

        addFluidImpulse(
            fluidField,
            x,
            y,
            deltaColumn * 2.8 + Math.cos(swirlAngle) * swirlStrength,
            deltaRow * 2.8 + Math.sin(swirlAngle) * swirlStrength,
            amount,
            radius,
        )
    }

    pointer.previousX = pointer.x
    pointer.previousY = pointer.y
}

const setBoundary = (fluidField: FluidField, boundary: number, values: Float32Array): void => {
    const {columns, rows} = fluidField

    for (let column = 1; column < columns - 1; column += 1) {
        values[getFluidIndex(columns, column, 0)] = boundary === 2
            ? -values[getFluidIndex(columns, column, 1)]
            : values[getFluidIndex(columns, column, 1)]
        values[getFluidIndex(columns, column, rows - 1)] = boundary === 2
            ? -values[getFluidIndex(columns, column, rows - 2)]
            : values[getFluidIndex(columns, column, rows - 2)]
    }

    for (let row = 1; row < rows - 1; row += 1) {
        values[getFluidIndex(columns, 0, row)] = boundary === 1
            ? -values[getFluidIndex(columns, 1, row)]
            : values[getFluidIndex(columns, 1, row)]
        values[getFluidIndex(columns, columns - 1, row)] = boundary === 1
            ? -values[getFluidIndex(columns, columns - 2, row)]
            : values[getFluidIndex(columns, columns - 2, row)]
    }

    values[getFluidIndex(columns, 0, 0)] = 0.5 * (
        values[getFluidIndex(columns, 1, 0)] + values[getFluidIndex(columns, 0, 1)]
    )
    values[getFluidIndex(columns, 0, rows - 1)] = 0.5 * (
        values[getFluidIndex(columns, 1, rows - 1)] + values[getFluidIndex(columns, 0, rows - 2)]
    )
    values[getFluidIndex(columns, columns - 1, 0)] = 0.5 * (
        values[getFluidIndex(columns, columns - 2, 0)] + values[getFluidIndex(columns, columns - 1, 1)]
    )
    values[getFluidIndex(columns, columns - 1, rows - 1)] = 0.5 * (
        values[getFluidIndex(columns, columns - 2, rows - 1)]
        + values[getFluidIndex(columns, columns - 1, rows - 2)]
    )
}

const linearSolve = (
    fluidField: FluidField,
    boundary: number,
    values: Float32Array,
    previousValues: Float32Array,
    amount: number,
    divisor: number,
): void => {
    const {columns, rows} = fluidField

    for (let iteration = 0; iteration < solverIterations; iteration += 1) {
        for (let row = 1; row < rows - 1; row += 1) {
            for (let column = 1; column < columns - 1; column += 1) {
                const index = getFluidIndex(columns, column, row)

                values[index] = (
                    previousValues[index]
                    + amount * (
                        values[getFluidIndex(columns, column - 1, row)]
                        + values[getFluidIndex(columns, column + 1, row)]
                        + values[getFluidIndex(columns, column, row - 1)]
                        + values[getFluidIndex(columns, column, row + 1)]
                    )
                ) / divisor
            }
        }

        setBoundary(fluidField, boundary, values)
    }
}

const diffuse = (
    fluidField: FluidField,
    boundary: number,
    values: Float32Array,
    previousValues: Float32Array,
    diffusion: number,
    deltaSeconds: number,
): void => {
    const amount = deltaSeconds * diffusion * (fluidField.columns - 2) * (fluidField.rows - 2)

    linearSolve(fluidField, boundary, values, previousValues, amount, 1 + 4 * amount)
}

const advect = (
    fluidField: FluidField,
    boundary: number,
    values: Float32Array,
    previousValues: Float32Array,
    velocityX: Float32Array,
    velocityY: Float32Array,
    deltaSeconds: number,
): void => {
    const {columns, rows} = fluidField
    const xScale = deltaSeconds * (columns - 2)
    const yScale = deltaSeconds * (rows - 2)

    for (let row = 1; row < rows - 1; row += 1) {
        for (let column = 1; column < columns - 1; column += 1) {
            const index = getFluidIndex(columns, column, row)
            const x = column - xScale * velocityX[index]
            const y = row - yScale * velocityY[index]

            values[index] = sampleFluid(previousValues, columns, rows, x, y)
        }
    }

    setBoundary(fluidField, boundary, values)
}

export const projectVelocity = (fluidField: FluidField): void => {
    const {columns, rows, velocityX, velocityY, pressure, divergence} = fluidField

    pressure.fill(0)

    for (let row = 1; row < rows - 1; row += 1) {
        for (let column = 1; column < columns - 1; column += 1) {
            const index = getFluidIndex(columns, column, row)

            divergence[index] = -0.5 * (
                velocityX[getFluidIndex(columns, column + 1, row)]
                - velocityX[getFluidIndex(columns, column - 1, row)]
                + velocityY[getFluidIndex(columns, column, row + 1)]
                - velocityY[getFluidIndex(columns, column, row - 1)]
            )
        }
    }

    setBoundary(fluidField, 0, divergence)
    setBoundary(fluidField, 0, pressure)
    linearSolve(fluidField, 0, pressure, divergence, 1, 4)

    for (let row = 1; row < rows - 1; row += 1) {
        for (let column = 1; column < columns - 1; column += 1) {
            const index = getFluidIndex(columns, column, row)

            velocityX[index] -= 0.5 * (
                pressure[getFluidIndex(columns, column + 1, row)]
                - pressure[getFluidIndex(columns, column - 1, row)]
            )
            velocityY[index] -= 0.5 * (
                pressure[getFluidIndex(columns, column, row + 1)]
                - pressure[getFluidIndex(columns, column, row - 1)]
            )
        }
    }

    setBoundary(fluidField, 1, velocityX)
    setBoundary(fluidField, 2, velocityY)
}

const addAmbientFlow = (
    fluidField: FluidField,
    elapsedSeconds: number,
    deltaSeconds: number,
    strength: number,
    densityAmount: number,
): void => {
    const {columns, rows, seed} = fluidField
    const time = elapsedSeconds * 0.16
    const noiseScale = 0.055
    const epsilon = 0.75

    for (let row = 1; row < rows - 1; row += 1) {
        for (let column = 1; column < columns - 1; column += 1) {
            const index = getFluidIndex(columns, column, row)
            const noiseX = column * noiseScale + seed + time
            const noiseY = row * noiseScale - seed - time * 0.7
            const curlX = getValueNoise(noiseX, noiseY + epsilon) - getValueNoise(noiseX, noiseY - epsilon)
            const curlY = getValueNoise(noiseX - epsilon, noiseY) - getValueNoise(noiseX + epsilon, noiseY)
            const wave = Math.sin(column * 0.08 + elapsedSeconds * 0.45)
                * Math.cos(row * 0.06 - elapsedSeconds * 0.33)
            const targetDensity = densityAmount * (0.35 + getValueNoise(noiseX * 0.8 + 31, noiseY * 0.8 - 19) * 0.9)

            fluidField.velocityX[index] += (curlX * 3.4 + wave * 0.08) * strength * deltaSeconds
            fluidField.velocityY[index] += (curlY * 3.4 - wave * 0.06) * strength * deltaSeconds

            if (fluidField.density[index] < targetDensity) {
                fluidField.density[index] += (targetDensity - fluidField.density[index]) * deltaSeconds * 0.7
            }
        }
    }
}

export const stepFluid = (fluidField: FluidField, options: FluidStepOptions): void => {
    const deltaSeconds = Math.min(0.05, Math.max(0.001, options.deltaSeconds))
    const diffusion = options.diffusion ?? 0.00005
    const viscosity = options.viscosity ?? 0.00008
    const decay = options.decay ?? 0.994
    const ambientStrength = options.ambientStrength ?? 1.2
    const ambientDensity = options.ambientDensity ?? 0.07

    addAmbientFlow(fluidField, options.elapsedSeconds, deltaSeconds, ambientStrength, ambientDensity)

    fluidField.previousVelocityX.set(fluidField.velocityX)
    diffuse(fluidField, 1, fluidField.velocityX, fluidField.previousVelocityX, viscosity, deltaSeconds)
    fluidField.previousVelocityY.set(fluidField.velocityY)
    diffuse(fluidField, 2, fluidField.velocityY, fluidField.previousVelocityY, viscosity, deltaSeconds)
    projectVelocity(fluidField)

    fluidField.previousVelocityX.set(fluidField.velocityX)
    fluidField.previousVelocityY.set(fluidField.velocityY)
    advect(fluidField, 1, fluidField.velocityX, fluidField.previousVelocityX, fluidField.previousVelocityX, fluidField.previousVelocityY, deltaSeconds)
    advect(fluidField, 2, fluidField.velocityY, fluidField.previousVelocityY, fluidField.previousVelocityX, fluidField.previousVelocityY, deltaSeconds)
    projectVelocity(fluidField)

    fluidField.previousDensity.set(fluidField.density)
    diffuse(fluidField, 0, fluidField.density, fluidField.previousDensity, diffusion, deltaSeconds)
    fluidField.previousDensity.set(fluidField.density)
    advect(fluidField, 0, fluidField.density, fluidField.previousDensity, fluidField.velocityX, fluidField.velocityY, deltaSeconds)

    for (let index = 0; index < fluidField.density.length; index += 1) {
        fluidField.density[index] *= decay
    }

    setBoundary(fluidField, 0, fluidField.density)
}

export const measureDivergence = (fluidField: FluidField): number => {
    let total = 0
    let count = 0

    for (let row = 1; row < fluidField.rows - 1; row += 1) {
        for (let column = 1; column < fluidField.columns - 1; column += 1) {
            const divergence = (
                fluidField.velocityX[getFluidIndex(fluidField.columns, column + 1, row)]
                - fluidField.velocityX[getFluidIndex(fluidField.columns, column - 1, row)]
                + fluidField.velocityY[getFluidIndex(fluidField.columns, column, row + 1)]
                - fluidField.velocityY[getFluidIndex(fluidField.columns, column, row - 1)]
            ) * 0.5

            total += divergence * divergence
            count += 1
        }
    }

    return count === 0 ? 0 : Math.sqrt(total / count)
}

export const measureDensityCenter = (fluidField: FluidField): {x: number, y: number, mass: number} => {
    let mass = 0
    let weightedX = 0
    let weightedY = 0

    for (let row = 0; row < fluidField.rows; row += 1) {
        for (let column = 0; column < fluidField.columns; column += 1) {
            const value = fluidField.density[getFluidIndex(fluidField.columns, column, row)]

            mass += value
            weightedX += column * value
            weightedY += row * value
        }
    }

    return {
        x: mass === 0 ? 0 : weightedX / mass,
        y: mass === 0 ? 0 : weightedY / mass,
        mass,
    }
}

export const measureDensityCoverage = (fluidField: FluidField, threshold = 0.012): number => {
    let active = 0

    for (const value of fluidField.density) {
        if (value > threshold) {
            active += 1
        }
    }

    return active / fluidField.density.length
}
