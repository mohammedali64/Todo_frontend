import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    user: null,
    isLogin: false,
    isLoading: false,
    token: localStorage.getItem("token") || null,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isLogin = true;
            state.user = action.payload.user;
            state.id = action.payload.id;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLogin = false;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
