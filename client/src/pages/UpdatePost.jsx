
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector} from 'react-redux'

const UpdatePost = () => {

    const {currentUser} = useSelector((state)=>state.user)

    
    const [formData,setFormData] = useState({})
    const [file,setFile] = useState(null)
    const [imageUploadProgress,setImageUploadProgress] = useState(null)
    const [uploadImageError,setUploadImageError] = useState(null)
    const [publishError,setPublishError] = useState(null)

    // console.log(formData._id);
    const navigate = useNavigate()

    const {postId} = useParams()

    useEffect(()=>{
        try {
            const fetchSinglePost = async () => {
                const res = await axios.get(`/server/post/getposts?postId=${postId}`)
                // console.log(res);
                if(res.status === 200) {
                    setPublishError(null)
                    setFormData(res.data.posts[0])
                }
                if(res.status !== 200){
                    setPublishError('Something went wrong. Please try again')
                }
            }
            fetchSinglePost()
        } catch (error) {
            console.log(error.message);
        }
    },[postId])

    const handleuploadImage = async () => {
        try {
          if(!file){
            setUploadImageError('Please select an image')
            return;
          }
          setUploadImageError(null)
          const storage = getStorage(app)
          const fileName = new Date().getTime() + '-' + file.name;
          const storageRef = ref(storage,fileName)
          const uploadTask = uploadBytesResumable(storageRef,file)
          uploadTask.on(
            'state_changed',
            (snapshot)=>{
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress(progress.toFixed(0))
            },
            (err)=>{
              setUploadImageError('Image upload failed')
              setImageUploadProgress(null)
            },
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageUploadProgress(null)
                setUploadImageError(null)
                setFormData({
                  ...formData,
                  image: downloadURL
                });
              });
            }
          )
        } catch (error) {
          setUploadImageError('Image upload failed')
          setImageUploadProgress(null)
          // console.log(error);
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          const res = await axios.post(`/server/post/updatepost/${formData._id}/${currentUser._id}`,formData)
          console.log(res);
          navigate(`/blogPost/${res.data.slug}`) 
          console.log(res);
        } catch (error) {
          setPublishError('Something went wrong. Please try again')
        }
      }

  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput 
                  type="text" 
                  placeholder="Title" 
                  required id="title" 
                  className="flex-1"
                  onChange={(e)=>setFormData({...formData, title: e.target.value})}
                  defaultValue={formData.title}
                  />
                <Select onChange={(e)=>setFormData({...formData, category:e.target.value})}
                    value={formData.category}
                >
                    <option value="uncategorized">Select a Category</option>
                    <option value="javascript">Javascript</option>
                    <option value="reactjs">React Js</option>
                    <option value="nextjs">Next Js</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border border-slate-400 p-3">
                <FileInput type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
                <Button type="button" size='sm' outline 
                  onClick={handleuploadImage} 
                  disabled={imageUploadProgress}
                >
                  {
                    imageUploadProgress ? (
                      <div className="w-16 h-16">
                        <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0} %`} />
                      </div>
                    ) : (
                      'Upload Image'
                    )
                  }
                </Button>
            </div>
            {
              uploadImageError && (
                <Alert color='failure'>
                  {uploadImageError}
                </Alert>
              )
            }
            {
              formData.image && (
                <img 
                  src={formData.image}
                  alt="upload_pic"
                  className="w-full h-[450px] object-cover"
                />
              )
            }
            <ReactQuill 
              theme="snow" 
              value={formData.content}
              placeholder="Write something..."  
              className='h-72 mb-12' required
              onChange={(value)=>setFormData({...formData,content:value})}
              />
            <Button type="submit" >
                Update Post
            </Button>
            {
              publishError && 
                <Alert color='failure' className="mt-5">{publishError}</Alert>
            }
        </form>
      </div>
    </>
  )
}

export default UpdatePost
