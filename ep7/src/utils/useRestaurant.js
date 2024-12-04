import { useState,useEffect } from "react";
import { MENU_URL } from "./constants";
const useRestaurant=(resId)=>{

    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
      }, []);
    
      fetchMenu = async () => {
        const data = await fetch(MENU_URL + resId);
        const json = await data.json();
        console.log(resId);
    
        setResInfo(json.data);
      };

      return resInfo;

}

export default useRestaurant;