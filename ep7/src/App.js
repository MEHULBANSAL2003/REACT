import React,{lazy,Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js"
import Body from "./components/Body.js";
import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";   
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Profile from "./components/Profile.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import Shimmer from "./components/Shimmer.js";
import Location from "./components/Location.js";
import { Provider } from "react-redux";

let Instamart=lazy(()=> import("./components/Instamart.js"));



const AppLayout = () => {
  return (
    <div className="app">
      <Provider>
      <Header />
      <Outlet/>
      </Provider>
    </div>
  );
};

const appRouter=createBrowserRouter([

{
  path:'/',
  element:<AppLayout/>,
  children:[

    {
      path:"/",
      element:<Location/>,
      // errorElement:<Error/>
      },
      {
        path:"/home",
        element:<Body/>,
        // errorElement:<Error/>
        },

    {
      path:"/about",
      element:<About/>,
      // errorElement:<Error/>
      children:[
        {
          path:"profile",
          element: <Profile/>
        }
      ]
      },
      {
        path:"/contact",
        element:<Contact/>,
        // errorElement:<Error/>
        },
        {
          path:"/restaurants/:resId",
          element:<RestaurantMenu/>
        },
        {
          path:"/instamart",
          element:<Suspense fallback={<Shimmer/>}><Instamart/></Suspense>
          
        }

  ],
  errorElement:<Error/>
}


])


const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(jsxHeading);

root.render(<RouterProvider router={appRouter}/>);







