'use client'

import { useEffect, useState } from 'react'
import { auth, firestore } from '@/lib/firebase'
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export default function MyCloset() {
  const [items, setItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
        return
      }

      const q = query(collection(firestore, 'clothes'), where('userId', '==', user.uid))
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setItems(data)
      })

      return () => unsubscribeSnapshot()
    })

    return () => unsubscribeAuth()
  }, [router])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?')
    if (!confirmDelete) return

    try {
      await deleteDoc(doc(firestore, 'clothes', id))
      alert('Item deleted successfully.')
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete item.')
    }
  }

  return (
    <div className="min-h-screen bg-[#3B0CA7] text-white px-4 py-10">
      <div className="bg-black rounded-3xl px-6 py-8 shadow-lg max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">My Closet</h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-300">No items uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-[#1E1E1E] text-white rounded-xl p-4 shadow-md">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                <p className="text-sm text-purple-300 mb-2">Type: {item.type}</p>
                <p className="text-sm text-purple-300 mb-2">Tags: {item.tags?.join(', ')}</p>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full max-h-60 object-cover rounded-lg mt-2 mb-4"
                />
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl font-bold text-white"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
