
import { useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function SpecificCategory() {
   let {id} =useParams()
   const [speCategory,setSpeCategory]=useState(null)
let newId=id.replace(/[^a-zA-Z0-9]/g, '');
//    console.log(newId)

   function getSpecificCategory(categoryId){
   axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
   .then((res)=>{console.log(res,"specifccategory")
    setSpeCategory(res.data.data)
   })
   .catch((err)=>{console.log(err,"spacificbrand")})


    
   }


useEffect(()=>{
    getSpecificCategory(newId);
},[])
  return (
   <>
   <h2 className=" text-3xl text-emerald-600 font-bold text-center ">Category Details</h2>
  <div className="row  items-center justify-between p-2 bg-gray-200 mt-5">
<div className="bg-red-100 w-1/2">
<img src={speCategory?.image}  alt={speCategory?.name} className="w-full"  />
</div >
  <div className=" w-1/2 flex flex-col justify-center items-center">
    <h3 className=" text-3xl ">{speCategory?.name}</h3>
    <h4 className=" text-xl text-emerald-600 ">{speCategory?.slug}</h4>
  </div>
  </div>
   </>
  )
}


