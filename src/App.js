import React, {useMemo, useState} from "react"
import {useSelector} from "react-redux";
import {versesState, gameVerseState} from './features/verse/versesSlice';
import {signUpState} from './features/user/usersSlice';
// import {Routes, Route} from "react-router-dom";
import Header from "./Header"
import Search from "./Search"
import AddVerse from "./AddVerse";
import SignUp from "./SignUp"
import UserList from "./UserList"
import Welcome from "./Welcome"
import Game from "./Game"
import Footer from "./Footer"

function App() {
  const [verseSearch, setVerseSearch] = useState(false);
  const [addVerse, setAddVerse] = useState(false);
  const verses = useSelector(versesState);
  const gameVerse = useSelector(gameVerseState);
  const signUp = useSelector(signUpState);
  const playGame = useMemo(() => Object.keys(gameVerse).length, [gameVerse]);

const verseElements = verses.map(verse => {
  return <UserList verseText={verse.verseText} verseReference={verse.verseReference} id={verse.id} key={verse.id} />
})

  return (
    <div className="App">
        <Header setAddVerse={setAddVerse} addVerse={addVerse} setVerseSearch={setVerseSearch} verseSearch={verseSearch} />
        {verseSearch && <Search setVerseSearch={setVerseSearch} verseSearch={verseSearch} />}
        {addVerse && <AddVerse setAddVerse={setAddVerse} addVerse={addVerse} />}
        {signUp && <SignUp />}
          {verses.length<1 && !playGame && !verseSearch && !addVerse && <Welcome />}
          {verses.length!==0 && !playGame && <h1 className="verseBundleHeading">Your Verses:</h1>}
          {verses.length!==0 && !playGame && verseElements}
        {playGame && <Game />}
        <Footer />
    </div>
  );
}

export default App;