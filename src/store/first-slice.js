import { createSlice } from "@reduxjs/toolkit";
const firstSlice=createSlice({
    name : "first",
    initialState : {
        initialLoading : true,
        userId : "",
        role : "",
        username : "",
    },
    reducers : {
        toggleInitialLoading(state,action){
            state.initialLoading= !state.initialLoading;
        },
        setAuthDetails(state,action){
            state.userId=action.payload.userId;
            state.role=action.payload.role;
            state.username=action.payload.username;
        }
    }
});
export const firstActions = firstSlice.actions;
export default firstSlice;