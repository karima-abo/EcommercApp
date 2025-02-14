
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
 import * as yup from "yup";
import { UserContext } from '../../Context/UserContext';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
 const navagite =   useNavigate()
const [isLoading ,setisLoading] =useState(false);
const [ApiError ,setApiError] =useState("");
let {userLogin ,setuserLogin} =useContext(UserContext);



 


let validation =yup.object().shape({
  email :yup.string().email("email is not valid").required("email is required"),
  password:yup.string().required("password is required").min(6 ,"min length is 6")
})






  function handelLogin(values){
    setisLoading(true);
    // console.log(values,"hellllllllllo");
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).then((res)=>{
      setisLoading(false);
      console.log(res,"succ id");
      console.log("User ID:", res.data.user._id);
      console.log("Possible User ID:", res.data?.user?._id || res.data?.data?.user?._id);
   
      navagite("/");
      localStorage.setItem("userToken",res.data.token);
      setuserLogin(res.data.token);
      // console.log(userLogin)

    })
    .catch((err)=>{
      setisLoading(false);
      console.log(err.response.data.message,"errrrr");
      setApiError(err.response.data.message);
    })
    

  }
  let formik =useFormik({

    initialValues :{
      email:"",
      password:""

    },
    validationSchema: validation,
    onSubmit: handelLogin,
  })


 


  




  return <>

{ApiError ?  <div className='bg-red-500 text-white rounded-lg font-bold py-2 '> {ApiError} </div> : null}
  <h2 className='font-bold text-2xl text-emerald-600  my-4 text-center'>Login Now</h2>
  <form onSubmit={formik.handleSubmit} className=' '>
  <div className="relative z-0 w-full mb-8 group ">
  <label htmlFor="email" className="block mb-2 text-xl  text-gray-900  ">
  Enter Your email</label>
      <input 
      type="email"
       id='email' 
       name='email'
       value={formik.values.email}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-8 focus:outline-blue-300  block w-full p-2.5" 
      placeholder=" " required
 />
      
      {formik.errors.email && formik.touched.email ?  <div className='b-4 mb-4 mt-2  rounded-md text-sm p-4 text-red-800 border-[1px] border-red-400 bg-red-200' role='aleart'>
          <span className='font-medium'>{formik.errors.email}</span>
        </div> : null}
      

      

     
  </div>

  <div className="relative z-0 w-full mb-5 group ">
  <label htmlFor="password"   className="block mb-2 text-xl text-gray-900  ">
  Enter Your password</label>
      <input 
      type="password"
       id='password'
       name='password'
       value={formik.values.password}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-0 focus:outline-8 focus:outline-blue-300   block w-full p-2.5   "
      placeholder=" " required
 />
     

     {formik.errors.password && formik.touched.password ?  <div className='b-4 mb-4 mt-2 text-sm p-4 rounded-md border-[1px] border-red-400 text-red-800 bg-red-200' role='aleart'>
          <span className='font-medium'>{formik.errors.password}</span>
        </div> : null}
      

     
  </div>
<div className='flex flex-col md:flex-row  gap-4 items-center justify-between '>
 


   <Link to={"/forgetpassword"} className=''>
<span className=' text-xl font-semibold    hover:text-emerald-600 transition-colors'>forget your  password ?</span> 
</Link>
<button type="submit" className="text-white bg-emerald-700 hover:text-emerald-600 hover:border-2  hover:border-emerald-600 hover:bg-white transition-all   font-medium rounded-lg text-sm w-full sm:w-auto px-12  py-4 text-center  ">
   {isLoading ? <i className='fas fa-spinner fa-spin'></i> :"Login"}
   </button>
    {/* <Link to={"/register"}><span className='text-blue-500 hover:text-emerald-600 transition-colors '>don't you have a account? Register Now</span> </Link>
   */}

</div>



</form>


    </>
    
  
}

