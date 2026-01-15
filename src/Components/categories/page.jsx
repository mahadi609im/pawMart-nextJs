'use client';
import React, { useEffect, useState } from 'react';
import { FaDog, FaFish, FaCat, FaShoppingBasket } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// স্ট্যাটিক আইকন ম্যাপ যাতে ডাইনামিক নামের সাথে আইকন ম্যাচ করা যায়
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
        const counts = data.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        const dynamicCategories = Object.keys(counts).map(key => ({
          name: key,
          count: `${counts[key]}+ Items`,
          icon: iconMap[key] || <FaCat />,
        }));

        setCategoryStats(dynamicCategories);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="bg-black">
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
                router.push(
                  `/category/${cat.name.toLowerCase().replace(/ /g, '-')}`
                )
              }
              className="group p-8 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700 hover:border-[#fb7b53] transition-all duration-300 cursor-pointer text-center hover:shadow-xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#fb7a5315] flex items-center justify-center text-[#fb7b53] text-3xl group-hover:bg-[#fb7b53] group-hover:text-white transition-all duration-300">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-1">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">
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
