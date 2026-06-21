import {footerLabels, profileLines} from "./constants"
import {TextCell} from "./types"

export const textLines = profileLines

export const getTextCellKey = (column: number, row: number): string => (
    `${column}:${row}`
)

export const createCenteredTextCells = (lines = textLines, rowGap = 2): TextCell[] => {
    const firstRow = -((lines.length - 1) * rowGap) / 2

    return lines.flatMap((line, lineIndex) => {
        const row = firstRow + lineIndex * rowGap
        const firstColumn = -((line.length - 1) / 2)

        return Array.from(line).flatMap((character, characterIndex) => (
            character === " "
                ? []
                : [{
                    column: firstColumn + characterIndex,
                    row,
                    character,
                }]
        ))
    })
}

export const createLeftAlignedTextCells = (text: string, column: number, row: number): TextCell[] => (
    Array.from(text).flatMap((character, index) => (
        character === " "
            ? []
            : [{
                column: column + index,
                row,
                character,
            }]
    ))
)

export const createFooterTextCells = (isStacked: boolean): TextCell[] => {
    if (isStacked) {
        const firstRow = -((footerLabels.length - 1) * 2) / 2

        return footerLabels.flatMap((label, index) => (
            createCenteredTextCells([label], 2).map(cell => ({
                ...cell,
                row: firstRow + index * 2,
            }))
        ))
    }

    const leftWidth = footerLabels[0].length
    const centerWidth = footerLabels[1].length

    return [
        ...createLeftAlignedTextCells(footerLabels[0], -leftWidth, 0),
        ...createLeftAlignedTextCells(footerLabels[1], -centerWidth / 2, 0),
        ...createLeftAlignedTextCells(footerLabels[2], 0, 0),
    ]
}
