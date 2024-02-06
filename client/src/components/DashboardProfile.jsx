
import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'

const DashboardProfile = () => {
    const {currentUser} = useSelector((state)=> state.user)

    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [uploadPercentage,setUploadPercentage] = useState(null)
    const [imageUploadError,setImageUploadError] = useState(null)

    console.log(uploadPercentage);
    const imageRef = useRef()

    const handleProfileImage = (e) => {
        const file = e.target.files[0];
        if (file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(()=>{
        if (imageFile) {
            uploadImage()
        }
    },[imageFile])

    const uploadImage = async ()=> {
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
                console.error('Upload Error:', error)
                setImageUploadError('Image could not be uploaded (File must be less then 2MB)')
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileUrl(downloadURL)
                })
            }
        )
    }

  return (
    <>
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 font-semibold text-3xl text-center'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type='file' 
                    accept='image/*' 
                    onChange={handleProfileImage}
                    ref={imageRef}
                    hidden    
                 />
                <div className='w-32 h-32 self-center cursor-pointer shadow-md rounded-full'
                    onClick={()=>imageRef.current.click()}>
                    <img src={imageFileUrl || currentUser.avatar} alt='profile_pic' 
                    className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
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
                />
                <TextInput 
                    type='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                    id='email'
                />
                <TextInput 
                    type='password'
                    placeholder='Password'
                    id='password'
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
