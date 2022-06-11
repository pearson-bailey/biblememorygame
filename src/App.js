import React, { useEffect } from "react"
import Header from "./Header"
import Verify from "./Verify"
import Search from "./Search"
import UserList from "./UserList"
import Welcome from "./Welcome"
import Game from "./Game"
import Footer from "./Footer"

function App() {
  const [verse, setVerse] = React.useState(null)
  const [verseSearch, setVerseSearch] = React.useState(false)
  const [reference, setReference] = React.useState(null)
  const [verseSearchText, setVerseSearchText] = React.useState(null)
  const [verseBundle, setVerseBundle] = React.useState(JSON.parse(localStorage.getItem("verseBundle")) || [{
    verseItem: "",
    verseReference: ""
  }])
  const [playGame, setPlayGame] = React.useState(false)
  const [gameVerse, setGameVerse] = React.useState("");
  const [gameReference, setGameReference] = React.useState("");

function addVerse() {
  setVerseSearch(prevVerseSearch => !prevVerseSearch)
}

function removeVerse(reference) {
  const newBundle = verseBundle.filter(function(f) { return f.verseReference !== reference})
  setVerseBundle(newBundle);
}

useEffect(() => {
  localStorage.setItem("verseBundle", JSON.stringify(verseBundle))
}, [verseBundle])

// Crossway ESV API Call
React.useEffect(() => {
  async function fetchData() {
    const response = await fetch("https://api.esv.org/v3/passage/text/?"
    + new URLSearchParams({
      "q": `${reference}`,
      'include-headings': false,
      'include-footnotes': false,
      'include-verse-numbers': false,
      'include-short-copyright': false,
      'include-passage-references': false
    }), {
      headers: {

        Authorization: `Token ${process.env.REACT_APP_ESV_TOKEN}`
      }
    });
    const data = await response.json();
    const item = data.passages[0];
    setVerse(item);
  }
fetchData();
}, [reference]);

const handleChange = React.useCallback((event) => {
  setVerseSearchText(event.target.value)
}, [])

function handleSubmit(event) {
  setReference(verseSearchText);
  event.preventDefault();
}

function handleVerify(id) {
  if (id === "verifyYes") {
    setVerseBundle(prevBundle => [...prevBundle, {
      verseItem: verse,
      verseReference: reference
    }])
    setReference(null);
    setVerse(null);
    setVerseSearch(prevVerseSearch => !prevVerseSearch)
  } else if (id ==="verifyNo") {
    setReference(null);
    setVerse(null);
    setVerseSearch(prevVerseSearch => !prevVerseSearch)
  }
}

let randomVerseIndex = 0;

function startGame() {
  setPlayGame(prevPlayGame => !prevPlayGame);
  randomVerseIndex = Math.floor(Math.random() * verseBundle.length) + 1;
  setGameVerse(verseBundle[randomVerseIndex].verseItem);
  setGameReference(verseBundle[randomVerseIndex].verseReference);
}

function endGame() {
  setPlayGame(prevPlayGame => !prevPlayGame)
}

const verseElements = verseBundle.slice(1).map(verse => {
  return <UserList verse={verse.verseItem} reference={verse.verseReference} removeVerse={removeVerse} />
})

  return (
    <div className="App">
      <Header addVerse={addVerse} verseSearch={verseSearch} startGame={startGame} playGame={playGame} verseBundleExists={verseBundle.length}/>
      {verseSearch && <Search handleSubmit={handleSubmit} handleChange={handleChange} />}
      {reference && <Verify verse={verse} handleVerify={handleVerify} />}
      {verseBundle.length>1 && !playGame && <h1 className="verseBundleHeading">Your Verses:</h1>}
      {verseBundle.length>1 && !playGame && verseElements}
      {verseBundle.length<2 && !playGame && !verseSearch && <Welcome />}
      {playGame && <Game gameVerse={gameVerse} gameReference={gameReference} endGame={endGame} />}
      <Footer />
    </div>
  );
}

export default App;