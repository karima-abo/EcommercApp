
import { useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function SpecificBrand() {
   let {id} =useParams()
   const [speBrand,setSpeBrand]=useState(null)
let newId=id.replace(/[^a-zA-Z0-9]/g, '');
//    console.log(newId)

   function getSpecificBrand(brandId){
   axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
   .then((res)=>{console.log(res.data.data,"specifcbrand")
    setSpeBrand(res.data.data)
   })
   .catch((err)=>{console.log(err,"spacificbrand")})


    
   }


useEffect(()=>{
    getSpecificBrand(newId);
},[])
  return (
   <>
   <h2 className=" text-3xl text-emerald-600 font-bold text-center">Brand Details</h2>
  <div className="row  items-center justify-between p-2 bg-gray-200 mt-5">
<div className="bg-red-100 w-1/2">
<img src={speBrand?.image}  alt={speBrand?.name} className="w-full"  />
</div>
  <div className=" w-1/2 flex flex-col justify-center items-center">
    <h3 className=" text-3xl ">{speBrand?.name}</h3>
    <h4 className=" text-xl text-emerald-600 ">{speBrand?.slug}</h4>
  </div>
  </div>
   </>
  )
}

