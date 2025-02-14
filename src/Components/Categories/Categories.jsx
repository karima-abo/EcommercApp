

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categories, setCategories] = useState([])
   const [isLoading,setIsLoading]=useState(false)

  function getCategories() {
    setIsLoading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data)
        console.log(res.data.data, "category")
        setIsLoading(false)
      })
      .catch((err) =>{
        console.log(err)
        setIsLoading(false)
      }
    )
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
    <Helmet>
            <title>Categories- Fresh Cart</title>
            <meta name="description" content="Welcome to Fresh Cart, your best online shopping experience!" />
          </Helmet>

      <h2 className='text-emerald-600 text-2xl capitalize font-semibold text-center mb-6'>
        All Categories
      </h2>
      {isLoading ?<div className="fixed inset-0 bg-gray-800/60  flex justify-center items-center z-50">
      <span className="loader"></span>
    </div>:<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] m-auto">
        {categories?.map((category) => (
          <div key={category?._id} className="p-2">
            <div className='border-2 border-gray-200 hover:shadow-lg hover:shadow-emerald-600 hover:border-0 rounded-md overflow-hidden'>
              <Link to={`/specificcategory/${category?._id}`}>
                <img src={category?.image} alt={category?.name} className='w-full h-64 object-cover' />
                <h3 className='py-4 text-emerald-600 text-2xl capitalize font-semibold text-center'>
                  {category?.name}
                </h3>
              </Link>
            </div>
          </div>
        ))}
      </div>}

      
    </>
  )
}
