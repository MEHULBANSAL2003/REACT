import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData?.info;

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden m-4">
      <img
        className="w-full h-48 object-cover"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{name}</h3>
        <h4 className="text-sm text-gray-600">{cuisines.join(", ")}</h4>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 font-bold">{avgRating}</span>
          <span className="text-gray-500 ml-1">★</span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">Cost for two: {costForTwo}</p>
          <p className="text-sm text-gray-600">Delivery Time: {sla.deliveryTime} min</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
