//redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import { albumReducer } from "./redux/reducer/albumReducer";

export const store = configureStore({
    reducer:{
        albumReducer
    }
})