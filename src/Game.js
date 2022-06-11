import React, {useState, useEffect} from "react"

export default function Game (props) {
    //Set a local variable of the verse string
    let verseArray = props.gameVerse;
    const [randomNumberArray, setRandomNumberArray] = useState([])
    const [answerText, setAnswerText] = useState([])

    //Convert verse string to an array of words
    verseArray = verseArray.toString().trim().split(" ");

    useEffect(() => {
        //Init a blank array for random numbers
        let randomNumbers = new Set();

        // Fill the array of random numbers equal to half the size of verse array
        while (randomNumbers.size !== Math.floor(verseArray.length * 0.5)) {
            randomNumbers.add(Math.floor(Math.random() * verseArray.length));
        }

        setRandomNumberArray(Array.from(randomNumbers))
        
        randomNumberArray.forEach((number) => {
            setAnswerText(prevAnswerText => ({...prevAnswerText, number : " "}))
        })
    }, [verseArray.length])

    const handleChange = React.useCallback((event) => {
        const {id, innerText} = event.target
        setAnswerText(prevAnswerText => ({...prevAnswerText, [id]: innerText}))
      }, [])

// Render words in a loop; use randomNumbers array to render input boxes
    const gameVerse = verseArray
    let i = 0;

    // eslint-disable-next-line array-callback-return
    const displayVerse = gameVerse.map((word, index) => {
        if (randomNumberArray.includes(index)) {
            if (i === 0) {
                i++;
                return <div type="text" id={index} className="gameVerseInput" contentEditable="true" onInput={handleChange} autoCapitalize="none"/>
            } else {
                return <div type="text" id={index} className="gameVerseInput" contentEditable="true" onInput={handleChange} autoCapitalize="none"/>
            }
        } else {
            return <h3 className="gameVerse" >{word}</h3>
        }
    })

    function handleSubmit(event) {
        event.preventDefault()
        let wrongWords = 0
        randomNumberArray.forEach((number) => {
            // Figure out why answerData.number is not returning a value
            let word
            if (answerText[number] !== undefined) {
                word = answerText[number].replace(/[^\w]|_/g, "").trim().toLowerCase()
            } else {
                word = " "
            }
            if (word !== verseArray[number].replace(/[^\w]|_/g, "").trim().toLowerCase()) {
                wrongWords = wrongWords + 1
                document.getElementById(number).className = "wrongWord"
            } else {
                document.getElementById(number).className = "gameVerseInput"
            }
        })
        if (wrongWords === 0) {
            alert("Great work!")
            props.endGame()
        } else {
            alert(`You missed ${wrongWords} words.`)
            wrongWords = 0
        }
    }
    
    return (
        <div className="outerVerifyContainer" onSubmit={handleSubmit}>
            <form className="verifyContainer verseText" autocomplete="off">
                {displayVerse}
                <h3 className="verifyText">({props.gameReference})</h3>
                <button>Check</button>
            </form>
        </div>
    );
}