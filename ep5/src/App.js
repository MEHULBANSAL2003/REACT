import React ,{useState,useEffect}from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js"
import Body from "./components/Body.js";








const AppLayout = () => {

  const [c,setC]=useState(0);

  useEffect(()=>{
    setInterval(()=>{
      console.log(c);
      setC(c+1);

    },1000);
    setC(c+1);
  },[]);

  return (
    // <div className="app">
    //   <Header />
   <div>{c}</div>
    //   <Body />
    // </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(jsxHeading);

root.render(<AppLayout />);
