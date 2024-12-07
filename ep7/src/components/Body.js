import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RES_URL } from "../utils/constants";
import { filter_res } from "../utils/helper";
import useOnline from "../utils/useOnline";

const Body = () => {
  let [listOfRestraunts, setListOfRestaurants] = useState([]);
  let [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const [currStatus, setCurrStatus] = useState("Top rated restaurant");

  useEffect(() => {
    fetchData();
  }, [location]);
  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Location permission denied. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const fetchData = async () => {
    if(location){
      try{
    const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.latitude}&lng=${location.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
      }
      catch(err){
        setError("Failed to fetch restaurant data. Please try again.");
      }
    }
  };

  const online=useOnline();

  if(!online){
    return <h1>Offline, please check your internet connection!!</h1>
  }

  return listOfRestraunts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              let filtered_res=filter_res(searchText,listOfRestraunts);
             // console.log(filtered_res);
              setFilteredRestaurant(filtered_res);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            if (currStatus === "Top rated restaurant") {
              setCurrStatus("all restuarants");
              const newData = listOfRestraunts.filter((res) => {
                return res.info.avgRating > 4.3;
              });
              setFilteredRestaurant(newData);
            } else {
              setCurrStatus("Top rated restaurant");

              fetchData();
            }
          }}
        >
          {currStatus}
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurant.map((restaurant) => {
          return (
          <Link  key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}> <RestaurantCard resData={restaurant} /> </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
