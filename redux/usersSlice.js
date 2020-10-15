import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice ( {
    name: "users",
    initialState: {
        isLoggedIn: false,
        token: null
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.token = null;
        }
    }
})

const { actions, reducer } = userSlice;
export const { login, logout } = actions;
export default reducer;