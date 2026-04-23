import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import cloudstorage from '../assets/devices.svg'

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const { user, setUser, logout, loading } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    axios.post(`${apiUrl}/auth/login`, formData, { withCredentials: true })
      .then((response) => {
        if (response.data.success == false) setError(response.data.message)

        if (response.data.success) {
          setUser(response.data.user)
          navigate("/dashboard")
        }
      })
      .catch(function (error) {
        setError('Wrong Credentials!')
      })
  }

  return (
    <div className="bg-gray-50 h-screen w-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden flex flex-row-reverse items-center justify-center">
      <img
        alt="File storage visualization"
        className="opacity-80 mx-auto sm:hidden lg:block aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last "
        height="310"
        src={cloudstorage}
        width="550"
      />

      <div className="bg-white shadow-lg h-full p-8">
        <form onSubmit={handleSubmit} className='mt-10 max-w-xs h-full flex flex-col gap-5 justify-center'>
          <h1 className='text-3xl text-center mb-3'>Login</h1>

          <input
            className='w-xs bg-gray-100 px-3 py-2 rounded-lg'
            type="email"
            placeholder='Email'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={formData.email}
            required
          />

          <input
            className='w-xs bg-gray-100 px-3 py-2 rounded-lg'
            type="password"
            placeholder='Password'
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            value={formData.password}
            required
          />

          <button className='self-end w-30 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 transition-colors disabled:opacity-50'>Submit</button>

          {error != null &&
            <p className='text-red-500 text-center'>{error}</p>
          }
          <div className="mt-3 text-center">
            <p className="text-gray-600">
              {"Don't have an account? "}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login