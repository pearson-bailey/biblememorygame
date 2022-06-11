/* eslint-disable jsx-a11y/alt-text */
import React from "react"

export default function UserList(props) {
    return (
        <div className="outerVerifyContainer">
            <div className="verifyContainer">
                <h2 className="verseText">{props.verse}({props.reference})</h2>
                <img className="deleteLogo" src="images/bin.png" onClick={() =>props.removeVerse(props.reference)} title="Delete this verse?"></img>
            </div>
        </div>
    )
}