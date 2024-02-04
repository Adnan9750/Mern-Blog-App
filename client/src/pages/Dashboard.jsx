import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardProfile from '../components/DashboardProfile'

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
        {/* Profile right side */}
        <div>
          {
            tab === 'profile' && <DashboardProfile/>
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard
