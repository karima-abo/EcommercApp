import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useProduct from '../../Hooks/useProduct'
import { CartContext } from '../../Context/CartContext'
import { WishContext } from '../../Context/WishContext'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'


export default function Products() {
  let { addProductToWishList, deleteProductFromWishList } = useContext(WishContext);
  let { addProductToCart, setCartItem, CartItem } = useContext(CartContext);
  let { data, isError, error, isLoading } = useProduct();
  const [Loading, setLoading] = useState(false)
  const [addedProducts, setAddedProducts] = useState(new Set());

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist'));
      return new Set(storedWishlist || []);
    } catch (error) {
      console.error("Error parsing wishlist from localStorage:", error);
      localStorage.removeItem("wishlist"); // حذف البيانات التالفة
      return new Set();
    }
  })

  const [searchTerm, setSearchTerm] = useState("");


  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ تحديث localStorage كلما تغيرت القائمة
  useEffect(() => {

    localStorage.setItem('wishlist', JSON.stringify([...wishlistItems]));


  }, [wishlistItems, searchTerm]);


  // console.log(isLoading, data)


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

  async function toggleWishList(id) {
    setLoading(true);
    if (wishlistItems.has(id)) {


      let res = await deleteProductFromWishList(id);
      if (res?.data?.status === "success") {
        setWishlistItems((prev) => {
          const newWishlist = new Set(prev);
          newWishlist.delete(id);
          localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));
          setLoading(false);
          return newWishlist;
        });
      } else {
        alert("error when added to wishlist");
        setLoading(false);
      }
    } else {

      let res = await addProductToWishList(id);
      // console.log(res,"adddd");
      if (res?.data?.status === "success") {

        setWishlistItems((prev) => {
          const newWishlist = new Set([...prev, id]);
          localStorage.setItem("wishlist", JSON.stringify([...newWishlist]));


          toast.success(res.data.message, {
            position: "top-right", style: {
              backgroundColor: "green",
              padding: "15px",
              color: "white",
            }
          })
          setLoading(false);
          return newWishlist;
        });
      } else {
        toast.error("error when add to wish list", {
          position: "top-right", style: {
            backgroundColor: "green",
            padding: "15px",
            color: "white",
          }
        })
        setLoading(false);

      }
    }
  }

  // function getProducts(){
  //   return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   }



  if (isError) {
    return <h3>{error}</h3>
  }
  if (isLoading) {
    return <div className="fixed inset-0 bg-gray-800/60  flex justify-center items-center z-50">
      <span className="loader"></span>
    </div>
  }




  return (
    <>

      <Helmet>
        <title>Product - Fresh Cart</title>
        <meta name="description" content="Welcome to Fresh Cart, your best online shopping experience!" />
      </Helmet>


      <div className="relative">
        {Loading && (
          <div className="fixed inset-0 bg-gray-800/60  flex justify-center items-center z-50">
            <span className="loader"></span>
          </div>
        )}

        <div className="text-center">
          <input
            type="text"
            placeholder="search"
            className="w-3/4 m-auto my-8 border-2 border-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row">
          {filteredProducts?.map((product) => (
            <div key={product?.id} className="md:w-1/2 lg:w-1/4">
              <div className="product text-left p-4">
                <div className="hover:shadow-lg hover:shadow-emerald-600">
                  <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
                    <img src={product.imageCover} className="w-full" alt={product.category.name} />
                    <h3 className="text-emerald-600 pl-3">{product.category.name}</h3>
                    <h3 className="mb-3 pl-3">{product?.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <div className="flex justify-between p-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star text-yellow-400"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <div className="flex flex-wrap justify-between items-center p-3 gap-2">
                    <button onClick={() => addToCart(product?.id)} className="btn w-3/4">
                      Add to Cart
                    </button>
                    <i
                      onClick={() => toggleWishList(product?.id)}
                      className={`fa-solid fa-heart cursor-pointer text-2xl ${wishlistItems.has(product?.id) ? "text-red-500" : "text-gray-400"
                        }`}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>

  )
}

