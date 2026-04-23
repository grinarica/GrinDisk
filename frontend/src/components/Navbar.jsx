import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HardDrive, Menu, X, UserRound, Folder, CloudUpload, LogOut } from 'lucide-react'
import '../assets/tooltip.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center space-x-2" to="/" onClick={closeMenu}>
            <HardDrive className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">GrinDisk</span>
          </Link>

          {user ? (
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/profile" className='flex gap-1'>
                Profile
                <UserRound />
              </Link>
              <Link to="/dashboard" className='flex gap-1'>
                Files
                <Folder />
              </Link>
              <Link to="/upload" className='flex gap-1'>
                Upload
                <CloudUpload />
              </Link>
              <div className="tooltip-container">
                <button className='cursor-pointer flex gap-1' onDoubleClick={handleLogout}>
                  Logout
                  <LogOut />
                </button>
                <span className="tooltip-text">Double click to logout</span>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/login">
                Login
              </Link>
              <Link to="/register">
                Register
              </Link>
            </div>
          )}


          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">

              {/* Mobile Auth Buttons */}
              {user ? (
                <div className="pt-4 pb-2 space-y-2 flex flex-col justify-center items-center gap-5">
                  <Link to="/upload" onClick={closeMenu} className='flex gap-1'>
                    Upload
                    <CloudUpload />
                  </Link>
                  <Link to="/profile" onClick={closeMenu} className='flex gap-1'>
                    Profile
                    <UserRound />
                  </Link>
                  <Link to="/dashboard" onClick={closeMenu} className='flex gap-1'>
                    Files
                    <Folder />
                  </Link>
                  <button className='flex gap-1' onClick={() => {
                    closeMenu()
                    handleLogout()
                  }} title='Double Click to Logout'>
                    Logout
                    <LogOut />
                  </button>
                </div>
              ) : (
                <div className="pt-4 pb-2 space-y-2 flex flex-col justify-center items-center gap-5">
                  <Link to="/login" onClick={closeMenu}>
                    Login
                  </Link>
                  <Link href="/signup" onClick={closeMenu}>
                    Register
                  </Link>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar