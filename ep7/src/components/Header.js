import { useState,useContext, use } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import userContext from "../utils/UserContext";
import {  useSelector } from "react-redux";
 


const Header = () => {

    //let btnName="logout";
    let [btnName,setbtnName]=useState("Sign in");

    const isOnline=useOnline();

    const {user}=useContext(userContext);
   
    const cartItems=useSelector((store)=> store.cart.items);
    
   
    
    return (
      <div className="flex justify-between bg-orange-500 shadow-lg">
        <div className="logo-container">
          <img
            className="h-24 p-2 "
            src={LOGO_URL}
          />
        </div>
  
        <div className="nav-items">
          <ul className="flex py-8 ">
            <li className="px-2 font-bold text-white">
              <Link to="/restaurants">Home</Link>
              </li>
            <li className="px-2 font-bold text-white">
              <Link to="/about">About Us</Link>
              </li>
            <li className="px-2 font-bold text-white">
              <Link to="/contact">Contact</Link>
              </li>
            <li className="px-2 font-bold text-white"> 
            <Link to="/cart">Cart({cartItems.length})</Link></li>
              <li className="px-2 font-bold text-white">
              <Link to="/instamart">Instamart</Link>
              </li >

              <li className="px-2 ">{isOnline?"✅":"❌"}</li>
              
               <h1 className="p-2 font-bold text-white">{user.name}</h1>

            <button className="border-4 border-black rounded-md text-white bg-black px-2" onClick={()=>{

              btnName==="Sign in"?setbtnName("Logout"):setbtnName("Sign in");
            }}>{btnName}</button>
          </ul>
        </div>
      </div>
    );
  };  

  export default Header;