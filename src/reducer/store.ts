import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userClipSlice from "./userClipSlice";
import { persistReducer,  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userClipSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



export default configureStore({
  reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });



