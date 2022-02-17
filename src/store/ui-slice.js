import { createSlice } from "@reduxjs/toolkit";
const uiSlice=createSlice({
    name : "ui",
    initialState : {
        initialLoading : true,
        modal : {
            show : false,
            content : ""
        }
    },
    reducers : {
        toggleInitialLoading(state,action){
            state.initialLoading= !state.initialLoading;
        },
        setModal(state,action){
            state.modal.show=action.payload.show;
            state.modal.content=action.payload.content;
        }
    }
});
export const uiActions = uiSlice.actions;
export default uiSlice;