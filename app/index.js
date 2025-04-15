// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">FitForecast</h1>
      <p className="mb-8 text-lg">Your perfect fit, forecasted.</p>
      <div>
        <Link href="/login">
          <a className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Login</a>
        </Link>
        <Link href="/signup">
          <a className="px-4 py-2 bg-green-500 text-white rounded">Signup</a>
        </Link>
      </div>
    </div>
  );
}
