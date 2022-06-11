/* eslint-disable jsx-a11y/alt-text */
import React from "react"

export default function Header (props) {
    return (
        <header>
            <div className="brandContainer">
                <img className="headerLogo" src="images/bible.png"></img>
                <h1 className="headerText">Memory Game</h1>
                    <button className="headerButton" onClick={props.addVerse}>{props.verseSearch ? `Cancel` : `Add Verses`}</button>
                    <button className="startGameButton" style={{display: props.verseBundleExists>1 ? "inline-block" : "none"}} onClick={props.startGame}>{props.playGame ? `End Game` : `Start Game`}</button>
            </div>
        </header>
    )
}