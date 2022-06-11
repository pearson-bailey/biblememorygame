import React from "react"

export default function Search(props) {
    return (
        <div className="searchContainer">
            <form onSubmit={props.handleSubmit}>
                <label htmlFor="verseSearch">Add Bible Verses Here: </label>
                <input type="text" id="verseSearchText" name="verseSearchText" placeholder="Ex: Genesis 1:1" onChange={props.handleChange}></input>
                <button>Search</button>
            </form>
        </div>
    )
}