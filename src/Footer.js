import React from "react"

export default function Footer () {
    var year = new Date().getFullYear()
    return (
        <div className="footerContainer">
            <p>© {year} Pearson Web Applications</p>
        </div>
    )
}