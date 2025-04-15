'use client'

import { useEffect, useState } from 'react'
import { auth, firestore } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default function Dashboard() {
  const router = useRouter()
  const [weather, setWeather] = useState(null)
  const [showOutfit, setShowOutfit] = useState(false)
  const [recommendation, setRecommendation] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      if (!usr) router.push('/login')
      else setUser(usr)
    })
    return unsub
  }, [router])

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Calgary&appid=${"5e960bde50fecc592861bb88a63ff770"}&units=metric`
        )
        setWeather({
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          wind: res.data.wind.speed,
          tag: res.data.main.temp < 15 ? 'cold' : 'hot' // simple dynamic weather tag
        })
      } catch (err) {
        console.error('Weather fetch failed:', err)
      }
    }
    fetchWeather()
  }, [])

  const fetchRecommendation = async () => {
    if (!user) return
    const clothesRef = collection(firestore, 'clothes')
    const q = query(clothesRef, where('userId', '==', user.uid))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => doc.data())

    if (data.length === 0) {
      setRecommendation({
        top: null,
        bottom: null,
        message: 'No clothing items uploaded yet.'
      })
      setShowOutfit(true)
      return
    }

    const tops = data.filter(item =>
      item.type?.toLowerCase().includes('shirt') ||
      item.type?.toLowerCase().includes('hoodie') ||
      item.type?.toLowerCase().includes('jacket')
    )
    const bottoms = data.filter(item =>
      item.type?.toLowerCase().includes('pant') ||
      item.type?.toLowerCase().includes('jeans') ||
      item.type?.toLowerCase().includes('shorts')
    )

    const weatherTag = weather?.tag || 'cold'
    const matchedTop = tops.find(item => item.tags?.includes(weatherTag)) || tops[0] || null
    const matchedBottom = bottoms.find(item => item.tags?.includes(weatherTag)) || bottoms[0] || null

    if (!matchedTop && !matchedBottom) {
      setRecommendation({
        top: null,
        bottom: null,
        message: 'No suitable items found.'
      })
    } else {
      setRecommendation({
        top: matchedTop,
        bottom: matchedBottom,
        message: null
      })
    }

    setShowOutfit(true)
  }

  return (
    <div className="min-h-screen bg-[#3B0CA7] text-white px-4 py-10">
      <div className="bg-black rounded-3xl px-6 py-8 shadow-lg text-center max-w-md mx-auto">
        <img src="/logo.png" alt="Logo" className="mx-auto h-10 mb-3" />
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="bg-[#F5F3E7] text-black rounded-xl p-5 mb-6">
          {!showOutfit && weather ? (
            <>
              <p className="text-lg font-semibold">Today’s Weather</p>
              <p className="text-sm">🌡 Temp: {weather.temp} °C</p>
              <p className="text-sm">💧 Humidity: {weather.humidity}%</p>
              <p className="text-sm">🌬 Wind: {weather.wind} km/h</p>
              <button
                onClick={fetchRecommendation}
                className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700"
              >
                ➡️ Show Recommended Outfit
              </button>
            </>
          ) : recommendation ? (
            <>
              <p className="text-lg font-semibold mb-2">Recommended Outfit</p>
              {recommendation.message ? (
                <p className="text-sm">{recommendation.message}</p>
              ) : (
                <>
                  {recommendation.top && (
                    <>
                      <p className="text-sm font-semibold">Top: {recommendation.top.name}</p>
                      <img
                        src={recommendation.top.imageUrl}
                        alt="Top"
                        className="mt-2 rounded-xl w-full"
                      />
                    </>
                  )}
                  {recommendation.bottom && (
                    <>
                      <p className="text-sm font-semibold mt-4">Bottom: {recommendation.bottom.name}</p>
                      <img
                        src={recommendation.bottom.imageUrl}
                        alt="Bottom"
                        className="mt-2 rounded-xl w-full"
                      />
                    </>
                  )}
                </>
              )}
              <button
                onClick={() => setShowOutfit(false)}
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                🔁 Back to Weather
              </button>
            </>
          ) : (
            <p className="text-sm">No recommendation found.</p>
          )}
        </div>

        <div className="space-y-4">
          <Link href="/upload" className="block bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-100">
            Upload Clothing
          </Link>
          <Link href="/mycloset" className="block bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-100">
            My Closet
          </Link>
          <button
            onClick={() => {
              auth.signOut()
              router.push('/')
            }}
            className="block bg-red-500 hover:bg-red-600 w-full py-3 rounded-xl font-bold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
