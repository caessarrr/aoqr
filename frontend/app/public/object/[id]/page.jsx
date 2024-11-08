'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function DetailObjectPage() {
  const [object, setObject] = useState(null);
  const [language, setLanguage] = useState('id'); // default bahasa Indonesia
  const { id } = useParams();
  const router = useRouter();
  const baseURL = 'http://localhost:9977';

  useEffect(() => {
    if (id) {
      fetchObjectDetail(id);
    }
  }, [id, language]); // language dependency untuk update saat bahasa diubah

  const fetchObjectDetail = async (objectId) => {
    try {
      const response = await axios.get(`${baseURL}/api/public/objects/get-by-id/${objectId}`);
      const data = response.data;

      // Translate fields
      const translatedCategory = await translateText(data.category_name, language);
      const translatedLocation = await translateText(data.location, language);
      const translatedDescription = await translateText(data.description, language);

      // Set object dengan data terjemahan
      setObject({
        ...data,
        category_name: translatedCategory,
        location: translatedLocation,
        description: translatedDescription,
      });
    } catch (error) {
      console.error('Failed to fetch object detail', error);
    }
  };

  // Fungsi translate menggunakan Google Translate API
  const translateText = async (text, targetLang) => {
    try {
      const response = await axios.post(`https://translate.googleapis.com/translate_a/single`, null, {
        params: {
          client: 'gtx',
          sl: 'auto',
          tl: targetLang,
          dt: 't',
          q: text,
        },
      });
      return response.data[0][0][0];
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Tampilkan teks asli jika gagal translate
    }
  };

  if (!object) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-5">
      <div className="mb-4">
        <label htmlFor="language" className="mr-2">Pilih Bahasa:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="id">Indonesia</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="jp">Japanese</option>
          <option value="kr">Korean</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="ar">Arabic</option>
          {/* Tambahkan bahasa lain sesuai kebutuhan */}
        </select>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">{object.name}</h1>
      <p className="text-gray-700 mb-2">Kategori: {object.category_name}</p>
      <p className="text-gray-500 mb-4">{object.location}</p>
      <img src={`${baseURL}${object.image_url}`} alt={object.name} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-700">{object.description}</p>
    </div>
  );
}



// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function DetailObjectPage() {
//   const [object, setObject] = useState(null);
//   const { id } = useParams(); // Gunakan useParams untuk mendapatkan id dari URL
//   const router = useRouter();
//   const baseURL = 'http://localhost:9977';

//   useEffect(() => {
//     if (id) {
//       fetchObjectDetail(id);
//     }
//   }, [id]);

//   const fetchObjectDetail = async (objectId) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/public/objects/get-by-id/${objectId}`);
//       console.log(response.data);
//       setObject(response.data);
//     } catch (error) {
//       console.error('Failed to fetch object detail', error);
//     }
//   };

//   if (!object) return <p>Loading...</p>;

//   return (
//     <div className="container mx-auto p-5">
//       <h1 className="text-3xl font-bold mb-4">{object.name}</h1>
//       <p className="text-gray-700 mb-2">Kategori: {object.category_name}</p>
//       <p className="text-gray-500 mb-4">{object.location}</p>
//       <img src={`${baseURL}${object.image_url}`} alt={object.name} className="w-full h-64 object-cover mb-4" />
//       <p className="text-gray-700">{object.description}</p>
//     </div>
//   );
// }
