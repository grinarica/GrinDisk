import axios from 'axios'
import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function Upload() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const { user, setUser, logout, loading } = useAuth()

  const [selectedFile, setSelectedFile] = useState(null)

  const [usedMemory, setUsedMemory] = useState(0)
  const [uploadedFileSize, setUploadedFileSize] = useState(null)
  const [error, setError] = useState(null)
  const [displayUploadButton, setDisplayUploadButton] = useState(false)

  useEffect(() => {
    axios.get(`${apiUrl}/file/usedmemory`, { withCredentials: true })
      .then((resonse) => {
        setUsedMemory(resonse.data.usedmemory)
      })
      .catch(function (error) {
        console.log(e)
      })
  }, [])

  const handleFileChange = (event) => {
    if(!event.target.files[0]) {
      setUploadedFileSize(0)
      return
    }
    setSelectedFile(event.target.files[0]);
    setUploadedFileSize(Math.round((event.target.files[0].size / 1024 / 1024) * 100) / 100)

    if(100 - usedMemory < Math.round((event.target.files[0].size / 1024 / 1024) * 100) / 100) setDisplayUploadButton(false)
    else setDisplayUploadButton(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    );

    axios.post(`${apiUrl}/file/upload`, formData, { withCredentials: true })
      .then((response) => {
        if (response.data.success == true) {
          navigate('/dashboard')
        } else {
          console.log(response.data.message)
          setError(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(e)
      })
  }

  return (
    <div className='w-screen mt-2 flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='mt-10 max-w-xs flex flex-col gap-5 justify-center'>
        <p>Memory used: {usedMemory} / 100MB</p>
        <input type="file" name='file' required onChange={handleFileChange} className='rounded-lg py-10 px-2 border-2 border-dashed' />
        
          {100 - usedMemory < uploadedFileSize &&
            <p className='text-red-600'>Selected file exceeds available memory.</p>
          }
        
        {displayUploadButton == true &&
          <button className='bg-green-300 hover:bg-green-400 transition py-1 text-gray-700 rounded-lg cursor-pointer'>Upload File</button>
        }

        <p className='text-red-600'>
          {error ?
            (error) : (' ')
          }
        </p>
      </form>
    </div>

  )
}

export default Upload