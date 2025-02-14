import React from 'react'
import image1 from "../../assets/slider-image-1..jpg"
import image2 from "../../assets/slider-image-2.jpg"
import image3 from "../../assets/slider-image-3.jpg"
import image4 from "../../assets/grocery-banner.jpg"
import image5 from "../../assets/grocery-banner2.jpg"
import Slider from "react-slick";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    // autoplay: true,
    // autoplaySpeed: 1000,
    arrows:false,
  };

  return (
    <>
    <div className='flex flex-col md:flex-row mb-10  md:px-[90px] md:w-1/2 md:m-auto'>
    <div className=" w-full md:w-1/2 relative z-[50] ">
    <Slider {...settings} className=''>
    <img src={image1} className='w-full h-[100vh] md:h-[500px] ' alt="" />
    <img src={image3} className='w-full h-[100vh] md:h-[250px] ' alt="" />
    <img src={image2} className='w-full h-[100vh] md:h-[500px] ' alt="" />
    </Slider>
   
    </div>
    <div className="w-full   md:w-1/2 mt-7 md:mt-0">
    <img src={image4} className='w-full h-[50vh] md:h-[250px]' alt="" />
    <img src={image5} className='w-full h-[50vh] md:h-[250px]' alt="" />
    </div>
    </div>
    </>
    
  )
}

