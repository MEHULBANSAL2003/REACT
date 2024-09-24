import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("h1", { id: "heading" }, "hello world"); // the 2nd arguement is the attributes we want to give to the tag

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading);

// creating nested element

const heading1 = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    [React.createElement("h1", { id: "head" }, "this is h1 tag"),React.createElement("h2", { id: "head2" }, "this is h2 tag")]
  )
);

console.log(heading1);
root.render(heading1);