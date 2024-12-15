import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import { createBrowserRouter, RouterProvider, Outlet ,useLocation} from "react-router-dom";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Profile from "./components/Profile.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import Shimmer from "./components/Shimmer.js";
import Location from "./components/Location.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import {appStore,persistor} from "./redux/appStore.js";
import Cart from "./components/Cart.js";


let Instamart = lazy(() => import("./components/Instamart.js"));

const AppLayout = () => {
  const location = useLocation();
  const isLocationPage = location.pathname === "/"; 
  return (
    <Provider store={appStore}>
       <PersistGate loading={null} persistor={persistor}>
      <div className="app">
      {!isLocationPage && <Header />}
        <Outlet />
     
      </div>
      </PersistGate>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Location />,
        // errorElement:<Error/>
      },
      {
        path: "/restaurants",
        element: <Body />,
        // errorElement:<Error/>
      },

      {
        path: "/about",
        element: <About />,
        // errorElement:<Error/>
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
        // errorElement:<Error/>
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Instamart />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart/>
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(jsxHeading);

root.render(<RouterProvider router={appRouter} />);
