import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Comment = ({currentComment}) => {

    const [user,setUser] = useState({})

    useEffect(()=>{
        const getCommentedUser = async () => {
          // try {
            const res = await axios.get(`/server/user/${currentComment.userId}`);
            if(res.status === 200){
              setUser(res.data)
            }
            // console.log(res.data); 
        // } catch (error) {
        //     console.error('Error fetching commented user:', error);
        // }
        }
        getCommentedUser();
    },[currentComment])

  return (
    <>
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img src={user.avatar} alt={user.username} className='w-10 h-10 rounded-full bg-gray-200' />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.username}`: 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs'>{moment(currentComment.createdAt).fromNow()}</span>
        </div>
        <p className='text-gray-500 pb-2'>{currentComment.commentContent}</p>
      </div>
    </div>
    </>
  )
}

export default Comment
