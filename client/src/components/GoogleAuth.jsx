import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import axios from 'axios'

const GoogleAuth = () => {

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        try {
            const auth = getAuth(app)
            const googleResult = await signInWithPopup(auth,provider)
            const res = await axios.post('/server/auth/googleSignIn',{
                username : googleResult.user.displayName,
                email : googleResult.user.email,
                photoUrl : googleResult.user.photoURL
            })
            console.log(googleResult);
        } catch (error) {
            console.log(error);
        }
    }

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
