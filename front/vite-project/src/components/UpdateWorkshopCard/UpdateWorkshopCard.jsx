import React from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateWorkshopCard({ item }) {
    const navigate = useNavigate();
    const handleUpdate=()=>{
        navigate(`/updateworkshop/${item.workshopName}` ,{state : item});
    }
    return (
        <div>
            <div className="cardContainer2">
               <p> Workshop Name : {item.workshopName} </p>
               <p>Workshop Type : {item.workshopType}</p>
                 <p>Workshop Venue : {item.workshopVenue}</p>
                 <p>Workshop Date : {item.workshopDate}</p>
                 <p>Workshop Time : {item.workshoptime}</p>
                 <p>Workshop Capacity : {item.workshopCapacity}</p>
                 <button onClick={handleUpdate} className='deleteButton'>Update</button>
            </div>
        </div>
    );
}

export default UpdateWorkshopCard;
