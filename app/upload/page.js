'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { auth, firestore, storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    if (!file) return alert('Please select an image.');
    const user = auth.currentUser;
    if (!user) return alert('You must be logged in.');

    try {
      setUploading(true);
      const storageRef = ref(storage, `clothes/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error(error);
          alert('Image upload failed');
          setUploading(false);
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const payload = {
            ...data,
            imageUrl,
            userId: user.uid,
            tags: data.tags || [],
            createdAt: new Date(),
          };
          await addDoc(collection(firestore, 'clothes'), payload);
          alert('Item uploaded successfully!');
          setUploading(false);
          reset();
          setFile(null);
          router.push('/mycloset');
        }
      );
    } catch (err) {
      console.error(err);
      alert('Upload error');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3B0CA7] text-white px-4 py-10">
      <div className="bg-black rounded-3xl px-6 py-8 shadow-lg text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Upload Clothing</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <input
            {...register('name')}
            placeholder="Clothing Name"
            className="w-full rounded-full px-5 py-3 bg-[#F5F3E7] text-black placeholder-gray-500"
          />
          <input
            {...register('description')}
            placeholder="Description"
            className="w-full rounded-full px-5 py-3 bg-[#F5F3E7] text-black placeholder-gray-500"
          />
          <input
            {...register('type')}
            placeholder="Type (e.g. Jacket, Shirt)"
            className="w-full rounded-full px-5 py-3 bg-[#F5F3E7] text-black placeholder-gray-500"
          />

          <div className="text-white">Suitable For:</div>
          <div className="flex flex-wrap gap-2">
            {['cold', 'rainy', 'hot', 'windy'].map((tag) => (
              <label key={tag} className="bg-[#F5F3E7] text-black px-4 py-2 rounded-full cursor-pointer">
                <input
                  {...register('tags')}
                  type="checkbox"
                  value={tag}
                  className="mr-2"
                />
                {tag}
              </label>
            ))}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-300 mt-2"
          />

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full"
          >
            {uploading ? 'Uploading...' : 'Upload Item'}
          </button>
        </form>
      </div>
    </div>
  );
}
