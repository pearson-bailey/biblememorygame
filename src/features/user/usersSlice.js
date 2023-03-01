import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    signUp: false,
    signIn: false,
    loggedIn: false,
    userInfo: [],
    userVerseArray: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        signUpToggle: (state) => {
            state.signUp = !state.signUp;
        },
        signInToggle: (state) => {
            state.signIn = !state.signIn;
        },
        addUser: (state, payload) => {
            state.users.push(payload);
        },
        updateUser: (state, {payload}) => {
            const index = state.users.findIndex(user => user.id === payload.id);
            state.users[index] = payload;
        },
        deleteUser: (state, {payload}) => {
            state.users = state.users.filter(verse => verse.id !== payload);
        },
        loginStatusToggle: (state, {payload}) => {
            state.loggedIn = !state.loggedIn;
        },
    },
});

export const signUpState = (state) => state.users.signUp;

export const signInState = (state) => state.users.signIn;

export const loggedInState = (state) => state.users.loggedIn;

export const userState = (state) => state.users.userInfo;

export const userVerseArrayState = (state) => state.users.userVerseArray;

export const {
    signUpToggle,
    signInToggle,
    addUser,
    updateUser,
    deleteUser,
    loginStatusToggle,
} = usersSlice.actions;

export default usersSlice.reducer;