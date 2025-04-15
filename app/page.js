'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3B0CA7] px-4">
      <div className="bg-black w-full max-w-sm rounded-3xl px-8 py-10 shadow-xl text-center space-y-6">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="mx-auto h-16" />

        {/* Title + Tagline */}
        <h1 className="text-3xl font-bold">FitForecast</h1>
        <p className="text-sm text-gray-300">Your perfect fit, forecasted.</p>

        {/* Buttons */}
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full text-center bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block w-full text-center bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
