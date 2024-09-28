import RestaurantCard from "./RestaurantCard";
import {useState,useEffect} from "react";
import Shimmer  from "./Shimmer";

const Body = () => {
   
    let [listOfRestraunts,setListOfRestaurants]=useState([]);

    useEffect(()=>{
        console.log("hello");
        fetchData();  
    },[]);
    
    const fetchData=async()=>{
      const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.76648186047635&lng=76.78531226911772&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const json=await data.json();

      console.log(json);
      setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    if(listOfRestraunts.length===0){
      return <Shimmer/>
    }
    

    return (
      <div className="body">
        <div className="filter">

            <button className="filter-btn" onClick={()=>{
               const newData=listOfRestraunts.filter((res)=>{
                    return res.info.avgRating>4.5;
               })
               setListOfRestaurants(newData);
            }}>Top rated Restaurants</button>
        </div>
  
        <div className="res-container">
          {listOfRestraunts.map((restaurant)=>{
            return <RestaurantCard key={restaurant.info.id} resData={restaurant}/>
          }
  
          )}
        </div>
      </div>
    );
  };

  export default Body;