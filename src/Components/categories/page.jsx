'use client';
import React, { useEffect, useState } from 'react';
import { FaDog, FaFish, FaCat, FaShoppingBasket } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// ১. আইকন ম্যাপ (ডাটাবেজের অরিজিনাল কী অনুযায়ী)
const iconMap = {
  Pets: <FaDog />,
  'Pet Food': <FaShoppingBasket />,
  Accessories: <FaFish />,
  'Care Products': <FaCat />,
};

const Categories = () => {
  const router = useRouter();
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://paw-mart-server-smoky.vercel.app/listings')
      .then(res => res.json())
      .then(data => {
        // ২. ডাটাবেজ থেকে প্রতিটি ক্যাটাগরির আইটেম সংখ্যা বের করা
        const counts = data.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        // ৩. আপনার কাঙ্ক্ষিত ৪টি ক্যাটাগরির লিস্ট (PetSupplies পেজের সাথে মিল রেখে)
        const targetCategories = [
          { key: 'Pets', label: 'Pets (Adoption)' },
          { key: 'Pet Food', label: 'Pet Food' },
          { key: 'Accessories', label: 'Accessories' },
          { key: 'Care Products', label: 'Pet Care Products' },
        ];

        // ৪. ডাটা ফরম্যাট করা
        const formattedCategories = targetCategories.map(cat => ({
          displayName: cat.label,
          dbKey: cat.key,
          count: `${counts[cat.key] || 0}+ Items`,
          icon: iconMap[cat.key] || <FaCat />,
        }));

        setCategoryStats(formattedCategories);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-dots loading-lg text-orange-500"></span>
      </div>
    );

  return (
    <section className="bg-white dark:bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-100 titleFont">
            Browse by <span className="text-[#fb7b53]">Category</span>
          </h2>
          <p className="text-gray-600 dark:text-slate-400 mt-2">
            Find everything your pet needs in one place
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryStats.map((cat, index) => (
            <div
              key={index}
              onClick={() =>
                // ৫. ক্লিক করলে PetSupplies পেজে যাবে এবং ঐ ক্যাটাগরি অটো সিলেক্ট হবে
                // (যদি আপনি আলাদা ক্যাটাগরি পেজ না করে PetSupplies এ ফিল্টার করতে চান)
                router.push(`/pets?category=${encodeURIComponent(cat.dbKey)}`)
              }
              className="group p-8 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 hover:border-[#fb7b53] transition-all duration-300 cursor-pointer text-center hover:shadow-xl hover:-translate-y-2 bg-white dark:bg-slate-900/50"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#fb7a5315] flex items-center justify-center text-[#fb7b53] text-3xl group-hover:bg-[#fb7b53] group-hover:text-white transition-all duration-300">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-1">
                {cat.displayName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
