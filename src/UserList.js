/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {useDispatch} from 'react-redux';
import {deleteVerse} from './features/verse/versesSlice';

export default function UserList(props) {
    const dispatch = useDispatch();
    const id = props.id;

    return (
        <div className="outerVerifyContainer">
            <div className="verifyContainer">
                <h2 className="verseText">{props.verseText}({props.verseReference})</h2>
                <img className="deleteLogo" src={process.env.PUBLIC_URL + "/images/bin.png"} onClick={() =>(dispatch(deleteVerse(id)))} title="Delete this verse?"></img>
            </div>
        </div>
    )
}