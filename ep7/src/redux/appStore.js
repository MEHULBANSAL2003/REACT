import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import locationRed from "./locationSlice.js"


const appStore=configureStore({
    reducer:{
        cart:cartReducer,
        location:locationRed
    },
});

export default appStore;