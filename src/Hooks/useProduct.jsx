import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProduct() {
    function getProducts(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        }
        
         let productInfo = useQuery({
            queryKey:["recentProducts"],
            queryFn: getProducts,
            staleTime: 0,
            gcTime:4000,
            select:(data)=> data.data.data ,
        //    retry:5,
        // retryDelay:2000,
        // refetchInterval:5000,
        // refetchIntervalInBackground:true,
        // refetchOnWindowFocus:true,

          });
  return    productInfo ;     
}
