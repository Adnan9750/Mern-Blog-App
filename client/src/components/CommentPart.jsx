
import axios from 'axios'
import { Button, Textarea } from 'flowbite-react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const CommentPart = ({postId}) => {

    const {currentUser} = useSelector((state)=>state.user)
    const [comment,setComment] = useState('')

    const handleForm = async (e) =>{
        e.preventDefault()
        if(comment.length > 200){
            return; 
        }
        const res = await axios.post('/server/comment/create',{
            commentContent:comment,
            postId,
            userId:currentUser._id
        })
        // console.log(res);
        if(res.status === 200){
            setComment('')
        }
    }

  return (
    <>
      <div className='max-w-2xl mx-auto w-full p-3'>
      {
        currentUser ? (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img className='h-5 w-5 object-cover rounded-full' src={currentUser.avatar} alt='' />
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                    @{currentUser.username}
                </Link>
            </div>
        ) :
        (
            <div className='flex gap-1 my-5 text-sm'>
                You must be Login to comment:
                <Link to={'/sign-in'} className='text-blue-500'>
                    Sign-in
                </Link>
            </div>
        )
      }
      { currentUser && (
        <form onSubmit={handleForm} className='border border-teal-500 rounded-md p-3'>
            <Textarea
                placeholder='Add a comment ...'
                rows='3'
                maxLength='200'
                onChange={(e)=>setComment(e.target.value)}
                value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
                <p className='text-sm text-gray-500'>
                    {200 - comment.length} characters are remaining
                </p>
                <Button gradientDuoTone='purpleToPink' outline type='submit'>
                    Submit
                </Button>
            </div>
        </form>
      )}
      </div>
    </>
  )
}

export default CommentPart
