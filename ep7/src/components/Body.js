import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RES_URL } from "../utils/constants";

const Body = () => {
  let [listOfRestraunts, setListOfRestaurants] = useState([]);
  let [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [currStatus, setCurrStatus] = useState("Top rated restaurant");

  useEffect(() => {
    console.log("hello");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_URL);
    const json = await data.json();

    console.log(json);
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

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
              let filtred_res = listOfRestraunts.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestaurant(filtred_res);
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
