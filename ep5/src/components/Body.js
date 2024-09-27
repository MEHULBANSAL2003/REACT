import RestaurantCard from "./RestaurantCard";
import {useState} from "react";
import resList from "../utils/mockData";

const Body = () => {
   
    let [listOfRestraunts,setListOfRestaurants]=useState(resList);
    

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