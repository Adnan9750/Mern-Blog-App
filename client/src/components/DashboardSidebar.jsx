import axios from 'axios'
import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { signoutUser } from '../redux/slices/userSlice'

const DashboardSidebar = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const [tab,setTab] = useState('')

    useEffect(()=> {
        const urlParams = new URLSearchParams(location.search)
        const taburl = urlParams.get('tab')
        if(taburl){
            setTab(taburl)
        }
    },[location.search])

    const handleSignOut = async () => {
        await axios.post('/server/user/signout')
        dispatch(signoutUser())
    }

  return (
    <>
        <Sidebar className='w-full'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to={'/dashboard?tab=profile'}>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} 
                        labelColor='dark' as='div' >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        SignOut
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar> 
    </>
  )
}

export default DashboardSidebar
