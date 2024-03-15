
import axios from 'axios'
import { Button, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = () => {

    const {postSlug} = useParams()
    const [loading,setLoading] = useState(true)
    const [postData,setPostData] = useState(null)
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchPostData = async () => {
            try {
                const res = await axios.get(`/server/post/getposts?slug=${postSlug}`)
                // console.log(res);
                if(res.status !== 200){
                    setError(true)
                    setLoading(false)
                    return;
                }
                if(res.status === 200){
                    setPostData(res.data.posts[0])
                    setLoading(false)
                    setError(false)
                }
            } catch (error) {
                setError(true);
                setLoading(false)
            }
        };
        fetchPostData()
    },[postSlug])

    if (loading) return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl' />
        </div>
    );
    // return <div>Post Page</div>
    return (
        <>
            <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
                <h1 className='text-3xl lg:text-4xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto'>
                    {postData && postData.title}
                </h1>
                <Link to={`/search?category=${postData && postData.category}`} className='self-center mt-5'>
                    <Button color='gray' pill size='xs' className=''>{postData && postData.category}</Button>
                </Link>
                <img src={postData && postData.image} alt={postData && postData.title} 
                    className='p-5 mt-8 max-h-[600px] w-full object-cover'
                />
                <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                    <span>{postData && new Date(postData.createdAt).toLocaleDateString() }</span>
                    <span>{postData && (postData.content.length / 1000).toFixed(0)} mins read</span>
                </div>
                <div className='p-3 max-w-2xl mx-auto w-full post-content' 
                dangerouslySetInnerHTML={{__html: postData && postData.content}}></div>
            </main>
        </>
    )
}

export default PostPage
