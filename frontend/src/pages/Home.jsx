import React from 'react'
import { Upload, Shield, Zap, Check, HardDrive } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import cloudstorage from '../assets/cloudstorage.png'

function Home() {
  const navigate = useNavigate()

  const navigateToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 z-10">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-100 to-indigo-200">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Personal Cloud Storage DWA
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Upload, store, and access your files anywhere. Get 100MB of free storage to keep your important
                  documents, photos, and files safe in the cloud.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 mt-2">
                <button className='bg-gray-700 p-2 px-5 hover:bg-gray-800 transition rounded-lg text-gray-200 cursor-pointer' type="submit" onClick={() => navigateToLogin()}>Start Free</button>
                <p className="text-xs text-gray-500">No credit card required. Start uploading in seconds.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className='text-gray-500'>100MB Free Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className='text-gray-500'>Instant Upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className='text-gray-500'>Secure & Private</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything you need to store your files
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple, secure, and reliable cloud storage that works for everyone. Upload any file type and access
                  them from anywhere.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  <Upload className="h-10 w-10 text-blue-600" />
                  <h3 className="text-xl font-semibold">Easy Upload</h3>
                  <p className="text-gray-600">
                    Drag and drop any file type. Photos, documents, videos - we support it all.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  <Shield className="h-10 w-10 text-green-600" />
                  <h3 className="text-xl font-semibold">Secure Storage</h3>
                  <p className="text-gray-600">
                    Your files are encrypted and stored securely. Only you have access to your data.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  <Zap className="h-10 w-10 text-yellow-600" />
                  <h3 className="text-xl font-semibold">Lightning Fast</h3>
                  <p className="text-gray-600">
                    Upload and download files at blazing speeds. Access your content instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Storage Showcase */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">100MB of Free Storage</h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Perfect for storing your essential files. Upload documents, images, videos, and more. That's enough
                    space for hundreds of documents or dozens of high-quality photos.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Support for all file types</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Access from any device</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Share files with others</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Automatic backup</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className='bg-blue-600 p-2 px-5 rounded-lg hover:bg-blue-700 transition text-gray-200 cursor-pointer' type="submit" onClick={() => navigateToLogin()}>Start Free</button>
                </div>
              </div>
              <img
                alt="File storage visualization"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last "
                height="310"
                src={cloudstorage}
                width="550"
              />
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How it works</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started in three simple steps. No technical knowledge required.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-gray-600">Create your free account in seconds. No credit card required.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-bold">Upload Files</h3>
                <p className="text-gray-600">Drag and drop your files or click to browse. Upload anything you want.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-bold">Access Anywhere</h3>
                <p className="text-gray-600">Your files are available on any device, anywhere in the world.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-500">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to get started?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who trust us with their files. Get your 100MB of free storage today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <button className='bg-gray-800 p-2 px-5 rounded-lg hover:bg-gray-700 transition text-gray-200 cursor-pointer' type="submit" onClick={() => navigateToLogin()}>Start Free</button>
                <p className="text-xs text-blue-100">Free forever. No credit card required.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex bg-gray-800 sm:flex-row py-6 w-full align-center shrink-0 items-center text-center px-4 md:px-6">
        <p className="text-sm text-center text-gray-500 w-full">© 2024 GrinDisk. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home