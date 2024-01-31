
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import tokenSlice from './slices/tokenSlice'

export const store = configureStore({
    reducer:{
        user: userSlice,
        userToken:tokenSlice
    }
})