import {createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

const ESV_URL = "https://api.esv.org/v3/passage/text/?";

const initialState = {
    verseSearch: false,
    status: 'idle',
    verseArray: [],
    verifyVerse: {},
    gameVerse: {},
};

export const fetchVerse = createAsyncThunk('verses/fetchVerse', async (payload) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token ccd243eaccab373301f2109292d83816ab668819");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    const params = new URLSearchParams({
        'q': `${payload}`,
        'include-headings': false,
        'include-footnotes': false,
        'include-verse-numbers': false,
        'include-short-copyright': false,
        'include-passage-references': false
    });
    return await fetch(ESV_URL + params.toString(), requestOptions).then((res) => res.json());
});

export const versesSlice = createSlice({
    name: 'verses',
    initialState,
    reducers: {
        verseSearchToggle: (state) => {
            state.verseSearch = !state.verseSearch;
        },
        addVerse: (state) => {
            state.verseArray.push(state.verifyVerse);
        },
        addCustomVerse: (state, {payload}) => {
            state.verseArray.push({id: nanoid(), verseText: payload.verseText, verseReference: payload.verseReference});
        },
        deleteVerse: (state, {payload}) => {
            state.verseArray = state.verseArray.filter(verse => verse.id !== payload);
        },
        deleteVerifyVerse: (state) => {
            state.verifyVerse = {};
            state.status = 'idle';
        },
        setGameVerse: (state, {payload}) => {
            state.gameVerse = payload;
        },
        deleteGameVerse: (state) => {
            state.gameVerse = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVerse.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchVerse.fulfilled, (state, {payload}) => {
                const newVerse = {id: nanoid(), verseText: payload.passages[0], verseReference: payload.canonical};
                state.verifyVerse = newVerse;
                state.status = 'succeeded';
            })
            .addCase(fetchVerse.rejected, (state, action) => {
                state.status = 'failed';
            })
    },
});

export const verseSearchState = (state) => state.verses.verseSearch;

export const versesState = (state) => state.verses.verseArray;

export const verifyVerseState = (state) => state.verses.verifyVerse;

export const gameVerseState = (state) => state.verses.gameVerse;

export const {
    verseSearchToggle, 
    addVerse,
    addCustomVerse, 
    deleteVerse,  
    deleteVerifyVerse, 
    setGameVerse, 
    deleteGameVerse
} = versesSlice.actions;

export default versesSlice.reducer;