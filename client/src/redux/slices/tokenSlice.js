
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : null
}

const tokenSlice = createSlice({
    name : 'userToken',
    initialState,
    reducers :{
        setUserToken : (state,action)=>{
            state.token = action.payload.token
        }
    }
}) 

export const {setUserToken} = tokenSlice.actions

export default tokenSlice.reducer