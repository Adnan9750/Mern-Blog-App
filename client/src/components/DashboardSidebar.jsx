import axios from 'axios'
import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { signoutUser } from '../redux/slices/userSlice'

const DashboardSidebar = () => {

    const {currentUser} = useSelector((state)=>state.user)

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
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to={'/dashboard?tab=profile'}>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} 
                        label={currentUser.isAdmin ? 'Admin' : 'User'} 
                        labelColor='dark' as='div' >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {
                        currentUser.isAdmin && (
                            <Link to={'/dashboard?tab=users'}>
                                <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                                    Users
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentUser.isAdmin && (
                            <Link to={'/dashboard?tab=posts'}>
                                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                                    Posts
                                </Sidebar.Item>
                            </Link>
                        )
                    }
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
