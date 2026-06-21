import {describe, expect, test} from "vitest"
import {
    addFluidImpulse,
    addPointerFluid,
    createFluidField,
    getCenteredCellCount,
    getFluidIndex,
    measureDensityCenter,
    measureDensityCoverage,
    measureDivergence,
    projectVelocity,
    stepFluid,
} from "./fluid"
import {PointerState} from "./types"

const getVelocityEnergy = (velocityX: Float32Array, velocityY: Float32Array): number => {
    let total = 0

    for (let index = 0; index < velocityX.length; index += 1) {
        total += velocityX[index] ** 2 + velocityY[index] ** 2
    }

    return total / velocityX.length
}

describe("fluid simulation", () => {
    test("uses odd-sized grids so the canvas center maps to a cell center", () => {
        expect(getCenteredCellCount(1280, 13) % 2).toBe(1)
        expect(getCenteredCellCount(720, 24) % 2).toBe(1)
    })

    test("projection reduces velocity divergence", () => {
        const fluidField = createFluidField(42, 30, 12)

        for (let row = 1; row < fluidField.rows - 1; row += 1) {
            for (let column = 1; column < fluidField.columns - 1; column += 1) {
                const index = getFluidIndex(fluidField.columns, column, row)

                fluidField.velocityX[index] = Math.sin(column * 0.7) * 2 + Math.cos(row * 0.35)
                fluidField.velocityY[index] = Math.cos(row * 0.61) * 2 - Math.sin(column * 0.29)
            }
        }

        const before = measureDivergence(fluidField)

        projectVelocity(fluidField)

        expect(measureDivergence(fluidField)).toBeLessThan(before * 0.55)
    })

    test("density advects in the direction of the velocity field", () => {
        const fluidField = createFluidField(48, 26, 4)

        addFluidImpulse(fluidField, 12, 13, 0, 0, 1, 3)

        for (let index = 0; index < fluidField.velocityX.length; index += 1) {
            fluidField.velocityX[index] = 0.85
        }

        const before = measureDensityCenter(fluidField)

        for (let frame = 0; frame < 24; frame += 1) {
            stepFluid(fluidField, {
                elapsedSeconds: frame / 60,
                deltaSeconds: 1 / 60,
                ambientDensity: 0,
                ambientStrength: 0,
                decay: 1,
                diffusion: 0,
                viscosity: 0,
            })
        }

        const after = measureDensityCenter(fluidField)

        expect(after.mass).toBeGreaterThan(before.mass * 0.8)
        expect(after.x).toBeGreaterThan(before.x + 2.2)
    })

    test("ambient forces create page-wide motion instead of a cursor-only blob", () => {
        const fluidField = createFluidField(72, 42, 9)

        for (let frame = 0; frame < 180; frame += 1) {
            stepFluid(fluidField, {
                elapsedSeconds: frame / 60,
                deltaSeconds: 1 / 60,
            })
        }

        expect(measureDensityCoverage(fluidField)).toBeGreaterThan(0.42)
        expect(getVelocityEnergy(fluidField.velocityX, fluidField.velocityY)).toBeGreaterThan(0.003)
    })

    test("pointer input emits along the movement path", () => {
        const fluidField = createFluidField(64, 32, 3)
        const pointer: PointerState = {
            isInside: true,
            x: 420,
            y: 160,
            previousX: 120,
            previousY: 160,
        }

        addPointerFluid(fluidField, pointer, {cellWidth: 10, cellHeight: 10, centerX: 320, centerY: 160}, 1.5)

        const left = fluidField.density[getFluidIndex(fluidField.columns, 13, 16)]
        const middle = fluidField.density[getFluidIndex(fluidField.columns, 27, 16)]
        const right = fluidField.density[getFluidIndex(fluidField.columns, 41, 16)]

        expect(left).toBeGreaterThan(0.02)
        expect(middle).toBeGreaterThan(0.02)
        expect(right).toBeGreaterThan(0.02)
        expect(pointer.previousX).toBe(pointer.x)
    })
})
