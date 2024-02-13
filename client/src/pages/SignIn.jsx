import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signinFailure } from '../redux/slices/userSlice'
import { getToken, storeToken } from '../services/LocalStorageService'
import { setUserToken } from '../redux/slices/tokenSlice'
import GoogleAuth from '../components/GoogleAuth'

const SignIn = () => {

  const dispatch = useDispatch()
  const {loading,error} = useSelector((state)=> state.user)
  
  const [formData,setFormData] = useState({})

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value.trim()
    })
  }

  const formSubmit = async (e) =>{
    e.preventDefault()

    if(formData.email && formData.password){

      dispatch(signInStart())
      // Form submission
      const res = await axios.post('/server/auth/signin',formData)
      // console.log(res); 
      if(res.data.status === 'success'){
        dispatch(signInSuccess({status: true, message: res.data.message,errorType:'success'}))

        setTimeout(()=>{
          dispatch(signInSuccess(res.data.userData))
          // store token in localStorage
          // storeToken(res.data.token)
          navigate('/')
        },2000)
      }
      if(res.data.status === 'failed'){
        dispatch(signinFailure({status: true, message: res.data.message,errorType:'failure'}))
      }
    }else{
      dispatch(signinFailure({status: true, message: "Please Fill all fields",errorType:'failure'}))
    }
  }

  // const token = getToken('token')

  // useEffect(()=>{
  //   dispatch(setUserToken({clientToken:token}))
  // },[token,dispatch])

  return (
    <>
      <div className='min-h-[90vh] mt-10'>
        <div className='flex mt-4 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center 
         rounded-lg gap-2'>
          {/* left */}
            
          <div className='flex-1 self-center order-2'>
            <img src='/signin.png' />
          </div>
          {/* right */}
          <div className='flex-1 order-1 px-8 sm:px-14 md:px-0'>
            <h1 className='text-center text-3xl font-semibold'>Sign In</h1>
            <form className='flex flex-col gap-4 mt-5' onSubmit={formSubmit} id='signin-form'>
              <div>
                <Label value='Your Email'/>
                <TextInput type='email' placeholder='email' id='email' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your Password'/>
                <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                {
                  loading ? (
                    <>
                      <Spinner size='sm'/>
                      <span className='pl-3'>loading ...</span>
                    </>
                  ) : 'Sign In'
                }
              </Button>
              <GoogleAuth/>
            </form>
            <div className='mt-3 flex gap-2'>
              <span>Don't have an acoount?</span>
              <Link to='/sign-up' className='text-blue-500'>
                SignUp
              </Link>
            </div>
            {
              error.status && (
                <Alert className='mt-5' color={error.errorType}>
                  {error.message}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn