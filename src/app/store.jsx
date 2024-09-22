import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import autReducer from '../features/authSlice'
import landingRecuder from "../features/landingSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, autReducer)

//store created
export const store = configureStore({

  reducer: {
    auth: persistedReducer,
    landing:landingRecuder
  },


  //consolda çıkan serileştirme hatasını göstermiyor
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),

})

export const persistor = persistStore(store)
