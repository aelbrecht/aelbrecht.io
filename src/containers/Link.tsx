import React, {FC} from "react"

const Link: FC<{ to: string, children: React.ReactNode }> = ({to, children}) => (
    <a
        href={to}
        target="_blank"
        rel="noreferrer"
    >{children}</a>
)

export default Link
