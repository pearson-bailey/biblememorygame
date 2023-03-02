import React, {useCallback, useMemo, useState} from "react"
import {gameVerseState, deleteGameVerse} from './features/verse/versesSlice';
import {useDispatch, useSelector} from 'react-redux';

function Modal({wrongWords, closeModal, showModal}) {
    return <div className={showModal ? "gameModalShow" : "gameModalHide"}>
        {wrongWords ? <div>{`You missed ${wrongWords} words.`}</div> : <div>{'Great work!'}</div>}
        <button onClick={()=>closeModal()}>Close</button>
    </div>
}

export default function Game () {
    const dispatch = useDispatch();
    const gameVerse = useSelector(gameVerseState);
    //Set a local variable of the verse string
    const verseArray = useMemo(() => gameVerse.verseText.trim().split(" "), [gameVerse]);
    const [answerText, setAnswerText] = useState([]);
    const [wrongWords, setWrongWords] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const randomNumberArray = useMemo(() => {
        const rands = [];
        while (rands.length < verseArray.length * 0.5) {
            const r = Math.floor(Math.random() * verseArray.length);
            if (rands.indexOf(r) === -1) {
                rands.push(r);
            }
        }
        return rands;
    }, [verseArray]);

    const handleChange = useCallback((event) => {
        const {id, innerText} = event.target;
        setAnswerText(prevAnswerText => ({...prevAnswerText, [id]: innerText}));
      }, [])

      const closeModal = useCallback(() => {
        setShowModal(false);
        !wrongWords ? dispatch(deleteGameVerse()) : setWrongWords(0);
      }, [wrongWords, setWrongWords, setShowModal, dispatch])

// Render words in a loop; use randomNumbers array to render input boxes
    const gameVerseCopy = verseArray
    let i = 0;

    // eslint-disable-next-line array-callback-return
    const displayVerse = gameVerseCopy.map((word, index) => {
        if (randomNumberArray.includes(index)) {
            if (i === 0) {
                i++;
                return <div type="text" id={index} key={index} className="gameVerseInput" contentEditable="true" onInput={handleChange} autoCapitalize="none"/>
            } else {
                return <div type="text" id={index} key={index} className="gameVerseInput" contentEditable="true" onInput={handleChange} autoCapitalize="none"/>
            }
        } else {
            return <h3 className="gameVerse" id={index} key={index} >{word}</h3>
        }
    });

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        let wrongWordsCount = 0;
        randomNumberArray.forEach((number) => {
            let word;
            if (answerText[number] !== undefined) {
                word = answerText[number].replace(/[^\w]|_/g, "").trim().toLowerCase();
            } else {
                word = " ";
            }
            if (word !== verseArray[number].replace(/[^\w]|_/g, "").trim().toLowerCase()) {
                wrongWordsCount++;
                document.getElementById(number).className = "wrongWord";
            } else {
                document.getElementById(number).className = "gameVerseInput";
            }
        })
        setWrongWords(wrongWordsCount);
        setShowModal(true);
    }, [answerText, randomNumberArray, verseArray]);
    
    return (
        <div className="outerVerifyContainer" onSubmit={handleSubmit}>
            <form className="verifyContainer verseText" autoComplete="off">
                {displayVerse}
                <h5 className="verifyText">({gameVerse.verseReference})</h5>
                <button>Check</button>
            </form>
            <Modal wrongWords={wrongWords} closeModal={closeModal} showModal={showModal} />
            {showModal && !wrongWords ? 
                <div>
                    <div class="firework"></div>
                    <div class="firework"></div>
                    <div class="firework"></div>
                </div> : null}
        </div>
    );
}