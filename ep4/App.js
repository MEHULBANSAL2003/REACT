

import React from "react";
import ReactDOM from "react-dom/client";

const Header=()=>{
  return (
       <div className="header">
        <div className="logo-container">

        
          <img  className="logo" src="https://t3.ftcdn.net/jpg/04/03/74/22/360_F_403742248_8DDzcFF4jw05lWqftk2yxzKRpFvpZ01Y.jpg"/>
            </div>

         <div className="nav-items">
            <ul>
                
                <li>Home</li>
                <li>About Us</li>
                <li>Contact</li>
                <li>Cart</li>


            </ul>
          
          </div>   
       </div>
  );
}

const Restaurant=()=>{
  return (
    <div className="res-card">
      <h3>Meghna Food</h3>
      

    </div>
  )
}

const Body=()=>{
  return (
    <div className="body">
       <div className="Search">Search</div>

       <div className="res-container">
        <Restaurant/>
       </div>

    </div>
  )
}


const AppLayout=()=>{
  return (
    <div className="app">
     <Header/>

     <Body/>

    </div>
  )
}

const root=ReactDOM.createRoot(document.getElementById("root"));

//root.render(jsxHeading);

root.render(<AppLayout/>);