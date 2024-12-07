import React from "react";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurant from "../utils/useRestaurant";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurant(resId);
  
  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, costForTwoMessage, avgRating, cuisines } = resInfo?.cards[2]?.card?.card?.info;
  const reqData = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  return (
    <div className="menu p-5 bg-white text-gray-900">
      <div className="restaurant-info mb-6">
        <h1 className="font-bold text-3xl">{name}</h1>
        <p className="text-gray-600">{cuisines.join(", ")} - {costForTwoMessage}</p>
        <h4 className="text-lg text-yellow-500">{avgRating} ★</h4>
      </div>

      <h2 className="font-bold text-2xl mb-4">Menu</h2>

      {reqData && reqData.length > 0 ? (
        reqData.map((card, index) => {
          const title = card?.card?.card?.title;
          const items = card?.card?.card?.itemCards;
          return (
            <div key={index} className="menu-category mb-6">
              {title && <h3 className="font-bold text-xl mb-2">{title}</h3>}
              {items ? (
                <div className="menu-items space-y-4">
                  {items.map((item) => {
                    const imageId = item.card.info.imageId;
                    const price = item.card.info.defaultPrice ? item.card.info.defaultPrice / 100 : item.card.info.price / 100;
                    return (
                      <div
                        key={item.card.info.id}
                        className="menu-item flex items-center justify-between py-4 border-b border-gray-200"
                      >
                        <div className="item-details flex-1 mr-4">
                          <p className="text-lg font-semibold">{item.card.info.name}</p>
                          <p className="text-gray-600 text-sm">₹{price}</p>
                        </div>
                        {imageId && (
                          <img
                            className="w-24 h-24 object-cover rounded-lg"
                            alt="item"
                            src={CDN_URL + imageId}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No items available in this category.</p>
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
