import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../services/LocalStorageService'

const PrivateRoute = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const tokenUser = getToken('token')
  return (
    <>
      {
        tokenUser ? <Outlet/> : <Navigate to={'/sign-in'} />
      }
    </>
  )
}

export default PrivateRoute
