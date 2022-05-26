import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        email: '',
        password: '',
        showPassword: false
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;