'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import paw from '../../../assets/paw.png';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';

const PetDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load All Listings + Filter by ID
  useEffect(() => {
    fetch('https://paw-mart-server-smoky.vercel.app/listings')
      .then(res => res.json())
      .then(data => {
        const foundPet = data.find(item => item._id === id);
        setPet(foundPet);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!pet)
    return <p className="text-center mt-10">No pet found with ID: {id}</p>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-16 px-6">
      {/* Back Button */}
      <div className="w-full max-w-5xl mb-6">
        <button
          className="inline-flex items-center gap-2 text-[#fb7b53] font-semibold hover:text-orange-600 transition-all"
          onClick={() => router.back()}
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>

      {/* Card */}
      <div className="rounded-2xl shadow-lg max-w-5xl w-full flex flex-col lg:flex-row overflow-hidden border border-dashed border-[#fb7b53]">
        {/* Left Image */}
        <div className="lg:w-1/2 w-full flex justify-center items-center bg-[#fb7a5331] p-6">
          <img
            src={pet.image}
            alt={pet.name}
            className="rounded-lg w-full h-auto object-cover"
            width={400}
            height={400}
          />
        </div>

        {/* Right Details */}
        <div className="lg:w-1/2 w-full p-8 flex flex-col justify-center relative">
          <h3 className="text-[#fb7b53] font-bold text-sm relative inline-block ml-6">
            <Image
              src={paw}
              alt=""
              className="w-5 h-5 absolute -left-6 top-0"
              width={20}
              height={20}
            />
            Pet Details
          </h3>

          <h2 className="text-3xl font-bold mt-2">{pet.name}</h2>

          <div className="flex flex-col md:flex-row gap-8 text-slate-800 dark:text-slate-300 text-base mt-6">
            <div>
              <p>
                <span className="font-semibold text-[#fb7b53]">Category:</span>{' '}
                {pet.category}
              </p>
              <p>
                <span className="font-semibold text-[#fb7b53]">
                  Owner Email:
                </span>{' '}
                {pet.email}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold text-[#fb7b53]">Price:</span>{' '}
                {pet.price === 0 ? 'Free Adoption' : `৳${pet.price}`}
              </p>
              <p>
                <span className="font-semibold text-[#fb7b53]">Location:</span>{' '}
                {pet.location}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 text-base">
            <h4 className="font-semibold text-[#fb7b53] mb-2">Description</h4>
            <p className="text-gray-700 dark:text-slate-500 leading-relaxed">
              {pet.description}
            </p>
          </div>

          <button
            className="mt-8 bg-[#fb7b53] hover:bg-orange-500 text-white font-medium px-6 py-3 rounded-lg w-fit"
            onClick={() => alert('Modal implement korbo pore')}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
