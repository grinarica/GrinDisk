import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, KeyRound, UserRoundPen, CircleX } from 'lucide-react';

function Profile() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [newName, setNewName] = useState('')
    const [newNameError, setNewNameError] = useState(null)

    const [changePasswordForm, setChangePasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const [changePasswordError, setChangePasswordError] = useState(null)

    const [openChangeUsernameModal, setOpenChangeUsernameModal] = useState(false)
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)
    const [openDeleteAcountModal, setOpenDeleteAcountModal] = useState(false)

    const handleChangeName = () => {
        if (newName == '') return

        axios.post(`${apiUrl}/profile/changename`, {
            newname: newName
        }, { withCredentials: true })
            .then((response) => {
                if (response.data.success) {
                    window.location.reload()
                } else {
                    setNewNameError(response.data.message)
                }
            })
            .catch(err => console.error(err))
    }

    const handleChangePassword = () => {
        console.log(changePasswordForm)

        axios.post(`${apiUrl}/profile/changepassword`, {
            formData: changePasswordForm
        }, { withCredentials: true })
            .then((response) => {
                const data = response.data
                if (data.success == true) {
                    logout()
                } else {
                    setChangePasswordError(data.message)
                }
            })
            .catch(err => console.error(err))
    }

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            axios.delete(`${apiUrl}/profile/deleteaccount`, { withCredentials: true })
                .then((response) => {
                    if(response.data.success == true)
                        logout()
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div className='w-screen flex justify-center items-center'>

            <div className='max-w-xl w-xl px-5 text-center flex flex-col gap-5 justify-center'>

                <p className='text-5xl mt-10'>{user.name}</p>
                <p className='text-2xl'>{user.email}</p>

                <hr />

                <div className="flex justify-between ">
                    <p className='text-2xl flex gap-2 justify-center align-middle items-center'>
                        <UserRoundPen />
                        Change username
                    </p>
                    <button onClick={() => setOpenChangeUsernameModal(!openChangeUsernameModal)} className='cursor-pinter'>
                        {!openChangeUsernameModal ?
                            <ChevronDown size={30} className='cursor-pointer' />
                            :
                            <ChevronUp size={30} className='cursor-pointer' />
                        }

                    </button>
                </div>

                {openChangeUsernameModal &&
                    <>
                        <input type="text" className='bg-gray-100 rounded-md p-2' onChange={(e) => setNewName(e.target.value)} value={newName} placeholder='New username...' />
                        {newNameError && <p className='text-red-600'>{newNameError}</p>}
                        <button onClick={() => handleChangeName()} className='bg-blue-500 py-1 rounded-md text-gray-200 cursor-pointer hover:bg-blue-600 transition'>Save</button>
                    </>
                }

                <hr />

                <div className="flex justify-between">
                    <p className='text-2xl flex gap-2 justify-center align-middle items-center'>
                        <KeyRound />
                        Change Password
                    </p>
                    <button onClick={() => setOpenChangePasswordModal(!openChangePasswordModal)} className='cursor-pinter'>
                        {!openChangePasswordModal ?
                            <ChevronDown size={30} className='cursor-pointer' />
                            :
                            <ChevronUp size={30} className='cursor-pointer' />
                        }

                    </button>
                </div>

                {openChangePasswordModal &&
                    <>
                        <input
                            type="text"
                            className='bg-gray-100 rounded-md p-2'
                            placeholder='Old Password'
                            value={changePasswordForm.oldPassword}
                            onChange={(e) => setChangePasswordForm({ ...changePasswordForm, oldPassword: e.target.value })}
                        />
                        <input
                            type="text"
                            className='bg-gray-100 rounded-md p-2'
                            placeholder='New Password'
                            value={changePasswordForm.newPassword}
                            onChange={(e) => setChangePasswordForm({ ...changePasswordForm, newPassword: e.target.value })}
                        />
                        <input
                            type="text"
                            className='bg-gray-100 rounded-md p-2'
                            placeholder='Confirm New Password'
                            value={changePasswordForm.confirmNewPassword}
                            onChange={(e) => setChangePasswordForm({ ...changePasswordForm, confirmNewPassword: e.target.value })}
                        />

                        {changePasswordError &&
                            <p className='text-red-500'>
                                {changePasswordError}
                            </p>
                        }

                        <button
                            className='bg-blue-500 py-1 rounded-md text-gray-200 cursor-pointer hover:bg-blue-600 transition'
                            onClick={() => handleChangePassword()}>

                            Save
                        </button>
                    </>
                }

                <hr />

                <div className="flex justify-between">
                    <p className='text-2xl flex gap-2 justify-center align-middle items-center'>
                        <CircleX />
                        Delete Account    
                    </p>
                    <button onClick={() => setOpenDeleteAcountModal(!openDeleteAcountModal)} className='cursor-pinter'>
                        {!openDeleteAcountModal ?
                            <ChevronDown size={30} className='cursor-pointer' />
                            :
                            <ChevronUp size={30} className='cursor-pointer' />
                        }

                    </button>
                </div>

                {openDeleteAcountModal &&
                    <button onClick={() => handleDeleteAccount()} className='bg-red-600 py-1 rounded-md text-gray-200 cursor-pointer hover:bg-red-700 transition'>Delete</button>
                }

            </div>

        </div>
    )
}

export default Profile