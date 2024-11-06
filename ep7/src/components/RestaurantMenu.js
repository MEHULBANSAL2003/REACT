import React, { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  fetchMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();
    console.log(resId);

    setResInfo(json.data);
  };
  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, costForTwoMessage, avgRating, cuisines } =
    resInfo?.cards[2]?.card?.card?.info;

  const reqData =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  return (
    <div className="menu">
      <h1>{name}</h1>

      <p>
        {cuisines.join(",")} -{costForTwoMessage}
      </p>

      <h4>{avgRating} stars</h4>

      <h2>Menu</h2>
      
      {reqData && reqData.length > 2 ? (
        reqData.slice(2).map((card, index) => {
          const title = card?.card?.card?.title;
          const items = card?.card?.card?.itemCards;
          return (
            <div key={index}>
              {title && <h3>{title}</h3>}
              {items ? (
                items.map((item) => (
                  <p key={item.card.info.id}>
                  {item.card.info.name} - (Rs. {item.card.info.defaultPrice ? item.card.info.defaultPrice / 100 : item.card.info.price / 100})
                </p>
                
                ))
              ) : (
                <p></p>
              )}
              <hr />
            </div>
          );
        })
      ) : (
        <p>No menu data available</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
