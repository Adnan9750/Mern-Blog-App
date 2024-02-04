import { Button } from 'flowbite-react'
import React, { useEffect } from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { getToken, storeToken } from '../services/LocalStorageService'
import { setUserToken } from '../redux/slices/tokenSlice'


const GoogleAuth = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        try {
            const auth = getAuth(app)
            const googleResult = await signInWithPopup(auth,provider)
            const res = await axios.post('/server/auth/googleSignIn',{
                username : googleResult.user.displayName,
                email : googleResult.user.email,
                profileUrl : googleResult.user.photoURL
            })
            console.log(res);
            // send userData to reduxToolKit
            dispatch(signInSuccess(res.data.userData))
            // store token in locaLStorage
            storeToken(res.data.token)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
    // get token from locaLStorage
    // const token = getToken('token')

    // useEffect(()=>{
    //   // send token to reduxToolKit
    //   dispatch(setUserToken({clientToken:token}))
    // },[,token,dispatch])

  return (
    <>
      <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleAuth}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
      </Button>
    </>
  )
}

export default GoogleAuth
