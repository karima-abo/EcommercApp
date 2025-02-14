import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let {addProductToWishList,deleteProductFromWishList}=useContext(WishContext);
    let {addProductToCart ,setCartItem,CartItem}=useContext(CartContext);
      const [isLoading,setIsLoading]=useState(false)
      const [Loading,setLoading]=useState(false)
      const [CurrentId,setCurrentId]=useState(0)
       const [addedProducts, setAddedProducts] = useState(new Set());
   const [wishlistItems, setWishlistItems] = useState(() => {
      try {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        return new Set(storedWishlist || []);
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
        localStorage.removeItem("wishlist"); 
        return new Set();
      }
    })
    
  
    
 
    async function addToCart(id) {
      setLoading(true);
    
      
      let response = await addProductToCart(id);
    
      if (response?.data?.status === "success") {
        toast.success(response.data.message, {
          position: "top-right",
          style: {
            backgroundColor: "green",
            padding: "15px",
            color: "white",
          }
        });
    
       
        if (!addedProducts.has(id)) {
          setCartItem(CartItem + 1);
          setAddedProducts((prev) => new Set(prev).add(id));
        }
      } else {
        toast.error("error when added to cart", {
          position: "top-right",
          style: {
            backgroundColor: "red",
            padding: "15px",
            color: "white",
          }
        });
      }
    
      setLoading(false);
    }

let [product,setProduct]=useState(null)
let [relatedProduct,setRelatedProduct]=useState([])
  let {id,category} =useParams();
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
   
  };

async function toggleWishList(id) {
  if (wishlistItems.has(id)) {
  
    let res = await deleteProductFromWishList(id);
    if (res?.data?.status === "success") {
      setWishlistItems((prev) => {
        const newWishlist = new Set(prev);
        newWishlist.delete(id); 
        localStorage.setItem("wishlist", JSON.stringify([...newWishlist])); 
        return newWishlist;
      });
    } else {
      alert("error when added to wishlist");
    }
  } else {
    
    let res = await addProductToWishList(id);
    if (res?.data?.status === "success") {
      setWishlistItems((prev) => {
        const newWishlist = new Set([...prev, id]); 
        localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));
        toast.success( res.data.message, {
          position: "top-right", style: {
            backgroundColor: "green",
            padding: "15px",
            color: "white",
          }
        })
        return newWishlist;
      });
    } else {
     
      toast.error( "error when added to wishlist", {
        position: "top-right", style: {
          backgroundColor: "green",
          padding: "15px",
          color: "white",
        }
      })
    }
  }
}
  function getSpacifcProduct(productId){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`).then((res)=>{console.log(res.data.data)
      setProduct(res.data.data);
    })
    .catch((err)=>{console.log(err)})
  }
  function getRelatedProduct(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res)=>{

      let related=res.data.data.filter((productt)=> productt.category.name === category)
      setRelatedProduct(related);
      console.log(related);
    
    })
    .catch((err)=>{console.log(err)})
   
  }


  useEffect(()=>{
    localStorage.setItem('wishlist', JSON.stringify([...wishlistItems]));
    getSpacifcProduct(id);
    getRelatedProduct();
  },[id ,category,wishlistItems])
  return (
    <>
   <div className="row justify-items-center items-center p-8 ">
    <div className=" w-[90%] m-auto  p-5 mb-6 md:w-1/4">
    <Slider {...settings}>
  {product?.images.map((src)=><img src={src} className='w-full' alt='product'/>
  )}

 </Slider>
    </div >
    <div className=" text-left p-4 pt-16 w-[90%] m-auto mt-6 md:w-3/4">
    <h3 className='text-2xl font-semibold capitalize'> {product?.title}</h3>
    <h4 className='text-gray-600 my-7'>{product?.description}</h4>
    <h4 className='text-emerald-600'>{product?.category.name}</h4>
    <div className='flex justify-between py-2'>
          <span>{product?.price}EGP</span>
          <span > <i className='fas fa-star text-yellow-400'></i>{product?.ratingsAverage}</span>
        </div >
    <div className='row justify-between items-center    p-2'>
    <button onClick={()=>addToCart(product.id)}
        className='btn w-3/4 text-white  p-4 rounded-lg '>{
          Loading ?<i className='fas fa-spinner fa-spin'></i>:"Add To Carts"
        }
          
          
          </button>
         <i
                         onClick={() => toggleWishList(product.id)}
                         className={`fa-solid fa-heart cursor-pointer text-2xl  ${
                           wishlistItems.has(product?.id) ? 'text-red-500' : 'text-gray-800'
                         }`}
                       ></i>
    </div>
         
    </div>
   </div>
   <div className="row">

   
{relatedProduct.length >0 ?   relatedProduct.map((product)=>( <div key={product.id} className='md:w-1/2  lg:w-1/4'>
         
          <div className='product text-left p-4 '>
           <div className='hover:shadow-lg hover:shadow-emerald-600'>
           <Link to={`/productdetails/${product.id}/${product.category.name}`} >
             <img src={product.imageCover} className='w-full' alt={product.category.name} />
             <h3 className='text-emerald-600 pl-2 '>{product.category.name}</h3>
             <h3 className='mb-3 pl-2'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
             <div className='flex justify-between p-3'>
               <span>{product.price}EGP</span>
               <span > <i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage
               }</span>
             </div>
             </Link>
             <div className='flex flex-wrap justify-between items-center p-3 gap-2'>
             <button  onClick={()=>addToCart(product.id)} className='btn w-3/4' >{
          Loading && CurrentId == product.id ?<i className='fas fa-spinner fa-spin'></i>:"Add To Carts"}
        </button>
            
            <i
                         onClick={() => toggleWishList(product.id)}
                         className={`fa-solid fa-heart cursor-pointer text-2xl ${
                           wishlistItems.has(product?.id) ? 'text-red-500' : 'text-gray-400'
                         }`}
                       ></i>
             </div>
           </div>
         
           
     
     
           </div>
      
     
     
     
         </div>)) : <div className='lloding'>   <div className="lds-facebook"><div></div><div></div><div></div></div></div>}
</div>

    </>
    
  )
}

