'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaPaw, FaHome, FaChevronDown } from 'react-icons/fa';

import serviceBaner from '@/assets/service-details-banner.png';
import serviceBaner2 from '@/assets/service-details-banner2.png';

const faqs = [
  {
    question: 'Why should I adopt instead of buying?',
    answer:
      'Adopting saves lives — you’re giving a homeless pet a second chance at happiness and helping reduce animal overpopulation. When you adopt, you’re not only gaining a loving companion but also supporting animal rescue organizations that work tirelessly to care for abandoned and neglected pets.',
  },
  {
    question: 'Are adopted pets healthy and vaccinated?',
    answer:
      'Yes! Every PawMart pet receives a complete health examination before adoption. They are vaccinated, dewormed, and spayed or neutered by licensed veterinarians. We ensure that each pet is in good health and ready to join their new family, along with providing medical records and post-adoption care advice.',
  },
  {
    question: 'How do I start the adoption process?',
    answer:
      'Starting the adoption process is easy and stress-free. Simply browse our list of available pets on the PawMart website, select the one you’d like to meet, and fill out a short adoption application. Our friendly team will then contact you to schedule a meet-and-greet and guide you through every step until your new furry friend comes home.',
  },
  {
    question: 'Can I meet the pet before adopting?',
    answer:
      'Absolutely! We encourage all potential adopters to meet their chosen pets in person before finalizing the adoption. This helps ensure a perfect match between you and your future companion. Our team will arrange a safe and comfortable meeting environment where you can interact and get to know each other.',
  },
];

const QnaSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-black">
      <div className="conCls">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4 titleFont">
            Why Adopt from <span className="text-[#fb7b53]">PawMart?</span>
          </h2>
          <p className="text-gray-700 dark:text-slate-400 leading-relaxed">
            At PawMart, we believe every pet deserves a loving home. By adopting
            instead of buying, you’re helping reduce animal homelessness and
            giving a second chance to a furry friend in need. Every adoption
            supports our rescue programs and community education efforts.
          </p>
        </div>

        {/* Bullet Points */}
        <div className="max-w-4xl mx-auto mt-6 px-6 space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-[#fb7b53] mt-1">
              <FaHeart size={18} />
            </div>
            <p className="text-gray-700 dark:text-slate-400">
              You save a life and make space for another animal in need.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-[#fb7b53] mt-1">
              <FaPaw size={18} />
            </div>
            <p className="text-gray-700 dark:text-slate-400">
              Adopted pets are loyal, loving, and grateful for a second chance.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-[#fb7b53] mt-1">
              <FaHome size={18} />
            </div>
            <p className="text-gray-700 dark:text-slate-400">
              Each adoption helps build a kinder community for animals and
              people.
            </p>
          </div>
        </div>

        {/* Images */}
        <div className="max-w-5xl mx-auto mt-10 grid sm:grid-cols-2 gap-6 px-6">
          <Image
            src={serviceBaner}
            alt="Rescue Dog"
            className="w-full h-64 object-cover rounded-xl"
          />
          <Image
            src={serviceBaner2}
            alt="Adopted Pet"
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-14 px-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border-b dark:aborder-slate-800 p-6 cursor-pointer ${
                  openIndex === index
                    ? 'bg-[#fb7a5331] border-dashed border-[#fb7b53] text-white border rounded-md'
                    : 'border-slate-800'
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  {openIndex === index ? (
                    <h3
                      className={`text-[#fb7b53] titleFont text-base md:text-lg font-bold`}
                    >
                      {faq.question}
                    </h3>
                  ) : (
                    <h3
                      className={`text-gray-800 dark:text-slate-400 titleFont text-base md:text-lg font-bold`}
                    >
                      {faq.question}
                    </h3>
                  )}
                  <FaChevronDown
                    className={`text-[#fb7b53] transform transition-transform duration-300 w-8 h-8 p-2 rounded-full bg-[#fb7a5331] border border-dashed hover:border-[#fb7b53] ${
                      openIndex === index
                        ? 'rotate-180 bg-[#fb7b53] text-white border-2'
                        : ''
                    }`}
                  />
                </div>

                {openIndex === index && (
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm md:text-base">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QnaSection;
