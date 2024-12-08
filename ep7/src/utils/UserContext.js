import { createContext } from "react";

// it is used to maintain the data that is needed in all the component of tha app

const userContext=createContext({
    user:{
    name:"Mehul",
    email:"mehulbansal@gmail.com"
}});

export default userContext;