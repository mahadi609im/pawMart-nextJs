'use client';

import Image from 'next/image';
import pawBg from '../../assets/paw2.png';
import sectionBanner from '../../assets/sectionBanner.png';

const SectionBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md border border-dashed border-amber-400 conCls py-12 md:py-20 mb-20">
      {/* Background Paw Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-10"
        style={{
          backgroundImage: `url(${pawBg.src})`,
          backgroundSize: '110px',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 px-10">
        {/* Left Text Content */}
        <div className="flex flex-col space-y-4 text-center md:text-left md:w-1/2">
          <h4 className="text-lg font-bold text-[#fb7b53] items-center gap-2 relative inline-block w-fit">
            Caring for Your Companions
            <Image
              src={pawBg}
              alt="Paw Icon"
              width={24}
              height={24}
              className="absolute -top-3 -right-5"
            />
          </h4>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
            Love, Care & Comfort for Every Pet 🐾
          </h2>

          <p className="text-gray-600 dark:text-slate-400 md:pr-6">
            From toys to treats, explore a world full of comfort and happiness
            for your furry friends. At{' '}
            <span className="text-[#fb7b53] font-semibold">pawMart</span>, we
            bring you everything from nutritious pet food to playful accessories
            and cozy beds — all designed with love and care. Whether you have a
            playful puppy, a curious kitten, or a loyal companion, you’ll find
            everything you need to make their little world brighter, healthier,
            and full of joy every single day.
          </p>

          <button className="hover:bg-[#e06b40] bg-[#fb7b53] text-white font-medium px-6 py-3 rounded-lg w-fit mx-auto md:mx-0 transition-all duration-300 hover:scale-105 shadow-sm">
            Explore Now
          </button>
        </div>

        {/* Right Pet Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            src={sectionBanner}
            alt="Pet Banner"
            width={400}
            height={400}
            className="w-[280px] md:w-[400px] object-contain drop-shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionBanner;
