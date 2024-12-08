import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
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

  if (!online) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100">
        <h1 className="text-2xl font-bold text-red-600">
          Offline, please check your internet connection!!
        </h1>
      </div>
    );
  }
  

  return listOfRestraunts.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="flex justify-center p-5 bg-orange-500   items-center">
  <input
    type="text"
    className="border-2 border-gray-300 rounded-l-md px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-orange-500"
    value={searchText}
    onChange={(e) => {
      setSearchText(e.target.value);
    }}
    placeholder="Search restaurants..."
  />
  <button
    className="bg-orange-600 text-white font-bold rounded-r-md px-6 py-2 ml-2 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
    onClick={() => {
      let filtered_res = filter_res(searchText, listOfRestraunts);
      setFilteredRestaurant(filtered_res);
    }}
  >
    Search
  </button>

  <button
    className="bg-orange-600 text-white font-bold rounded-md px-6 py-2 ml-2 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
    onClick={() => {
      if (currStatus === "Top rated restaurant") {
        setCurrStatus("All restaurants");
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

<div className="res-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
  {filteredRestaurant.map((restaurant) => {
    return (
      <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
        <RestaurantCard resData={restaurant} />
      </Link>
    );
  })}
</div>


    </>
  );
};

export default Body;
