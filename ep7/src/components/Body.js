import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link,useLocation } from "react-router-dom";
import { filter_res } from "../utils/helper";
import useOnline from "../utils/useOnline";

const Body = () => {

  let [listOfRestraunts, setListOfRestaurants] = useState([]);
  let [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const { latitude, longitude } = location.state || {};
  const [error, setError] = useState("");

  const [currStatus, setCurrStatus] = useState("Top rated restaurant");
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {   
    if (latitude && longitude) {
        try {
            // Fetch restaurant data
            const response = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);

            // Check if the response is okay (status 200)
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants. Please try again later.');
            }

            // Parse the JSON data
            const json = await response.json();

            // Check if restaurants data is available
            const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

            if (restaurants && restaurants.length > 0) {
                setListOfRestaurants(restaurants);
                setFilteredRestaurant(restaurants);
            } else {
                throw new Error('No restaurants found for this location.');
            }

        } catch (error) {
            // Handle any errors (network issues, unserviceable location, etc.)
            setError(error.message);
            console.error('Error fetching data:', error.message );
            
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white text-gray-800 rounded-xl p-6 w-4/5 max-w-md text-center shadow-lg border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">Oops! Something went wrong</h2>
          <p className="text-base mb-6 text-gray-600">{error}</p>
          <button
            onClick={() => fetchData}
            className="bg-orange-500 text-white font-semibold rounded-lg px-8 py-3 w-full hover:bg-orange-700 focus:outline-none transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
 
  
  if (  listOfRestraunts.length === 0) {
    return <Shimmer />;
  }
  return (
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
