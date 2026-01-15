'use client';
import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: 'Ariful Islam',
    role: 'Pet Parent',
    comment:
      'Found the best quality food for my cat at PawMart. The delivery was incredibly fast and the packaging was secured!',
    rating: 5,
    img: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: 2,
    name: 'Sumiya Akter',
    role: 'Animal Advocate',
    comment:
      'The adoption process here is so smooth and transparent. I recently adopted a puppy through PawMart, and it was a wonderful experience.',
    rating: 5,
    img: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: 3,
    name: 'Rahat Ahmed',
    role: 'Regular Customer',
    comment:
      'Premium quality accessories and a very user-friendly website. The dark mode experience is absolutely top-notch!',
    rating: 5,
    img: 'https://i.pravatar.cc/150?u=4',
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-[#fb7b53] font-bold text-lg mb-2 flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-[#fb7b53]"></span>
            Testimonials
            <span className="w-8 h-[2px] bg-[#fb7b53]"></span>
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 titleFont">
            What Our <span className="text-[#fb7b53]">Happy Clients</span> Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="relative p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 hover:border-[#fb7b53] transition-all duration-500 group"
            >
              {/* Floating Quote Icon */}
              <div className="absolute -top-5 left-8 w-10 h-10 bg-[#fb7b53] rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(251,123,83,0.4)] group-hover:scale-110 transition-transform">
                <FaQuoteLeft size={16} />
              </div>

              <div className="flex flex-col h-full pt-4">
                {/* Rating Stars */}
                <div className="flex text-[#fb7b53] mb-4 gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>

                <p className="text-slate-400 italic mb-8 leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Profile Info */}
                <div className="mt-auto flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={rev.img}
                      alt={rev.name}
                      className="w-14 h-14 rounded-full border-2 border-dashed border-[#fb7b53] p-1 object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-slate-100 font-bold text-lg">
                      {rev.name}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fb7b53]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
