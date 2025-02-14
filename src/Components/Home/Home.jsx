import React from 'react'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet-async'


export default function Home() {
  return (
    <>

<Helmet>
        <title>Home - Fresh Cart</title>
        <meta name="description" content="Welcome to Fresh Cart, your best online shopping experience!" />
      </Helmet>
  <MainSlider />
   <CategoriesSlider />
   <RecentProducts />
  
    </>
    
  )
}

