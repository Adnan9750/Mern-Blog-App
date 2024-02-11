
import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'
import { updataUser } from '../redux/slices/userSlice'

const DashboardProfile = () => {

    const dispatch = useDispatch()
    const {currentUser} = useSelector((state)=> state.user)

    const [formData,setFormData] = useState({})
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [uploadPercentage,setUploadPercentage] = useState(null)
    const [imageUploadError,setImageUploadError] = useState(null)

    const imageRef = useRef()

    const handleProfileImage = (e) => {
        const file = e.target.files[0];
        if (file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }

    useEffect(()=>{
        if (imageFile) {
            uploadImage(imageFile)
        }
    },[imageFile])

    const uploadImage =  (imageFile)=> {
        
        setImageUploadError(null)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPercentage(progress.toFixed(0))
            },
            (error)=>{
                setImageUploadError('Image could not be uploaded (File must be less then 2MB)')
                setUploadPercentage(null)
                setImageFile(null)
                setImageFileUrl(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL)=>{
                    setFormData({...formData,avatar:downloadURL})
                    // setImageFileUrl(downloadURL)
                })
            }
        )
    }

    const formSubmit = async (e) =>{
        e.preventDefault()

        const res = await axios.put(`/server/user/update/${currentUser._id}`, formData)
        dispatch(updataUser(res.data))
        console.log(res);
    }

  return (
    <>
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 font-semibold text-3xl text-center'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={formSubmit}>
                <input type='file' 
                    accept='image/*' 
                    onChange={handleProfileImage}
                    ref={imageRef}
                    hidden    
                 />
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full'
                    onClick={()=>imageRef.current.click()}>
                    {
                        uploadPercentage && (
                            <CircularProgressbar
                                value={uploadPercentage || 0}
                                text={`${uploadPercentage}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    },
                                    path: {
                                        stroke: `rgba(62,152,199, ${uploadPercentage / 100})`
                                    }
                                }}
                            />
                        )
                    }
                    <img src={imageFileUrl || currentUser.avatar} alt='profile_pic' 
                    className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]
                        ${uploadPercentage && uploadPercentage < 100 && 'opacity-60'}`}/>
                </div>
                {
                    imageUploadError && (
                        <Alert color='failure'>{imageUploadError}</Alert>
                    )
                }
                <TextInput 
                    type='text'
                    placeholder='username'
                    defaultValue={currentUser.username}
                    id='username'
                    onChange={handleChange}
                />
                <TextInput 
                    type='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                    id='email'
                    onChange={handleChange}
                />
                <TextInput 
                    type='password'
                    placeholder='Password'
                    id='password'
                    onChange={handleChange}
                />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
                <div className='text-red-500 flex justify-between'>
                    <span className='cursor-pointer'>Delete Account</span>
                    <span className='cursor-pointer'>Sign Out</span>
                </div>
            </form>
        </div>
    </>
  )
}

export default DashboardProfile
