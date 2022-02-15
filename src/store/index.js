import { configureStore } from "@reduxjs/toolkit";
import firstSlice from "./first-slice";
const store =configureStore({
    reducer : {first : firstSlice.reducer}
});
export default store;