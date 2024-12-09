import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurant from "../utils/useRestaurant";
import vegIcon from "../utils/veg_svg.png"; // Adjust the file extension if it's PNG or SVG
import nonVegIcon from "../utils/Non_veg_svg.png";
import { filteredMenu } from "../utils/helper.js";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice.js";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurant(resId);
  const [visibleMenus, setVisibleMenus] = useState({}); // State to track visibility for each menu category
  const [searchText, setSearchText] = useState("");
  const [filterMenu, setFilteredMenu] = useState(null);
  const dispatch=useDispatch();

  if (resInfo === null) {
    return <Shimmer />;
    }

    const handleOnClick=(item)=>{
      //dispatch an action
      console.log(item.card.info.name);
      dispatch(addItem(item.card.info.name));
    }

  const toggleMenuVisibility = (index) => {
    setVisibleMenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle visibility for the specific index
    }));
  };

  const { name, costForTwoMessage, avgRating, cuisines } =
    resInfo?.cards[2]?.card?.card?.info;
  const reqData = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  return (
    <div className="menu p-5 bg-white text-gray-900">
      <div className="restaurant-info mb-6">
        <h1 className="font-bold text-3xl">{name}</h1>
        <p className="text-gray-600">
          {cuisines.join(", ")} - {costForTwoMessage}
        </p>
        <h4 className="text-lg text-yellow-500">{avgRating} ★</h4>
      </div>

      <div className="flex justify-center items-center mb-4">
        <h2 className="font-bold text-2xl">Menu</h2>
      </div>

      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-full shadow-md border border-gray-300 p-1">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search for dishes"
          className="flex-grow px-4 py-1 bg-transparent text-gray-700 text-sm outline-none rounded-full"
        />
        <button className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4a7 7 0 017 7m-7-7a7 7 0 00-7 7m14 0a7 7 0 01-7 7m0-14a7 7 0 00-7 7m13.656 10.344l-3.157-3.157"
            />
          </svg>
        </button>
      </div>

      {reqData && reqData.length > 0 ? (
        reqData.map((card, index) => {
          const title = card?.card?.card?.title;
          const items = card?.card?.card?.itemCards;
          return (
            <div key={index} className="menu-category mb-6">
              {title && (
                <div
                  className="flex justify-between items-center cursor-pointer py-2 px-4 hover:bg-gray-200 rounded-md transition"
                  onClick={() => toggleMenuVisibility(index)}
                >
                  <h3 className="font-bold text-xl">{title}</h3>
                  <div className="text-lg text-gray-900">
                    {visibleMenus[index] ? "▲" : "▼"}
                  </div>
                </div>
              )}

              {visibleMenus[index] && items && (
                <div className="menu-items space-y-4 mt-4">
                  {items.map((item) => {
                    const imageId = item.card.info.imageId;
                    const price = item.card.info.defaultPrice
                      ? item.card.info.defaultPrice / 100
                      : item.card.info.price / 100;
                    const isVeg = item.card.info.isVeg ? 1 : 0;
                    return (
                      <div
                        key={item.card.info.id}
                        className="menu-item flex items-center justify-between py-4 border-b border-gray-200"
                      >
                        <div className="item-details flex-1 mr-4">
                          <img
                            className="w-4 h-4"
                            src={
                              isVeg
                                ? vegIcon // Path to the veg image
                                : nonVegIcon // Path to the non-veg image
                            }
                            alt={item.card.info.isVeg ? "Veg" : "Non-Veg"}
                          />
                          <p className="text-lg font-semibold">
                            {item.card.info.name}
                          </p>
                          <p className="text-gray-600 text-sm">₹{price}</p>
                        </div>

                        <div className="relative w-28 h-32">
                          {imageId && (
                            <img
                              className="w-full h-full object-cover rounded-lg"
                              alt="item"
                              src={CDN_URL + imageId}
                            />
                          )}
                          <button  onClick={()=>handleOnClick(item)} className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-20 bg-white text-green-600 text-md font-bold py-1 rounded-md shadow-lg hover:bg-gray-200">
                            ADD +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600">No menu data available</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
