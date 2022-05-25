import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import usersSlice from "./slices/users-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer
    },
});

export default store;