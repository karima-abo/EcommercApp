import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar'
import Footer from './../Footer/Footer'
export default function Layout() {
  return <>
    <Navbar/>

  <div className=' w-full my-5 py-20 lg:py-12 md:w-[90%] m-auto mt-[70px] '>
  <Outlet/>
  </div>


   <Footer />

    </>
    
  
}

