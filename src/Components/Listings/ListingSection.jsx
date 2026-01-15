'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ListingCard from '../../Components/ListingCard/ListingCard';
import paw2 from '../../assets/paw2.png';

const ListingSection = () => {
  const [latestListings, setLatestListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          'https://paw-mart-server-smoky.vercel.app/latest_listings'
        );
        const data = await res.json();
        setLatestListings(data);
      } catch (err) {
        console.error('Failed to fetch listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto px-[3%] md:px-0">
        <div className="text-center mb-8">
          <h3 className="text-lg font-bold text-[#fb7b53] relative inline-block">
            Latest Listings
            <Image
              src={paw2}
              alt=""
              width={24}
              height={24}
              className="absolute -top-3 -right-5"
            />
          </h3>
          <h2 className="titleFont text-3xl md:text-4xl font-bold">
            Recently Added Pets & Products
          </h2>
        </div>

        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestListings.length > 0 ? (
              latestListings.map(item => (
                <ListingCard key={item._id} item={item} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No listings found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ListingSection;
