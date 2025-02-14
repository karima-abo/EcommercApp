import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Brands() {
const [Brands,setBrands]=useState([])
const [isLoading,setIsLoading]=useState(false)
function getAllBrand(){
  setIsLoading(true)
  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  .then((res)=>{

    console.log(res.data.data);
    setBrands(res.data.data);
    setIsLoading(false)
 
  }
)
    
  .catch((err)=>{
  console.log(err)
  setIsLoading(false)
})
}

useEffect(()=>{
  getAllBrand()
 
},[])

  return (
   <>
   <Helmet>
           <title>Brands- Fresh Cart</title>
           <meta name="description" content="Welcome to Fresh Cart, your best online shopping experience!" />
         </Helmet>
    <h2 className='text-emerald-600 text-2xl capitalize text-center'>
      All Brands

    </h2>
    {isLoading ?<div className="fixed inset-0 bg-gray-800/60  flex justify-center items-center z-50">
      <span className="loader"></span>
    </div>: <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] m-auto">
    {Brands?.map((brand)=> 
      <div key={brand?._id} className=' p-2'>
        <Link to={`/specificbrand/:${brand?._id}`}>
    <div className='border-2 p-6 border-gray-200 hover:shadow-lg hover:shadow-emerald-600  hover:border-0'>
      <img src={brand.image} alt={brand.name} className='w-full' />
      <h3>{brand.name}</h3>
    </div>

    </Link>
      </div>
   
  )}

   </div>}
   
   
   
   </>
    
  )
}

