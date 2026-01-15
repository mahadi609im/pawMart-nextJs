'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ListingCard from '../../Components/ListingCard/ListingCard';
import paw2 from '../../assets/paw2.png';
import SectionBanner from '@/Components/sectionBanner/SectionBaner';

const PetSupplies = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ক্যাটাগরির লিস্ট (আপনার ডাটাবেজ অনুযায়ী এগুলো পরিবর্তন করতে পারেন)
  const categories = [
    'All',
    'Pets (Adoption)',
    'Accessories',
    'Pet Care Products',
    'Pet Food',
  ];

  useEffect(() => {
    fetch('https://paw-mart-server-smoky.vercel.app/listings')
      .then(res => res.json())
      .then(data => {
        setPets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 সার্চ এবং ক্যাটাগরি উভয় ফিল্টার একসাথে কাজ করবে
  const filteredPets = pets.filter(item => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-10 mb-20 min-h-screen">
      <div className="container mx-auto px-[3%] md:px-0">
        <header className="mb-10">
          <SectionBanner />
        </header>

        <div className="flex flex-col items-center mb-12 space-y-6">
          <div className="text-center">
            <div className="relative inline-block">
              <h3 className="text-lg font-bold text-[#fb7b53] mb-2">
                Pet & Supplies
              </h3>
              <Image
                src={paw2}
                alt="paw"
                width={24}
                height={24}
                className="absolute -top-3 -right-6"
              />
            </div>
            <h2 className="titleFont text-slate-950 dark:text-slate-100 text-3xl md:text-5xl font-bold">
              Explore All Pets & Supplies
            </h2>
          </div>

          {/* 🔍 সার্চ এবং ফিল্টার সেকশন */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 items-center justify-center bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-800">
            {/* সার্চ ইনপুট */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full border border-dashed border-[#fb7b53] rounded-xl px-5 py-3 focus:outline-none bg-transparent text-slate-950 dark:text-slate-100"
              />
            </div>

            {/* ক্যাটাগরি ড্রপডাউন */}
            <div className="w-full md:w-1/3">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full border border-dashed border-[#fb7b53] rounded-xl px-5 py-3 focus:outline-none bg-transparent text-slate-950 dark:text-slate-100 cursor-pointer appearance-none"
              >
                {categories.map(cat => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-white dark:bg-black"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 🔹 লজিক্যাল রেন্ডারিং */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPets.length > 0 ? (
              filteredPets.map(item => (
                <ListingCard key={item._id} item={item} />
              ))
            ) : (
              <div className="text-center col-span-full py-20">
                <div className="relative inline-block">
                  <h3 className="text-2xl font-semibold text-[#fb7b53]">
                    No items found for "{searchTerm}" in {selectedCategory}
                  </h3>
                  <Image
                    src={paw2}
                    alt="paw"
                    width={30}
                    height={30}
                    className="absolute -top-5 -right-8"
                  />
                </div>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or search term.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-5 text-orange-500 underline"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PetSupplies;
