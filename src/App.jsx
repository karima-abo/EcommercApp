
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './Components/Products/Products'
import Home from './Components/Home/Home'
import Register from './Components/Register/Register'
import Notfound from './Components/Notfound/Notfound'
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Layout from './Components/Layout/Layout'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import WishContextProvider from './Context/WishContext'
import WishList from './Components/WishLIst/WishList'
import Checkout from './Components/Checkout/Checkout'
import Allorders from './Components/Allorders/Allorders'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerfiyCode from './Components/VerfiyCode/VerfiyCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import SpecificBrand from './Components/SpecificBrand/SpecificBrand'
import SpecificCategory from './Components/SpecificCategory/SpecificCategory'
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from 'react-hot-toast'
import OrderContextProvider from './Context/OrderContext'









const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'wish', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'specificbrand/:id', element: <ProtectedRoute><SpecificBrand /></ProtectedRoute> },
      { path: 'specificcategory/:id', element: <ProtectedRoute><SpecificCategory /></ProtectedRoute> },
     
      { path: 'login', element: <Login /> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'register', element: <Register /> },
      { path: 'verfiycode', element: <VerfiyCode /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: '*', element: <Notfound /> }
    ]
  }
]);

function App() {
  const query = new QueryClient();

  return (
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <WishContextProvider>
          <HelmetProvider>
            <OrderContextProvider>
            <RouterProvider router={router} />
            </OrderContextProvider>
          <Toaster />
          </HelmetProvider>
          </WishContextProvider>
        </CartContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
