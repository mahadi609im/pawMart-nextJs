'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import listingsFormBg from '../../assets/listingsFormBg.webp';
import listingsFormBanner from '../../assets/ListingFormBanner.webp';
import paw from '../../assets/paw.png';
import paw2 from '../../assets/paw2.png';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContextProvider';
import Swal from 'sweetalert2';
import PrivateRoutes from '@/Components/Private/PrivateRoute';

const AddListingsForm = () => {
  const { user } = useContext(AuthContext);
  const [category, setCategory] = useState('');
  const [myListings, setMyListings] = useState([]);

  const handleAddListings = e => {
    e.preventDefault();
    const form = e.target;
    const newListing = {
      name: form.name.value,
      category,
      price: form.price.value,
      location: form.location.value,
      image: form.image.value,
      date: form.date.value,
      email: form.email.value,
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
          setMyListings(prev => [
            ...prev,
            { ...newListing, _id: data.insertedId },
          ]);

          Swal.fire({
            title: 'Product Added Succesfully',
            icon: 'success',
            draggable: false,
          });
        }
      });
  };

  return (
    <PrivateRoutes>
      <div
        className="relative min-h-screen py-20 mt-12"
        style={{ backgroundImage: `url(${listingsFormBg.src})` }}
      >
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
                  className="rounded-lg p-2 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
                />

                <select
                  name="category"
                  required
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="rounded-lg p-2 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
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
                  placeholder="Price (0 if pet)"
                  className="rounded-lg p-2 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
                />

                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Location"
                  className="rounded-lg p-2 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
                />

                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Image URL"
                  className="rounded-lg p-2 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
                />

                <input
                  type="date"
                  name="date"
                  required
                  className="rounded-lg p-2 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
                />

                <input
                  type="email"
                  name="email"
                  value={user?.email || ''}
                  readOnly
                  className="rounded-lg p-2 bg-[#fb7a5331] text-slate-950 border-none cursor-not-allowed focus:outline-none"
                />
              </div>

              <textarea
                name="description"
                placeholder="Description"
                required
                className="w-full mt-4 h-32 rounded-lg p-2 bg-[#fb7a5331] text-slate-950 border-none focus:outline-none"
              ></textarea>

              <button className="bg-orange-400 text-white px-6 py-2 rounded-lg mt-4 hover:bg-orange-500 transition">
                Add Pet/Product
              </button>
            </form>

            {/* Paw Decoration */}
            <span className="absolute bottom-4 right-4 w-8 h-8 opacity-40">
              <Image
                src={paw}
                alt="paw"
                fill
                style={{ objectFit: 'contain' }}
              />
            </span>
          </div>
        </div>

        {/* Show dynamically added listings */}
        {myListings.length > 0 && (
          <div className="container mx-auto px-[3%] md:px-0 mt-10">
            <h3 className="text-xl font-bold text-[#fb7b53] mb-4">
              My Added Listings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myListings.map(item => (
                <div
                  key={item._id}
                  className="border border-dashed border-[#fb7b53] rounded-xl p-4 shadow hover:shadow-lg transition-all bg-[#fb7a5331]"
                >
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <div className="w-20 h-20 relative rounded-lg border border-dashed border-[#fb7b53] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col space-y-1 text-slate-800">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p>
                        <span className="font-semibold text-[#fb7b53]">
                          Category:
                        </span>{' '}
                        {item.category}
                      </p>
                      <p>
                        <span className="font-semibold text-[#fb7b53]">
                          Price:
                        </span>{' '}
                        {item.price === 0 ? 'Free Adoption' : `৳${item.price}`}
                      </p>
                      <p>
                        <span className="font-semibold text-[#fb7b53]">
                          Location:
                        </span>{' '}
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PrivateRoutes>
  );
};

export default AddListingsForm;
