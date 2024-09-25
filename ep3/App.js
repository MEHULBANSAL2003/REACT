import React from "react";
import ReactDOM from "react-dom/client";





// jsxheading is react element  


// react functional component

const Title=()=> {
  return (
   <>
    
  <h1 className="head" tabIndex="5">Hello world</h1>
  
  </>
)
}
const HeadingComponent=()=>{
  return (
    <div id="container">
<Title/>    
  <h1 className="heading">functional component</h1>
  </div>
  ) 
}




const root=ReactDOM.createRoot(document.getElementById("root"));

//root.render(jsxHeading);

root.render(<HeadingComponent/>);