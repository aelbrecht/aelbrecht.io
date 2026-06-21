import {describe, expect, test} from "vitest"
import {createCenteredTextCells, getTextCellKey} from "./text-grid"

describe("text grid", () => {
    test("centers text cells around the origin", () => {
        const cells = createCenteredTextCells(["ABC", "D"], 2)

        expect(cells).toEqual([
            {column: -1, row: -1, character: "A"},
            {column: 0, row: -1, character: "B"},
            {column: 1, row: -1, character: "C"},
            {column: 0, row: 1, character: "D"},
        ])
    })

    test("does not create drawable cells for spaces", () => {
        const cells = createCenteredTextCells(["A B"], 2)

        expect(cells.map(cell => cell.character)).toEqual(["A", "B"])
    })

    test("keys are stable for glitch state lookup", () => {
        expect(getTextCellKey(-3.5, 2)).toBe("-3.5:2")
    })
})
