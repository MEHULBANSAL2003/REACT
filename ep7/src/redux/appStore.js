import {configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from "./cartSlice.js";
import locationRed from "./locationSlice.js"


const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, locationRed);

const appStore=configureStore({
    reducer:{
        cart:cartReducer,
        location:persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(appStore);

export { appStore, persistor };
