import React from "react";
import { ALL_PRODUCTS } from "../assets/API";
import { useQuery } from "@apollo/client";
export default function DashBoard () {
 
    const { loading, error, data } = useQuery(ALL_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <div>
        dashBoard
        {data.category.products.map(({name,brand},index) => (
          <div key={index}>
            <p>
              {name}: {brand}
            </p>
          </div>
        ))}
      </div>
    );
  
}
