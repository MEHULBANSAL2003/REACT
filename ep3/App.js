import React from "react";
import ReactDOM from "react-dom/client";




const jsxHeading=(<h1 className="head" tabIndex="5">
  Hello world
  </h1>
)
// jsxheading is react element  


// react functional component

const HeadingComponent=()=>{
  return (
  <h1>functional component</h1>
  ) 
}

const root=ReactDOM.createRoot(document.getElementById("root"));

//root.render(jsxHeading);

root.render(<HeadingComponent/>);