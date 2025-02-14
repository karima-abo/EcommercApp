import axios from "axios";
import { createContext } from "react";




export   let OrderContext =createContext();


export default function OrderContextProvider(props){
    let headers={
        token: localStorage.getItem("userToken"),
    }
   
function CreateCashOrder(cartId,data){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress:data},{headers})
    .then(response => response)
    .catch(error =>error);
}






    return <OrderContext.Provider value={{CreateCashOrder}}>
        {props.children}
    </OrderContext.Provider>
}