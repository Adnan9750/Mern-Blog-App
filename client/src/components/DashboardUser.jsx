
import axios from 'axios'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react';
import {Link} from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashboardUser = () => {

  const {currentUser} = useSelector((state)=>state.user)
  const [users,setUsers] = useState([])
  const [showMore,setShowMore] = useState(true)
  const [showModel,setShowModel] = useState(false)
  const [userToDelete,setUserToDelete] = useState('') 

  useEffect(()=>{
    const fetchUsers = async () =>{
      try {
        const res = await axios.get('/server/user/getusers')

        if(res.status === 200){
          setUsers(res.data.users)
          if(res.data.users.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin){
        fetchUsers()
    }

  },[currentUser._id])

  const handleShowMore = async () =>{
    const startIndex = users.length;
    try {
      const res = await axios.get(`/server/user/getusers?startIndex=${startIndex}`)
    //   console.log(res)
      if(res.status === 200) {
        setUsers((pervPost) =>[...pervPost,...res.data.users])
        if(res.data.users.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

const handleDeleteUser = async () => {
    setShowModel(false);
  
    // try {
      const res = await axios.delete(`/server/user/deleteuser/${userToDelete}`);
      console.log(res);
      if (res.status === 200) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userToDelete));
      }
    // } catch (error) {
    //   console.error('Error deleting user:', error.message);
    //   // Handle deletion error here (e.g., show notification)
    // }
  };

  return (
    <>
      <div className='table-auto overflow-x-scroll mx-auto p-3 scrollbar scrollbar-track-slate-100
        scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {
          currentUser.isAdmin &&  users.length > 0 ? (
            <>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell>Date Created</Table.HeadCell>
                  <Table.HeadCell>User Image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {
                  users.map((currUser)=>(
                    <Table.Body className='divide-y' key={currUser._id}>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>{new Date(currUser.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                            <img src={currUser.avatar} alt='user_profile' 
                              className='w-10 h-10 object-cover bg-slate-500 rounded-full'/>
                        </Table.Cell>
                        <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                                { currUser.username }
                        </Table.Cell>
                        <Table.Cell>{currUser.email}</Table.Cell>
                        <Table.Cell>
                        {currUser.isAdmin ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/> }</Table.Cell>
                        <Table.Cell className='text-xl text-red-500'>
                            <span onClick={() => {
                                setShowModel(true);
                                setUserToDelete(currUser._id)
                              }}
                            >
                              <MdDelete title='Delete'/>
                            </span>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))
                }
              </Table>
              {
                showMore && ( 
                  <button onClick={handleShowMore} 
                    className='w-full self-center text-teal-500 text-md font-semibold py-7'>
                    Show More
                  </button>
                )
              }
            </>
          ) : (
            <p>You have no user yet</p>
          )
        }
            <Modal
                show={showModel}
                onClose={()=>setShowModel(false)}
                popup
                size='md'
            >
                <Modal.Header/>
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                         dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-slate-500 dark:text-slate-400'>
                            Are you sure you want to delete this user
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={()=>setShowModel(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
      </div>
       
    </>
  )
}

export default DashboardUser
