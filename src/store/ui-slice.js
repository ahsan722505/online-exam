import { createSlice } from "@reduxjs/toolkit";
const uiSlice=createSlice({
    name : "ui",
    initialState : {
        initialLoading : true,
        modal : {
            show : false,
            content : "",
        }
    },
    reducers : {
        toggleInitialLoading(state){
            state.initialLoading= !state.initialLoading;
        },
        showModal(state,action){
            state.modal.show=true;
            state.modal.content=action.payload.content;
        },
        closeModal(state){
            state.modal.show=false;
            state.modal.content="";
        }
    }
});
export const uiActions = uiSlice.actions;
export default uiSlice;