
import axios from 'axios'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react';
import {Link} from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashboardPost = () => {

  const {currentUser} = useSelector((state)=>state.user)
  const [userPost,setUserPost] = useState([])
  const [showMore,setShowMore] = useState(true)
  const [showModel,setShowModel] = useState(false)
  const [postToDelete,setPostToDelete] = useState('') 

  useEffect(()=>{
    const fetchPosts = async () =>{
      try {
        const res = await axios.get(`/server/post/getposts?userID=${currentUser._id}`)
        if(res.status === 200){
          setUserPost(res.data.posts)
          if(res.data.posts.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin){
      fetchPosts()
    }

  },[currentUser._id])

  const handleShowMore = async () =>{
    const startIndex = userPost.length;
    try {
      const res = await axios.get(`/server/post/getposts?userID=${currentUser._id}&startIndex=${startIndex}`)
      // console.log(res);
      if(res.status === 200) {
        setUserPost((pervPost) =>[...pervPost,...res.data.posts])
        if(res.data.posts.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeletePost = async () =>{
    setShowModel(false);

    const res = await axios.delete(`/server/post/deletepost/${postToDelete}/${currentUser._id}`)
    if(res.status === 200){
      setUserPost((perv)=>
        perv.filter((post)=>post._id !== postToDelete)
      );
    }
    // console.log(res);
  }

  return (
    <>
      <div className='table-auto overflow-x-scroll w-screen p-5 scrollbar scrollbar-track-slate-100
        scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {
          currentUser.isAdmin &&  userPost.length > 0 ? (
            <>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell>Date Updated</Table.HeadCell>
                  <Table.HeadCell>Post Image</Table.HeadCell>
                  <Table.HeadCell>Post Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                {
                  userPost.map((currPost,index)=>(
                    <Table.Body className='divide-y' key={index}>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>{new Date(currPost.createdAt).toLocaleDateString()}</Table.Cell>
                        <Table.Cell>
                          <Link to={`/post/${currPost.slug}`}>
                            <img src={currPost.image} alt='post_pic' 
                              className='w-20 h-15 object-cover bg-slate-500'/>
                          </Link>
                        </Table.Cell>
                        <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                            <Link to={`/post/${currPost.slug}`}>
                                { currPost.title }
                            </Link>
                        </Table.Cell>
                        <Table.Cell>{currPost.category}</Table.Cell>
                        <Table.Cell className='text-xl text-red-500'>
                            <span onClick={() => {
                                setShowModel(true);
                                setPostToDelete(currPost._id)
                              }}
                            >
                              <MdDelete/>
                            </span>
                        </Table.Cell>
                        <Table.Cell className='text-xl text-teal-500'>
                            <Link to={`/update-post/${currPost._id}`}>
                              <span><FaRegEdit/></span>
                            </Link>
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
            <p>You have no post yet</p>
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
                            Are you sure you want to delete this post
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={()=>setShowModel(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
      </div>
       
    </>
  )
}

export default DashboardPost
