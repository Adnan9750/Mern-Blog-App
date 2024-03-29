
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import tokenSlice from './slices/tokenSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import themeReducer from './slices/themeSlice'

const rootReducer = combineReducers({
    user:userSlice,
    theme:themeReducer,
    // userToken:tokenSlice
});

const persistConfig = {
    key : 'root',
    storage,
    version : 1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware :(getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck : false}),
    
})

export const persister = persistStore(store)