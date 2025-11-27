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

  // 🔹 Fetch all pets from backend
  useEffect(() => {
    fetch('https://paw-mart-server-smoky.vercel.app/listings')
      .then(res => res.json())
      .then(data => {
        setPets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔹 Filter pets using search
  const filteredPets = pets.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-10 mb-20">
      <div className="container mx-auto px-[3%] md:px-0">
        <header className="mb-10">
          <SectionBanner />
        </header>

        <div className="conCls">
          <div className="flex flex-col justify-center items-center mb-8 space-y-4">
            <div className="flex justify-center items-center">
              <h3 className="text-lg font-bold text-[#fb7b53] items-center gap-2 relative inline-block">
                Pet & Supplies
                <Image
                  src={paw2}
                  alt=""
                  width={24}
                  height={24}
                  className="absolute -top-3 -right-5"
                />
              </h3>
            </div>

            <h2 className="titleFont text-slate-950 dark:text-slate-100 text-3xl md:text-4xl text-center font-bold">
              Explore All Pets & Supplies
            </h2>

            <div className="relative w-full md:w-1/3 mb-4">
              <input
                type="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border border-dashed border-[#fb7b53] rounded-lg px-4 py-2 w-full focus:outline-none text-slate-950 dark:text-slate-100 bg-transparent relative z-20"
              />

              {!searchTerm && (
                <span className="absolute left-4 top-2 text-slate-600 pointer-events-none z-10">
                  Search by name...
                </span>
              )}
            </div>
          </div>

          {/* 🔹 Loading Spinner */}
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.length > 0 ? (
                filteredPets.map(item => (
                  <ListingCard key={item._id} item={item} />
                ))
              ) : (
                <div className="text-center text-[#fb7b53] font-semibold col-span-full">
                  <h3 className="text-lg font-semibold text-[#fb7b53] relative inline-block mx-auto">
                    No pets found for {searchTerm}
                    <Image
                      src={paw2}
                      alt="paw"
                      width={24}
                      height={24}
                      className="absolute -top-3 -right-5"
                    />
                  </h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PetSupplies;
