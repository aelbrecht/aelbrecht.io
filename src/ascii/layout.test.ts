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
})
