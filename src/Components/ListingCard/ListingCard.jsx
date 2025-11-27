'use client';

import { FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ListingCard = ({ item }) => {
  const router = useRouter();
  console.log(item.image);

  return (
    <div className="details bg-white dark:bg-transparent shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-dashed hover:border-[#fb7b53]">
      {/* Image Section */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          width={800}
          height={600}
          className="w-full h-72 object-cover"
        />

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#fb7a53] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-[#fb7a5331] dark:bg-[#fb7a5311]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
          {item.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <FaMapMarkerAlt className="text-[#fb7b53]" />
          <span>{item.location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-[#fb7b53] font-semibold text-base">
            {item.price === 0 || item.price === ''
              ? 'Free Adoption'
              : `৳${item.price}`}
          </p>

          <button
            onClick={() => router.push(`/details/${item._id}`)}
            className="details-btn btn relative flex items-center justify-center gap-2 text-[#fb7b53] font-medium border border-dashed border-[#fb7b53] rounded-lg px-5 py-2 overflow-hidden group transition-all duration-300 hover:bg-[#fb7b53]/10 hover:shadow-lg hover:scale-105"
          >
            <span className="relative z-10">See Details</span>
            <FaChevronRight className="text-[#fb7b53] transition-transform duration-300 group-hover:translate-x-2" />
            <span className="absolute left-0 top-0 w-0 h-full bg-[#fb7b53]/20 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
