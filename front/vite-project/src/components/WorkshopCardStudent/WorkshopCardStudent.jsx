import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WorkshopCard({ item }) {
    const navigate = useNavigate();
    
    const register=()=>{
        navigate('/studenthome/registerworkshop',{state:item});

    }
  
    return (
        <div>
            <div className="cardContainer2">
                 <p> Workshop Name : {item.workshopName} </p>
                 <p>Workshop Type : {item.workshopType}</p>
                 <p>Workshop Venue : {item.workshopVenue}</p>
                 <p>Workshop Date : {item.workshopDate}</p>
                 <p>Workshop Time : {item.workshoptime}</p>
                 <p>Available Slots : {item.availableSlots}</p>
                 <button onClick={register}>Register</button>
            </div>
        </div>
    );
}

export default WorkshopCard;
