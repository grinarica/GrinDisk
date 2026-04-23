import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const { user, logout, loading } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL;

  const [files, setFiles] = useState([])
  const [memoryPercent, setMemoryPercent] = useState(0)
  const [memoryPercentFree, setMemoryPercentFree] = useState(0)

  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    axios.get(`${apiUrl}/file/allFiles`, { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        setFiles(response.data.allfiles)

        setMemoryPercent(response.data.memory)
      })
  }, [])

  const handleDownload = (fileId, fileName) => {
    axios.get(`${apiUrl}/file/download/${fileId}`, { withCredentials: true, responseType: 'blob' })
      .then((obj) => {
        console.log(obj)

        const url = URL.createObjectURL(obj.data)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      })
      .catch(err => console.error(err))
  }

  const handleDelete = (fileId, fileName) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${fileName}?`);
    if (!isConfirmed) return

    axios.delete(`${apiUrl}/file/delete/${fileId}`, { withCredentials: true })
      .then((response) => {
        fetchFiles()
      })
      .catch(err => console.error(err))
  }

  function fetchFiles() {
    axios.get(`${apiUrl}/file/allFiles`, { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        setFiles(response.data.allfiles)

        setMemoryPercent(response.data.memory)
      })
  }

  return (
    <div>
      <div className="w-full h-6 fixed bottom-0 left-0 bg-gray-200 rounded-t-full dark:bg-gray-700">
        <div className="h-6 bg-blue-400 rounded-t-full text-center dark:bg-blue-500 text-gray-800" style={{ width: `${memoryPercent}%` }}>
          <p className='absolute left-1/2 transform -translate-x-1/2'>Memory used: {memoryPercent} / 100 MB</p>
        </div>
      </div>

      <div className="mt-1"></div>

      {files.map((value, key) => {
        return (
          <div key={key} className='w-full transition group flex justify-between align-middle bg-gray-200 shadow-md my-2 p-2 hover:bg-gray-300'>
            <div className='ml-3 flex flex-col align-middle'>
              <p>{value.originalname}</p>
              <p>{Math.round((value.size / 1024 / 1024) * 100) / 100} MB</p>
            </div>
            <div className='flex gap-2 opacity-0 transition group-hover:opacity-100 mr-2'>
              <button className='cursor-pointer text-green-600' onClick={() => handleDownload(value._id, value.originalname)}>Download</button>
              <button className='cursor-pointer text-red-700' onClick={() => handleDelete(value._id, value.originalname)}>Delete</button>
            </div>

          </div>
        )
      })}
    </div>
  );
}

export default Dashboard