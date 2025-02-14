import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          

          <div>
          <i className="fa-solid fa-cart-shopping text-4xl text-emerald-600"></i>
            <span className="text-4xl font-bold text-black">Fresh Cart</span>
            <p className="text-gray-600 mt-2">
              The best online store for buying fresh products with ease.
            </p>
            
<form class="flex items-center max-w-lg mx-auto mt-3">   
    <label htmlFor="voice-search" class="sr-only">Search</label>
    <div class="relative w-full">
      
        <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  " placeholder="Search..." required />
       
    </div>
    <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-emerald-600 rounded-lg border  hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>Search
    </button>
</form>

          </div>

          
          <div className=''>
            <h3 className="text-lg font-semibold text-black text-center">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li className='border-b-2 border-gray-300'>
                <Link to="/" className="hover:text-emerald-500 ">Home</Link>
              </li>
              <li  className='border-b-2 border-gray-300'>
                <Link to="products" className="hover:text-emerald-500">Products</Link>
              </li>
              <li  className='border-b-2 border-gray-300'  >
                <Link to="cart" className="hover:text-emerald-500">Cart</Link>
              </li>
              <li  className='border-b-2 border-gray-300'>
                <Link to="wish" className="hover:text-emerald-500">Wishlist</Link>
              </li>
              <li  className='border-b-2 border-gray-300'>
                <Link to="categories" className="hover:text-emerald-500">Categories</Link>
              </li>
              <li  className=''>
                <Link to="brands" className="hover:text-emerald-500">Brands</Link>
              </li>
            </ul>
          </div>

         
          <div >
            <h3 className="text-lg font-semibold text-black text-center">Follow Us</h3>
            <ul className="mt-2 flex gap-4 justify-center items-center">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500 text-2xl">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-400 text-2xl">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-500 text-2xl">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 text-2xl">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ✅ Copyright Section */}
        <div className="mt-6 text-center border-t border-gray-700 pt-4 text-gray-400">
          <p>© 2025 Fresh Cart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

