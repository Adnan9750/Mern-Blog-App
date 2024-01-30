import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const [formData,setFormData] = useState({})
  const [error,setError] = useState({
    status : '',
    message:''
  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.id]:e.target.value.trim()
    })
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password){
      return setError({status: 'failure',message:'Please Fill all fields'})
    }

    try {
      setLoading(true)
      setError(null)
      const res = await axios.post('/server/auth/signup', formData);
      document.getElementById('signup-form').reset();
      setError({ status: 'success', message: res.data.message });

      setLoading(false)
      setTimeout(()=>{
          navigate('/sign-in')
        },2000)
      
    } catch (error) {
      if (error.response && error.response.data) {
        return setError({ status: 'failure', message: error.response.data.message });
      }
    }
  }


  return (
    <>
      <div className='min-h-[90vh] mt-10'>
        <div className='flex mt-4 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center 
         rounded-lg gap-2'>
          {/* left */}
            
          <div className='flex-1 self-center order-2 md:order-1'>
            <img src='/signup1.png'/>
            {/* <div className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                      rounded-md text-white'>
                  Adnan's
              </span>
              Blog
            </div>
            <p className='mt-5 text-sm'>
              SignUp and made your own blog's
            </p> */}
          </div>
          {/* right */}
          <div className='flex-1 order-1 md:order-2 px-8 md:px-0'>
          <h1 className='text-center text-3xl font-semibold'>SignUp</h1>
            <form className='flex flex-col gap-4 mt-4' onSubmit={formSubmit} id='signup-form'>
              <div>
                <Label value='Your username'/>
                <TextInput type='text' placeholder='username' id='username' onChange={handleChange}/>
              </div>
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
                  ) : 'Sign Up'
                }
              </Button>
            </form>
            <div className='mt-3 flex gap-2'>
              <span>Have an acoount?</span>
              <Link to='/sign-in' className='text-blue-500'>
                SignIn
              </Link>
            </div>
            {
              error && (
                <Alert className='mt-5' color={error.status}>
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

export default SignUp
