import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
 


const Header = () => {

    //let btnName="logout";
    let [btnName,setbtnName]=useState("login");
    
    return (
      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={LOGO_URL}
          />
        </div>
  
        <div className="nav-items">
          <ul>
            <li>
              <Link to="/">Home</Link>
              </li>
            <li>
              <Link to="/about">About Us</Link>
              </li>
            <li>
              <Link to="/contact">Contact</Link>
              </li>
            <li>
              Cart</li>
            <button className="login" onClick={()=>{

              btnName==="login"?setbtnName("logout"):setbtnName("login");
            }}>{btnName}</button>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;