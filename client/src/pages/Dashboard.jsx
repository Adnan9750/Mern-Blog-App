import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardProfile from '../components/DashboardProfile'
import DashboardPost from '../components/DashboardPost'
import DashboardUser from '../components/DashboardUser'

const Dashboard = () => {
  const location = useLocation()
  const [tab,setTab] = useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabUrl = urlParams.get('tab')
    if(tabUrl){
      setTab(tabUrl)
    }
    // console.log(tabUrl);
  },[location.search])

  return (
    <>
      <div className='min-h-screen flex flex-col md:flex-row'>
        {/* sideBar left side */}
        <div className='md:w-56'>
          <DashboardSidebar />
        </div>
          {/* Profile right side ...*/}
          {
            tab === 'profile' && <DashboardProfile/>
          }
          {/* posts ... */}
          { tab === 'posts' && <DashboardPost/> }
          {/* user ... */}
          { tab === 'users' && <DashboardUser/> }
      </div>
    </>
  )
}

export default Dashboard
