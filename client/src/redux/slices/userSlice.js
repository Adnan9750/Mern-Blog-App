
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : {
        status : false,
        message: '',
        errorType :''
    },
    loading : false
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        signInStart : (state,action)=>{
            state.loading = true
            // state.error = null
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload,
            state.loading = false
            state.error = {
                status : action.payload.status,
                message : action.payload.message,
                errorType : action.payload.errorType
            }
        },
        signinFailure : (state,action)=>{
            state.loading = false,
            state.error = {
                status : action.payload.status,
                message : action.payload.message,
                errorType : action.payload.errorType
            }
        }
    }
});

export const {signInStart,signInSuccess,signinFailure} = userSlice.actions

export default userSlice.reducer