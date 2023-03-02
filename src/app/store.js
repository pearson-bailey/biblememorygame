import {configureStore} from "@reduxjs/toolkit";
import versesReducer from '../features/verse/versesSlice';
import usersReducer from '../features/user/usersSlice';

function loadState() {
    try {
        const serializedState = localStorage.getItem("persistentState");
        if (!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

export const store = configureStore({
    reducer: {
        verses: versesReducer,
        users: usersReducer,
    },
    preloadedState: loadState(),
})

function saveToLocalStorage(state) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persistentState", serializedState);
}

store.subscribe(() => saveToLocalStorage(store.getState()));