import React, { useState } from 'react';
import { useEffect } from 'react';
import Shimmer from './Shimmer';
import { CDN_URL } from '../utils/constants';

const RestaurantMenu = () => {

    const [resInfo,setResInfo]=useState(null);

    useEffect(()=>{ 
      fetchMenu();
    },[]);

    fetchMenu=async()=>{
        const data =await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.76648186047635&lng=76.78531226911772&restaurantId=42244&catalog_qa=undefined&submitAction=ENTER")
        const json=await data.json();
        console.log(json);
        setResInfo(json.data);
    };
    if(resInfo===null){
       return <Shimmer/>
    }
       
     const {name,cuisines,costForTwoMessage,cloudinaryImageId,avgRating}=resInfo?.cards[2]?.card?.card?.info;

  return  (
    <div>
      <h1>{name}</h1>
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_URL+cloudinaryImageId}
      />
      <p>{cuisines.join(",")} -{costForTwoMessage}</p>
      
      <h2>{avgRating}</h2>
      <ul>
        <li>Burger</li>
        <li>Noodles</li>
        <li>Pizza</li>   
     
      </ul>
    </div>
  )
}

export default RestaurantMenu
