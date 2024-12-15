import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { MAP_TOKEN } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setUserLocation } from '../redux/locationSlice';

const Location = () => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError("");
          

          dispatch(setUserLocation({latitude,longitude}));
            
         navigate("/restaurants");
        },
        (err) => {
          setError("Unable to fetch location. Please allow location access.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchCoordinates=async(location)=>{
    const data=await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${location}&access_token=${MAP_TOKEN}`)
      const json=await data.json();  

     

      const currCoordinates=json.features[0].geometry.coordinates;
    
      return currCoordinates;
}


  // Handle form submission for manual location
  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    let loc=inputValue.trim();
    if (location === "") {
      setError("Please enter a valid location.");
      return;
    }
    
    let currCoordinates=await fetchCoordinates(loc);
     let [longitude,latitude]=currCoordinates;
    
    
    dispatch(setUserLocation({latitude,longitude}));
   navigate("/restaurants");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Select Your Location
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Find restaurants near you by entering your location or using your current location.
        </p>
        {/* Input Box for Manual Location */}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your location"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button onClick={handleLocationSubmit}
            type="submit"
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Find Restaurants
          </button>
        
        {/* OR Divider */}
        <div className="flex items-center justify-center mb-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-3 text-gray-500">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        {/* Use Current Location Button */}
        <button
          onClick={getCurrentLocation}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          Use Current Location
        </button>
        {/* Error Message */}
        {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Location;
