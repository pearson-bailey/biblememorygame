import React from "react"

export default function Verify (props) {

    return (
        <div className="outerVerifyContainer">
            <div className="verifyContainer">
                <h2 className="verseText">{props.verse}</h2>
            </div>
            <h3 class="verifyText">Is this the correct verse?</h3>
            <button id="verifyYes" class="verifyButton" onClick={(e) => props.handleVerify(e.currentTarget.id)}>Yes</button>
            <button id="verifyNo" class="verifyButton" onClick={(e) => props.handleVerify(e.currentTarget.id)}>No</button>
        </div>
    )
}