import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        userType: ''
    },
    reducers: {
        setUserType(state, action) {
            state.userType = action.payload;
        },
        removeUserType(state, action) {
            state.userType = action.payload;
        }
    }
});

export const usersActions = usersSlice.actions;

export default usersSlice;