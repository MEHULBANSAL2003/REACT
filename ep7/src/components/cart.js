import React from 'react';
import { CDN_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import vegIcon from "../utils/veg_svg.png";
import nonVegIcon from "../utils/Non_veg_svg.png";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  //console.log(cartItems);

  const cartItemsMap=new Map();
 
  cartItems.forEach((item)=>{
    cartItemsMap.set(item,(cartItemsMap.get(item)||0)+1);
  })

  cartItemsMap.forEach((count,item)=>{
    console.log(`${item}: ${count}`);
  })

  const handleClearCart = () => {
    const confirmClear = window.confirm("Are you sure you want to clear the cart?");
    if (confirmClear) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <h1 className="text-xl font-semibold text-gray-500 text-center">
            Cart is empty. Add items to cart!
          </h1>
        ) : (
          <div>
            <button
              onClick={handleClearCart}
              className="block mx-auto mb-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
            >
              Clear Cart
            </button>

            <div className="space-y-6">
              {Array.from(cartItemsMap).map(([item, count]) => {
                console.log(item);
                const imageId = item?.card?.info?.imageId;
               
                const price = item?.card?.info?.defaultPrice
                  ? item?.card?.info?.defaultPrice / 100
                  : item?.card?.info?.price / 100;
                const isVeg = item?.card?.info?.isVeg ? 1 : 0;
                

                return (
                  <div
                    key={item.card.info.id}
                    className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-6 h-6"
                        src={isVeg ? vegIcon : nonVegIcon}
                        alt={isVeg ? "Veg" : "Non-Veg"}
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {item.card.info.name}
                        </p>
                        <p className="text-gray-500">₹{price}</p>
                      </div>
                    </div>

                    <div className="relative">
                     
                                  <div className="relative w-28 h-32">
                                    <img
                                      className="w-full h-full object-cover rounded-lg"
                                      src={CDN_URL + imageId}
                                      alt="item"
                                    />
                                    <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-1 bg-white py-1 rounded-md shadow-lg">
                                      
                                        <button
                                         
                                          className="text-green-600 w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-300"
                                        >
                                          -
                                        </button>
                                      
                                      <p className="text-green-600 font-bold text-md text-center">
                                        {count}
                                      </p>
                                      <button
                                       
                                        className="text-green-600 text-xl font-bold w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-300"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                
                     
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
