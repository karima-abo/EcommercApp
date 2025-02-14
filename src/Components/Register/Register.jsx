
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import * as yup from "yup"
import { UserContext } from '../../Context/UserContext';


export default function Register() {
  const navegate = useNavigate();
 const [ApiError, setApiError] = useState("");
 const [isLoading, setisLoading] = useState(false);
 let {userLogin ,setuserLogin} = useContext(UserContext);
 
 function handelRegister(values){
  setisLoading(true);
  console.log(values)
  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
  .then((res)=>{setisLoading(false);
    console.log(res);
      if(res.data.message =="success")
      {
        localStorage.setItem("userToken",res.data.token);
        setuserLogin(res.data.token);
        // console.log(userLogin, "hhhhhhhhhhhhhhhhhhhh")
        navegate("/");
    }
    
  })

   .catch((res)=>{setisLoading(false);
    console.log(res)
    setApiError(res.response.data.message);
    
    
   })
 }



  let myVlidation =yup.object().shape({
    name: yup.string().min(3,"min length is 3").max( 10, "max length is 10").required("name is requried"),
    email: yup.string().email("email not valied").required("email is requried"),
    password: yup.string().required("password is required").min(6 ,"min length is 6").required("password is requried").matches(/^[A-Z][A-Za-z0-9]{5,8}$/,`* Start with a letter uppercase .
* Be between 6 and 9 characters in total.
* Can only contain letters (A-Z or a-z) and numbers (0-9)`),
    rePassword: yup.string().oneOf([yup.ref('password')],"not matched with password").required("rePassword is required"),
    phone: yup.string().required().matches(/^01[12350][0-9]{8}$/ ,"phone not valid"),
  })






  let formik = useFormik({
    initialValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema: myVlidation,
   onSubmit: handelRegister,
  })
  return (
    <>
 
  {ApiError ?  <div className='bg-red-500 text-white rounded-lg font-bold py-2'> {ApiError} </div> : null}
   <h2 className='font-bold text-2xl text-center text-emerald-600 my-4'>Register Now</h2>
   <form onSubmit={formik.handleSubmit} className="">
  <div className="relative z-0 w-full mb-5 group ">
  <label htmlFor="namee" className="block mb-2 text-xl  text-gray-900  ">
  Enter Your Name</label>
      <input 
      type="text"
       name="name"
        value={formik.values.name} 
        onChange={formik.handleChange}
         onBlur={formik.handleBlur}
       id="namee" 
       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-8 focus:outline-blue-300  block w-full p-2.5" 
       placeholder=" " required />
    
      {formik.errors.name && formik.touched.name ? (
        <div className='b-4 mb-4 mt-2  rounded-md text-sm p-4 text-red-800 border-[1px] border-red-400 bg-red-200' role='aleart'>
          <span className='font-medium'>{formik.errors.name}</span>
        </div>

      ) : null}
  </div>
  <div className="relative z-0 w-full mb-5 group ">
  <label htmlFor="email" className="block mb-2 text-xl  text-gray-900  "
      >Email address</label>
      <input
       type="email"
        name="email" 
        value={formik.values.email}
         onChange={formik.handleChange}
          onBlur={formik.handleBlur}
       id="email" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-8 focus:outline-blue-300  block w-full p-2.5"
       placeholder=" " required />
     
       {formik.errors.email && formik.touched.email ? (
        <div className='b-4 mb-4 mt-2  rounded-md text-sm p-4 text-red-800 border-[1px] border-red-400 bg-red-200' role='aleart'>
          <span className='font-medium'>{formik.errors.email}</span>
        </div>

      ) : null}
  </div>
  <div className="relative z-0 w-full mb-5 group ">
  <label htmlFor="password" className="block mb-2 text-xl  text-gray-900  ">
  Enter Your password</label>
      <input type="password"
       name="password" 
       value={formik.values.password}
        onChange={formik.handleChange}
         onBlur={formik.handleBlur}
       id="password" 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-8 focus:outline-blue-300  block w-full p-2.5"
       placeholder=" " required />
     
     {formik.errors.password && formik.touched.password ? (
        <div className='b-4 mb-4 mt-2  rounded-md text-sm p-4 text-red-800 border-[1px] border-red-400 bg-red-200' role='aleart'>
          <span className='font-medium'>{formik.errors.password}</span>
        </div>

      ) : null}
  </div>
  <div className="relative z-0 w-full mb-5 group ">
  <label htmlFor="rePassword" className="block mb-2 text-xl  text-gray-900  ">
  Enter rePassword</label>
      <input 
      type="password" 
      name="rePassword"
       value={formik.values.rePassword}
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
       id="rePassword" 
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-8 focus:outline-blue-300  block w-full p-2.5"
       placeholder=" " required />
      
        {formik.errors.rePassword && formik.touched.rePassword ? (
        <div className='b-4 mb-4 mt-2  rounded-md text-sm p-4 text-red-800 border-[1px] border-red-400 bg-red-200' role='aleart'>
          <span className='font-medium'>{formik.errors.rePassword}</span>
        </div>

      ) : null}
  </div>
  <div className="relative z-0 w-full mb-5 group ">
  <label htmlFor="phone" className="block mb-2 text-xl  text-gray-900  ">
  Enter Your phone</label>
      <input
       type="tel" 
       name="phone"
        value={formik.values.phone} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
       id="phone" 
 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-8 focus:outline-blue-300  block w-full p-2.5"
       placeholder=" " required />
     
      {formik.errors.phone && formik.touched.phone ? (
        <div className='b-4 mb-4 mt-2  rounded-md text-sm p-4 text-red-800 border-[1px] border-red-400 bg-red-200' role='aleart'>
          <span className='font-medium'>{formik.errors.phone}</span>
        </div>

      ) : null}
  </div>
 
  <div className='text-left flex items-center gap-4 justify-between'>
 
   <Link to={"/login"}> <span className='text-xl font-semibold  hover:text-emerald-600 transition-colors'>do you have a account? Login Now</span> </Link>
   <button type="submit" 
  className="text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-4 text-center  ">
  {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
    </button>
  </div>
  
 </form>
    </>
    
  )
}
