'use client';

import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import pawWhite from '@/assets/pawWhite.png'; // adjust your path

const Footer = () => {
  return (
    <div className="text-gray-800 bg-[#fb7b53]">
      {/* Footer Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 md:px-16 py-3 md:py-12 rounded-t-[3rem] bg-[#fb7b53] backdrop-blur">
        {/* Left Info */}
        <div>
          <h3 className="text-2xl font-bold text-orange-800 flex items-center gap-2 mb-3">
            <Image src={pawWhite} alt="paw" className="w-7 h-7" />
            pawMart
          </h3>
          <p className="text-sm text-gray-700">
            PawMart connects local pet owners and buyers for adoption and pet
            care products.
          </p>

          <div className="flex gap-4 mt-5 text-orange-700 text-lg">
            <FaFacebookF className="hover:text-orange-900 cursor-pointer" />
            <FaTwitter className="hover:text-orange-900 cursor-pointer" />
            <FaInstagram className="hover:text-orange-900 cursor-pointer" />
            <FaYoutube className="hover:text-orange-900 cursor-pointer" />
          </div>
        </div>

        {/* Pages */}
        <div>
          <h4 className="text-lg font-bold mb-3 text-gray-900">Pages</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-orange-600 cursor-pointer">Home</li>
            <li className="hover:text-orange-600 cursor-pointer">About Us</li>
            <li className="hover:text-orange-600 cursor-pointer">Terms</li>
            <li className="hover:text-orange-600 cursor-pointer">Contact</li>
            <li className="hover:text-orange-600 cursor-pointer">Shop</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-3 text-gray-900">Contact info</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <MdLocationOn /> California L.A 57867
            </li>
            <li className="flex items-center gap-2">
              <MdPhone /> (808) 555-0111
            </li>
            <li className="flex items-center gap-2">
              <MdEmail /> 0Vw5f@example.com
            </li>
          </ul>
        </div>

        {/* Working Hours */}
        <div>
          <div className="bg-yellow-200 rounded-2xl p-5 shadow">
            <h4 className="font-bold text-gray-900 mb-3">Working Hours</h4>
            <p>
              <span className="font-medium">Mon - Fri:</span>{' '}
              <span className="float-right">7am - 6pm</span>
            </p>
            <p>
              <span className="font-medium">Saturday:</span>{' '}
              <span className="float-right">9am - 4pm</span>
            </p>
            <p>
              <span className="font-medium">Sunday:</span>{' '}
              <span className="float-right text-gray-500">Closed</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center py-4 text-sm text-white border-t border-orange-300 bg-black backdrop-blur">
        © 2025 <span className="font-semibold text-orange-800">pawMart</span>.
        All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
