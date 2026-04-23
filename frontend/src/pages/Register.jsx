import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import cloudstorage from '../assets/devices.svg'

function Register() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    axios.post(`${apiUrl}/auth/register`, formData)
      .then((response) => {
        if (response.data.success) {
          navigate("/login")
        }
      })
      .catch(function (error) {
        setError(error.response.data.message)
      })
  }

  return (
    <div className="bg-gray-50 h-screen w-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden flex flex-row-reverse items-center justify-center">
      <img
        alt="File storage visualization"
        className="opacity-80 mx-auto sm:hidden lg:block w-full aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last "
        height="310"
        src={cloudstorage}
        width="550"
      />


      <div className="bg-white shadow-lg h-full p-8">
        <form onSubmit={handleSubmit} className='mt-10 max-w-xs h-full flex flex-col gap-5 justify-center'>
          <h1 className='text-3xl text-center mb-3'>Register</h1>

          <input
            className='w-xs bg-gray-100 px-3 py-2 rounded-lg'
            type="text"
            placeholder='Name'
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            required
          />

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

          <input
            className='w-xs bg-gray-100 px-3 py-2 rounded-lg'
            type="password"
            placeholder='Confirm Password'
            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
            value={formData.confirm_password}
            required
          />

          <button className='self-end w-30 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 transition-colors disabled:opacity-50'>Submit</button>

          {error != null &&
            <p className='text-red-500'>{error}</p>
          }
          <div className="mt-3 text-center">
            <p className="text-gray-600">
              {"Already have an account? "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register