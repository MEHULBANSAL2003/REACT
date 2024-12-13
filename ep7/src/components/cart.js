import React from 'react'
import { CDN_URL } from '../utils/constants';
import {useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../redux/cartSlice';
import vegIcon from "../utils/veg_svg.png";
//import nonVegIcon from "../utils/Non_veg_svg.png";

const Cart = () => {
    const cartItems=useSelector((store)=>store.cart.items);
     const dispatch=useDispatch();
   // console.log(cartItems);
    
    const handleClearCart=()=>{
         dispatch(clearCart());
    }


  return(
    <div className="text-center m-4 p-2">
        <h1 className='text-2xl font-bold'>Cart</h1>
        {cartItems.length==0 && <h1 className='text-xl font-bold'>Cart is empty. Add items to cart!!</h1>}
        {cartItems.length>0 &&<button onClick={handleClearCart} className="p-2 m-2 bg-black text-white rounded-lg">Clear Cart</button>} 

       
      
    </div>
  )
}

export default Cart
