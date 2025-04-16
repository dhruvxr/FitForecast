'use client'

import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setError('')
    setLoading(true)

    if (!data.email || !data.password || data.password.length < 6) {
      setError('Email and password must be valid. Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      // Firebase provides descriptive error codes
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.')
      } else {
        setError('Sign up failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#3B0CA7] flex items-center justify-center px-4">
      <div className="bg-black rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
        <img src="/logo.svg" alt="FitForecast Logo" className="mx-auto h-12 mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-white">FitForecasted</h2>
        <p className="text-sm text-gray-300 mb-6">Your Perfect Fit, Forecasted</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full rounded-full px-5 py-3 bg-[#F5F3E7] text-black placeholder-gray-500"
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full rounded-full px-5 py-3 bg-[#F5F3E7] text-black placeholder-gray-500"
          />

          <div className="flex items-center text-white text-sm gap-2">
            <input type="checkbox" className="form-checkbox" required />
            <span>By checking this box, you agree to our terms and conditions.</span>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'
            } text-white font-bold py-3 rounded-full`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
