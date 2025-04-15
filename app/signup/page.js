'use client'

import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push('/dashboard');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3B0CA7] px-4">
      <div className="bg-black p-8 rounded-3xl w-full max-w-sm space-y-6 shadow-xl text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto h-14" />
        <h1 className="text-3xl font-semibold tracking-wide">FitForecasted</h1>
        <p className="text-sm text-gray-300">Your Perfect Fit, Forecasted</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register('name')}
            required
            className="w-full rounded-full px-4 py-2 bg-[#F5F3E7] text-black"
          />
          <input
            type="email"
            placeholder="Email ID"
            {...register('email')}
            required
            className="w-full rounded-full px-4 py-2 bg-[#F5F3E7] text-black"
          />
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            required
            className="w-full rounded-full px-4 py-2 bg-[#F5F3E7] text-black"
          />

          <label className="text-xs text-gray-400 block text-left">
          <input type="checkbox" className="mr-2" required />
            By checking this box, you agree to our terms and conditions.
          </label>


          <button
            type="submit"
            className="bg-[#B5AFFF] text-black font-bold rounded-full py-2 hover:bg-[#a89ff3]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
