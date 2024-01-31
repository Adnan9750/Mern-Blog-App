
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clientToken : null
}

const tokenSlice = createSlice({
    name : 'userToken',
    initialState,
    reducers :{
        setUserToken : (state,action)=>{
            state.clientToken = action.payload.clientToken
        }
    }
}) 

export const {setUserToken} = tokenSlice.actions

export default tokenSlice.reducer