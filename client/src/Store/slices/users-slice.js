import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        userType: ''
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

export const usersActions = usersSlice.actions;

export default usersSlice;