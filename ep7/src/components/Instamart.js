import { useState } from "react";

const Section = ({ title, description,isVisible,setIsVisible}) => {
 
  const handleOnClick = () => {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  };

  return (
    <div className="border border-black p-2 m-2">
      <h3 className="font-bold text-xl">{title}</h3>
      {isVisible?
      <button className="cursor-pointer underline" onClick={handleOnClick} >
        Hide
      </button>
      :
      <button className="cursor-pointer underline" onClick={handleOnClick}>
        Show
      </button>

      }
      {isVisible && <p>{description}</p>}
    </div>
  );
};

const Instamart = () => {
  let [visibleSection,setVisibleSection]=useState("");

  return (

    <div>
      <h1 className="text-3xl p-2 m-2 font-bold">Instamart</h1>
      <Section
        title={"About Instamart"}
        description={
          "Instamart is an online grocery delivery service by Swiggy, offering a wide range of everyday essentials such as fresh produce, dairy, snacks, beverages, and personal care items. It provides quick delivery, often within 15–30 minutes, depending on the location, with flexible delivery slots for customer convenience. Integrated within the Swiggy app, Instamart allows users to easily browse products, place orders, and track deliveries, while also offering deals and discounts to enhance the shopping experience."
        }
        isVisible={visibleSection==="about"}
        setIsVisible={()=>setVisibleSection(visibleSection=="about"?"":"about")}

      />
      <Section
        title={"Team Instamart"}
        description={
          "Team Instamart is a dynamic and dedicated group within Swiggy, focused on providing fast, efficient, and seamless grocery delivery services. Comprising experts in operations, technology, logistics, and customer service, the team works tirelessly to ensure that Instamart delivers a smooth and reliable shopping experience. They are committed to curating a wide range of high-quality products, optimizing delivery times, and continuously improving the platform to meet customer needs. With a customer-first mindset, Team Instamart strives to make grocery shopping as convenient and quick as possible."
        }
        isVisible={visibleSection==="team"}
        setIsVisible={()=>setVisibleSection(visibleSection=="team"?"":"team")}
      />
      <Section
        title={"Contact us"}
        description={
          "The Contact Us section is a dedicated channel for customers to reach out for assistance, support, or inquiries related to products and services. It provides multiple ways to get in touch, including email, phone numbers, and online forms. The team behind Contact Us is committed to resolving issues, answering queries, and ensuring customer satisfaction by offering timely and helpful responses. Whether it's for feedback, order support, or general questions, the Contact Us section is designed to provide a seamless and efficient communication experience for users."
        }
        isVisible={visibleSection==="contact"}
        setIsVisible={()=>setVisibleSection(visibleSection=="contact"?"":"contact")}
      />
    </div>
  );
};

export default Instamart;
