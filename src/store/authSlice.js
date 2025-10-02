import { createSlice } from "@reduxjs/toolkit";


const initialState = { token: null, userId: null, isChange: false };
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthToken(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout(state) {
            state.token = null;
            state.userId = null;
        },
        change(state) {
            state.isChange = !state.isChange;
        }
    }
});

export const authAction = authSlice.actions;
export default authSlice.reducer;