import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
      <div>
        <img src={user.avatar} alt={user.username} className='w-10 h-10 rounded-full bg-gray-200' />
      </div>
    </>
  )
}

export default Comment
