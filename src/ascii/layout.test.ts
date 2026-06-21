import {describe, expect, test} from "vitest"
import {getFooterLayout} from "./layout"

describe("footer layout", () => {
    test("uses compact labels when full labels do not fit", () => {
        const layout = getFooterLayout(520, 800, 20, 12)

        expect(layout.isCompact).toBe(true)
        expect(layout.isStacked).toBe(false)
    })

    test("keeps full labels only when anchored regions do not collide", () => {
        const layout = getFooterLayout(1500, 800, 20, 12)

        expect(layout.isCompact).toBe(false)
        expect(layout.isStacked).toBe(false)
    })

    test("uses the visible viewport without adding dead mobile space", () => {
        const layout = getFooterLayout(390, 800, 20, 12)

        expect(layout.y).toBe(780)
    })

    test("uses larger viewport bottom inset when present", () => {
        const layout = getFooterLayout(390, 800, 20, 12, 120)

        expect(layout.y).toBe(660)
    })
})
