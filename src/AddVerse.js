import React from "react"
import {useDispatch} from "react-redux";
import {
    addCustomVerse,
    } from './features/verse/versesSlice';

export default function AddVerse({setAddVerse, addVerse}) {
    const dispatch = useDispatch();
    const [verseAddText, setVerseAddText] = React.useState(null);
    const [verseAddRef, setVerseAddRef] = React.useState(null);
    const [verifyVerse, setVerifyVerse] = React.useState(false);

    const handleChange = React.useCallback((isRef = false) => (event) => {
        if (isRef) {
            setVerseAddRef(event.target.value);
        } else
        setVerseAddText(event.target.value)
      }, [])

    function handleSubmit(event) {
        event.preventDefault();
        if (!verseAddText || !verseAddRef) {
            alert('You need a verse and a reference');
        } else {
        setVerifyVerse(true);
        }
    }

function handleVerify(id) {
    setVerifyVerse(false);
    if (id === "verifyYes") {
        dispatch(addCustomVerse({verseText: verseAddText, verseReference: verseAddRef}));
        setAddVerse(!addVerse);
    }
  }

    function Verify() {
        return (
            <div className="outerVerifyContainer">
                <div className="verifyAddContainer">
                    <h2 className="verseText">{verseAddText}</h2>
                    <p className="verseRef">{verseAddRef}</p>
                </div>
                <h3 className="verifyText">Are you sure you would like to add this verse?</h3>
                <button id="verifyYes" className="btn btn-outline-success me-md-2" onClick={(e) => handleVerify(e.currentTarget.id)}>Yes</button>
                <button id="verifyNo" className="btn btn-outline-danger" onClick={(e) => handleVerify(e.currentTarget.id)}>No</button>
            </div>
        )
    }

    return (
        <div className="addContainer container">
            {!verifyVerse ? <form className="addContainerForm" onSubmit={handleSubmit}>
                <label htmlFor="verseAdd">Add Bible Verse Here: </label>
                <textarea type="text" id="verseAddText" name="verseAddText" placeholder="Ex: In the beginning, God created..." onChange={handleChange(false)}></textarea>
                <input text="text" id="verseAddReference" name="verseAddReference" placeholder="Genesis 1:1" onChange={handleChange(true)}></input>
                <button className="verseAddButton btn btn-dark btn-sm">Add</button>
            </form> : <Verify />}
        </div>
    )
}