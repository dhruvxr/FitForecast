'use client'

import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      router.push('/dashboard')
    } catch (err) {
      alert('Login failed.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3B0CA7] px-4">
      <div className="bg-black w-full max-w-sm rounded-3xl px-8 py-10 shadow-xl text-center space-y-6">
        {/* 🔻 Smaller Logo */}
        <img src="/logo.png" alt="Logo" className="mx-auto h-16" />

        {/* 🔤 App Title */}
        <h1 className="text-2xl font-bold tracking-wide">FitForecasted</h1>
        <p className="text-sm text-gray-400">Your Perfect Fit, Forecasted</p>

        {/* ✉️ Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Username"
              className="w-full rounded-full px-5 py-3 bg-[#F5F3E7] text-black placeholder-gray-500 mb-2"
            />
          </div>

          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full rounded-full px-5 py-3 bg-[#F5F3E7] text-black placeholder-gray-500"
            />
          </div>

          <button
           type="submit"
          className="bg-[#B5AFFF] text-black font-bold w-full py-3 rounded-full mt-2 hover:bg-[#a49ee9]"
          >
          Login
          </button>

        </form>

        <div className="pt-2 text-center">
          <p className="text-sm text-gray-400">Don’t have an existing account?</p>
          <a
            href="/signup"
            className="inline-block mt-2 bg-[#B5AFFF] text-black font-bold py-2 px-6 rounded-full hover:bg-[#a49ee9]"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}
