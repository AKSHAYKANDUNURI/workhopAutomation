import React, { createContext, useState, useEffect, Children } from 'react';
import axios from 'axios';


export const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
    const [data , setData] =useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/workshopapi/')
          .then(res => {
            const initialData = res.data.payload;
            setData(initialData);
          })
          .catch(error => {
            console.error('Error fetching initial data:', error);
          });
      }, []);

  return (
    <div>
        <WorkshopContext.Provider value = {{data,setData}}>
            {children}
        </WorkshopContext.Provider>
    </div>
  )
}



