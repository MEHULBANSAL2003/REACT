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

    setResInfo(json.data);
  };
  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, costForTwoMessage, avgRating, cuisines } =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  return (
    <div className="menu">
      <h1>{name}</h1>

      <p>
        {cuisines.join(",")} -{costForTwoMessage}
      </p>

      <h4>{avgRating} stars</h4>

      <h2>Menu</h2>

      <ul>
        {itemCards.map((item) => {
          return (
            <li key={item.card.info.id}>
              {item.card.info.name} - Rs.
              {item.card.info.defaultPrice / 100 || item.card.info.price / 100}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
