import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategoriesSlider() {

const [category,setCategory] =useState([]);
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 2,
  dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768, 
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],

};

  function getCategory(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      setCategory(res.data.data);

    })
    .catch((err)=>{console.log(err);})
  }
  useEffect(()=>{
    getCategory();
  },[])
  console.log(category
    ,"cateeee")
  return (
    <>
   <h2 className='font-semibold capitalize text-left text-2xl mb-2 text-gray-600'>Shop Popular categories</h2>
    <Slider {...settings} className=''>
    {category?.map((categoryy)=>
      <div className='w-full' key={categoryy._id}>
        <img src={categoryy.image} className='w-full h-[200px] object-cover' alt="" />
        <h4>{categoryy.name}</h4>
      </div>
    )}
    </Slider>
    </>
   
    
  )
}

 {/* <div className="flex">
    
   </div> */}