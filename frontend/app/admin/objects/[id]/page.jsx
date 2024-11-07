'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Sidebar from "../../components/sidebar";


export default function DetailObjectPage() {
  const [object, setObject] = useState(null);
  const { id } = useParams(); // Gunakan useParams untuk mendapatkan id dari URL
  const router = useRouter();
  const baseURL = 'http://localhost:9977';

  useEffect(() => {
    if (id) {
      fetchObjectDetail(id);
    }
  }, [id]);

  const fetchObjectDetail = async (objectId) => {
    try {
      const response = await axios.get(`${baseURL}/api/objects/get-by-id/${objectId}`);
      console.log(response.data);
      setObject(response.data);
    } catch (error) {
      console.error('Failed to fetch object detail', error);
    }
  };

  if (!object) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
        <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold mb-4">{object.name}</h1>
        <p className="text-gray-700 mb-2">Kategori: {object.category_name}</p>
        <p className="text-gray-500 mb-4">{object.location}</p>
        <img src={`${baseURL}${object.image_url}`} alt={object.name} className="w-full h-64 object-cover mb-4" />
        <p className="text-gray-700">{object.description}</p>
        </div>
    </div>
  );
}
