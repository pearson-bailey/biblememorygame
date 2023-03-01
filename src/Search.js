import React from "react"
import {useSelector, useDispatch} from "react-redux";
import {fetchVerse,
    addVerse,
    deleteVerifyVerse,
    verifyVerseState
    } from './features/verse/versesSlice';

export default function Search({setVerseSearch, verseSearch}) {
    const verifyVerse = useSelector(verifyVerseState);
    const dispatch = useDispatch();
    const [verseSearchText, setVerseSearchText] = React.useState(null);

    const handleChange = React.useCallback((event) => {
        setVerseSearchText(event.target.value)
      }, [])

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(fetchVerse(verseSearchText));
    }

function handleVerify(id) {
    if (id === "verifyYes") {
        setVerseSearch(!verseSearch);
        dispatch(addVerse());
        dispatch(deleteVerifyVerse());
    } else if (id ==="verifyNo") {
        dispatch(deleteVerifyVerse());
        setVerseSearch(!verseSearch);
    }
  }

    function Verify() {
        return (
            <div className="outerVerifyContainer">
                <div className="verifyContainer">
                    <h2 className="verseText">{verifyVerse.verseText}</h2>
                </div>
                <h3 className="verifyText">Is this the correct verse?</h3>
                <button id="verifyYes" className="btn btn-outline-success me-md-2" onClick={(e) => handleVerify(e.currentTarget.id)}>Yes</button>
                <button id="verifyNo" className="btn btn-outline-danger" onClick={(e) => handleVerify(e.currentTarget.id)}>No</button>
            </div>
        )
    }

    return (
        <div className="searchContainer">
            <form onSubmit={handleSubmit}>
                <label htmlFor="verseSearch">Add Bible Verses Here: </label>
                <input type="text" id="verseSearchText" name="verseSearchText" placeholder="Ex: Genesis 1:1" onChange={handleChange}></input>
                <button className="btn btn-dark btn-sm">Search</button>
            </form>
            {verifyVerse.verseText && <Verify />}
        </div>
    )
}