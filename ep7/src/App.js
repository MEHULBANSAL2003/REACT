import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js"
import Body from "./components/Body.js";
import {createBrowserRouter,RouterProvider} from "react-router-dom";   
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";


const AppLayout = () => {
  return (
    <div className="app">
      <Header />

      <Body />
    </div>
  );
};

const appRouter=createBrowserRouter([

{
  path:'/',
  element:<AppLayout/>,
  errorElement:<Error/>
},
{
path:"/about",
element:<About/>,
// errorElement:<Error/>
},
{
  path:"/contact",
  element:<Contact/>,
  // errorElement:<Error/>
  }

])


const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(jsxHeading);

root.render(<RouterProvider router={appRouter}/>);
