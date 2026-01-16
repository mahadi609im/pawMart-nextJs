'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import listingsFormBanner from '../../assets/ListingFormBanner.webp';
import paw from '../../assets/paw.png';
import paw2 from '../../assets/paw2.png';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AddListingsForm = () => {
  const [category, setCategory] = useState('');
  const [myListings, setMyListings] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  // ১. ইউজার কুকি থেকে ইমেইল রিড করা (Mock User Logic)
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = document.cookie.includes('auth=true');
      if (isAuth) {
        // Mock Admin Email সেট করা হচ্ছে
        setUserEmail('admin.maha@gmail.com');
      } else {
        setUserEmail('');
      }
    };
    checkAuth();
  }, []);

  const handleAddListings = e => {
    e.preventDefault();

    // ইউজার যদি লগইন না থাকে তবে ডাটা সাবমিট করতে দিবে না
    if (!userEmail) {
      toast.error('Please login first to add a listing');
      return;
    }

    const form = e.target;
    const newListing = {
      name: form.name.value,
      category,
      price: parseFloat(form.price.value) || 0,
      location: form.location.value,
      image: form.image.value,
      date: form.date.value,
      email: userEmail, // মক ইমেইল ব্যবহার করা হয়েছে
      description: form.description.value,
    };

    fetch('https://paw-mart-server-smoky.vercel.app/listings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newListing),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          form.reset();
          setCategory('');
          toast.success('New Listing Added Successfully');

          // লোকাল স্টেটে লিস্ট আপডেট করা যাতে ইউজার সাথে সাথে প্রিভিউ দেখে
          setMyListings(prev => [
            ...prev,
            { ...newListing, _id: data.insertedId },
          ]);

          Swal.fire({
            title: 'Product Added Successfully',
            icon: 'success',
            confirmButtonColor: '#fb7b53',
          });
        }
      })
      .catch(error => {
        console.error('Error adding listing:', error);
        toast.error('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="relative min-h-screen py-20 mt-12">
      <Head>
        <title>Add Listings | pawMart</title>
      </Head>

      <div className="conCls flex flex-col lg:flex-row items-center justify-center">
        {/* Left Side Image */}
        <div className="md:w-1/2 w-full flex justify-center relative">
          <div className="w-3/4 max-w-md md:max-w-full">
            <Image
              src={listingsFormBanner}
              alt="Pet Banner"
              className="w-full h-auto rounded-lg object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:w-1/2 w-full md:mt-0 bg-white rounded-xl shadow-lg p-8 relative">
          <div className="flex flex-col mb-8 space-y-4">
            <div className="flex">
              <h3 className="text-base font-bold text-[#fb7b53] items-center gap-2 relative inline-block">
                Add Listings
                <span className="absolute -top-3 -right-5 w-6 h-6">
                  <Image src={paw2} alt="paw" width={24} height={24} />
                </span>
              </h3>
            </div>
            <h2 className="titleFont text-slate-950 text-3xl md:text-4xl font-bold">
              Add Your Pet or Product
            </h2>
          </div>

          <form onSubmit={handleAddListings}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Product / Pet Name"
                className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
              />

              <select
                name="category"
                required
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
              >
                <option disabled value="">
                  Category
                </option>
                <option>Pets</option>
                <option>Food</option>
                <option>Accessories</option>
                <option>Care Products</option>
              </select>

              <input
                type="number"
                name="price"
                required={category !== 'Pets'}
                placeholder="Price (0 if free)"
                className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
              />

              <input
                type="text"
                name="location"
                required
                placeholder="Location"
                className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
              />

              <input
                type="text"
                name="image"
                required
                placeholder="Image URL"
                className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
              />

              <input
                type="date"
                name="date"
                required
                className="rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
              />

              <input
                type="email"
                name="email"
                value={userEmail || 'Not Logged In'}
                readOnly
                className="rounded-lg p-3 bg-[#fb7a531a] text-gray-500 border-none cursor-not-allowed focus:outline-none"
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              required
              className="w-full mt-4 h-32 rounded-lg p-3 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
            ></textarea>

            <button className="bg-[#fb7b53] text-white font-bold px-8 py-3 rounded-lg mt-4 hover:bg-orange-600 transition shadow-md active:scale-95">
              Add Pet/Product
            </button>
          </form>

          {/* Paw Decoration */}
          <span className="absolute bottom-4 right-4 w-12 h-12 opacity-20">
            <Image src={paw} alt="paw" fill style={{ objectFit: 'contain' }} />
          </span>
        </div>
      </div>

      {/* Show dynamically added listings preview */}
      {myListings.length > 0 && (
        <div className="container mx-auto px-6 mt-16">
          <h3 className="text-2xl font-bold text-[#fb7b53] mb-6 flex items-center gap-3">
            Recently Added Preview
            <span className="h-[2px] flex-1 bg-gray-100"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map(item => (
              <div
                key={item._id}
                className="border border-[#fb7a5331] rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition-all"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 justify-center">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                      {item.category}
                    </p>
                    <p className="font-bold text-gray-800">
                      {item.price === 0 ? 'Free Adoption' : `৳${item.price}`}
                    </p>
                    <p className="text-xs text-gray-400 italic flex items-center gap-1">
                      📍 {item.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddListingsForm;
