
import axios from 'axios'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Table } from 'flowbite-react';
import {Link} from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const DashboardPost = () => {

  const {currentUser} = useSelector((state)=>state.user)
  const [userPost,setUserPost] = useState([])
  // console.log(userPost); 

  useEffect(()=>{
    const fetchPosts = async () =>{
      try {
        const res = await axios.get(`/server/post/getposts?userID=${currentUser._id}`)
        if(res.status === 200){
          setUserPost(res.data.posts)
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin){
      fetchPosts()
    }

  },[currentUser._id])

  return (
    <>
      <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100
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
                  userPost.map((currPost)=>(
                    <Table.Body className='divide-y'>
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
                        <Table.Cell className='text-lg text-red-500'>
                            <span><MdDelete/></span>
                        </Table.Cell>
                        <Table.Cell className='text-lg text-teal-500'>
                            <Link to={`/update-post/${currPost._id}`}>
                              <span><FaRegEdit/></span>
                            </Link>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))
                }
              </Table>
            </>
          ) : (
            <p>You have no post yet</p>
          )
        }
      </div>
       
    </>
  )
}

export default DashboardPost
