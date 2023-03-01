/* eslint-disable jsx-a11y/alt-text */
import {useState, useEffect} from "react";
import {Collapse} from 'bootstrap';
import {useSelector, useDispatch} from "react-redux";
import {versesState, 
    gameVerseState,
    setGameVerse,
    deleteGameVerse} from './features/verse/versesSlice';
import {signUpState,
    signUpToggle,
} from './features/user/usersSlice';
import px from 'prop-types';

export default function Header ({setAddVerse, addVerse, setVerseSearch, verseSearch}) {
    const verses = useSelector(versesState);
    const gameVerse = useSelector(gameVerseState);
    const signUp = useSelector(signUpState);
    const dispatch = useDispatch();
    var [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        var myCollapse = document.getElementById('collapseTarget')
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })


    function startGame() {
        if(Object.keys(gameVerse).length) {
          dispatch(deleteGameVerse());
        } else {
          let randomVerseIndex = 0;
          randomVerseIndex = Math.floor(Math.random() * verses.length);
          dispatch(setGameVerse(verses[randomVerseIndex]));
        }
      };

    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <div className="container-fluid">
                <a href="/" className="headerBrand d-flex flex-row">
                <img className="navbar-brand headerLogo" src="images/bible.png"></img>
                <div className="navbar-brand headerText">Memory Game</div>
                </a>
                <button className="navbar-toggler" onClick={() => setToggle(toggle => !toggle)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse gap-2 col-6 d-md-flex justify-content-md-end" id="collapseTarget">
                    <div className="navbar-nav">
                            <button className="nav-btn me-md-1" onClick={() => {setAddVerse(!addVerse); setVerseSearch(false);}}>{addVerse ? `Cancel` : `Add`}</button>
                            <button className="nav-btn me-md-1" onClick={() => {setVerseSearch(!verseSearch); setAddVerse(false)}}>{verseSearch ? `Cancel` : `Search`}</button>
                            <button className="nav-btn me-md-1" style={{display: verses[0] ? "inline-block" : "none"}} onClick={startGame}>{Object.keys(gameVerse).length ? `End Game` : `Start Game`}</button>
                            <button className="nav-btn me-md-1" onClick={() => dispatch(signUpToggle())}>{signUp ? `Cancel` : `Sign Up`}</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

Header.propTypes = {
    setAddVerse: px.func,
    addVerse: px.bool,
    setVerseSearch: px.func,
    verseSearch: px.bool,
};