import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {

  const [formData,setFormData] = useState({})
  const [error,setError] = useState({
    status:false,
    message:'',
    errorType:''
  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const formSubmit = async (e) =>{
    e.preventDefault()

    if(formData.email && formData.password){
      setLoading(true)
      // Form submission
      const res = await axios.post('/server/auth/signin',formData)
      // console.log(res); 
      if(res.data.status === 'success'){
        setError({status:true,message:res.data.message,errorType:'success'})
        setTimeout(()=>{
          navigate('/')
        },2000)
        setLoading(false)
      }
      if(res.data.status === 'failed'){
        setError({status:true,message:res.data.message,errorType:'failure'})
      }
    }else{
      return setError({status:'failure',message:"Please Fill all fields",errorType:'failure'})
    }
  }

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
          <div className='flex-1 order-1'>
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