


import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { CartItem } = useContext(CartContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function signOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("wishlist"); 
    setuserLogin(null);

    navigate("/login");
  }

  return (
    <>
      <nav className="bg-[#F8F9FA] border-gray-200 md:py-3 fixed top-0 left-0 right-0 z-[100]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
         
          <Link to="/" className="flex items-center rtl:space-x-reverse">
            <i className="fa-solid fa-cart-shopping text-4xl text-emerald-600"></i>
            <h1 className="font-semibold text-3xl capitalize">fresh cart</h1>
          </Link>

         
          <div className="hidden md:flex items-center gap-6">
            {userLogin !== null ? (
              <>
                <NavLink className="text-slate-500" to="/">
                  Home
                </NavLink>
                <NavLink className="text-slate-500" to="products">
                  Products
                </NavLink>
                <NavLink className="text-slate-500" to="cart">
                  Cart
                </NavLink>
                <NavLink className="text-slate-500" to="wish">
                  WishList
                </NavLink>
                <NavLink className="text-slate-500" to="categories">
                  Categories
                </NavLink>
                <NavLink className="text-slate-500" to="brands">
                  Brands
                </NavLink>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-6 ml-auto">
              <Link className="text-slate-600" to="login">
                Login
              </Link>
              <Link className="text-slate-600" to="register">
                Register
              </Link>
            </div>
            )}
          </div>

        
          <div className="hidden md:flex items-center gap-6">
            {userLogin !== null && (
              <>
                <Link to="cart" className="relative">
                  <i className="fa-solid fa-cart-shopping text-3xl text-gray-500"></i>
                  <span className="absolute -top-2 -right-3 bg-emerald-600 text-white size-6 rounded-md flex justify-center items-center text-sm">
                    {CartItem}
                  </span>
                </Link>
                <span onClick={signOut} className="text-slate-600 cursor-pointer">
                  Log Out
                </span>
              </>
            )}
          </div>

       
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="  inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

        
          <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:hidden bg-white shadow-lg border-t border-gray-200 mt-5`}>
            <ul className="flex flex-col font-medium p-4 space-y-4  ">
              {userLogin !== null ? (
                <>
                  <li className="by-1">
                    <NavLink className="text-slate-500" to="/" >
                      Home
                    </NavLink>
                  </li>
                  <li className="by-1">
                    <NavLink className="text-slate-500" to="products" >
                      Products
                    </NavLink>
                  </li>
                  <li className="by-1">
                    <NavLink className="text-slate-500" to="cart" >
                      Cart
                    </NavLink>
                  </li>
                  <li className="by-1">
                    <NavLink className="text-slate-500" to="wish" >
                      WishList
                    </NavLink>
                  </li>
                  <li className="by-1">
                    <NavLink className="text-slate-500" to="categories" >
                      Categories
                    </NavLink>
                  </li>
                  <li className="by-1">
                    <NavLink className="text-slate-500" to="brands" >
                      Brands
                    </NavLink>
                  </li>

                  <li className="flex items-center gap-4 mt-4 border-t pt-4  flex-col">
                    <Link to="cart" className="relative ">
                      <i className="fa-solid fa-cart-shopping text-3xl text-gray-500"></i>
                      <span className="absolute -top-1 -right-3 bg-emerald-600 text-white size-6 rounded-md flex justify-center items-center">
                        {CartItem}
                      </span>
                    </Link>
                    <span onClick={signOut} className="text-slate-600 cursor-pointer">
                      log out
                    </span>
                  </li>
                </>
              ) : (
                <div >
                  <li>
                    <Link className="text-slate-600" to="login" >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="text-slate-600" to="register" >
                      Register
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
