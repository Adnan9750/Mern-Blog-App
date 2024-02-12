
import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'
import { deleteUser, updataUser } from '../redux/slices/userSlice'
import {useNavigate} from 'react-router-dom'
import {HiOutlineExclamationCircle} from 'react-icons/hi'

const DashboardProfile = () => {

    const dispatch = useDispatch()
    const {currentUser} = useSelector((state)=> state.user)
    const navigate = useNavigate()

    const [formData,setFormData] = useState({})
    const [imageFile,setImageFile] = useState(null)
    const [imageFileUrl,setImageFileUrl] = useState(null)
    const [uploadPercentage,setUploadPercentage] = useState(null)
    const [imageUploadError,setImageUploadError] = useState(null)
    const [imageFileUploading,setImageFileUploading] = useState(false)
    const [updateUserSuccess,setUpdateUserSuccess] = useState(null)
    const [updateUserError,setUpdateUserError] = useState(null)
    const [showModel,setShowModel] = useState(false)

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
        
        setImageFileUploading(true)
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
                setImageFileUploading(false)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL)=>{
                    setFormData({...formData,avatar:downloadURL})
                    setImageFileUrl(downloadURL)
                    setImageFileUploading(false)
                })
            }
        )
    }

    const formSubmit = async (e) =>{
        e.preventDefault()
        setUpdateUserSuccess(null)
        setUpdateUserError(null)
        // if there is nothing in formdata and we click on uodate button then it simple return
        if(Object.keys(formData).length === 0) {
            setUpdateUserError('No changes were made')
            return;
        }
        if(imageFileUploading){
            setUpdateUserError('Please wait for image to upload')
            return
        }
        try {
            const res = await axios.put(`/server/user/update/${currentUser._id}`, formData)
            dispatch(updataUser(res.data))
            setUpdateUserSuccess('User Profile updated successfully')
            // console.log(res);
        } catch (error) {
            setUpdateUserError(error);
        }
        
    }

    const handleDelete = async () =>{
        setShowModel(false)
        const res = await axios.delete(`/server/user/delete/${currentUser._id}`)
        dispatch(deleteUser(res.data))
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
                    <img src={imageFileUrl || (currentUser && currentUser.avatar)} alt='profile_pic' 
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
                    defaultValue={currentUser && currentUser.username}
                    id='username'
                    onChange={handleChange}
                />
                <TextInput 
                    type='email'
                    placeholder='email'
                    defaultValue={currentUser && currentUser.email}
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
                    <span className='cursor-pointer' onClick={()=>setShowModel(true)}>Delete Account</span>
                    <span className='cursor-pointer'>Sign Out</span>
                </div>
            </form>
            {
                updateUserSuccess && (
                    <Alert color='success' className='mt-5'>
                        {updateUserSuccess}
                    </Alert>
                )
            }
            {
                updateUserError && (
                    <Alert color='failure' className='mt-5' >
                        {updateUserError}
                    </Alert>
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
                            Are you sure you want to delete your account
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDelete}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={()=>setShowModel(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    </>
  )
}

export default DashboardProfile
