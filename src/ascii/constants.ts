export const minDevicePixelRatio = 1
export const maxFontSize = 18
export const minFontSize = 11
export const lineHeightRatio = 1.35
export const lineGap = 2
export const footerMaxWidth = 1180
export const backgroundColor = "#000000"
export const foregroundColor = "#ffffff"
export const flowRamp = " .,:;+*xX#@"
export const glitchRamp = "!<>[]{}\\/|?%$#@&*+=~"
export const profileLines = ["Rudolf Aelbrecht", "Software Engineer", "C++  Go  TS  Python"]
export const footerLinks = [
    {
        id: "mail",
        label: "[ mail ] rudolf@aelbrecht.io",
        compactLabel: "[ mail ]",
        href: "mailto:rudolf@aelbrecht.io",
    },
    {
        id: "linkedin",
        label: "[ in ] LinkedIn /aelbrecht",
        compactLabel: "[ in ]",
        href: "https://www.linkedin.com/in/aelbrecht",
    },
    {
        id: "github",
        label: "[ git ] GitHub /aelbrecht",
        compactLabel: "[ git ]",
        href: "https://github.com/aelbrecht",
    },
]
export const footerLabels = footerLinks.map(({label}) => label)
export const compactFooterLabels = footerLinks.map(({compactLabel}) => compactLabel)
