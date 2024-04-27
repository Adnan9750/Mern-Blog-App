import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Comment = ({currentComment}) => {

    useEffect(()=>{
        const getCommentedUser = async () => {
          try {
            const res = await axios.get(`/server/user/${currentComment.userId}`);
            console.log(res.data); // Assuming you want to log the response data
        } catch (error) {
            console.error('Error fetching commented user:', error);
        }
        }
        getCommentedUser();
    },[currentComment])

  return (
    <>
      <h1>Comment</h1>
    </>
  )
}

export default Comment
