import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom'

function DeleteCard() {
    let {state} =useLocation();
    const temporaryDelete=()=>{
        
    }

    const permanentDelete=()=>{
        
        const res = axios.delete(`http://localhost:5000/workshopapi/${state}`)

    }

  return (
    <div>
        <div className="deleteContainer">
                 <p> Workshop Name : {state.workshopName} </p>
                 <p>Workshop Type : {state.workshopType}</p>
                 <p>Workshop Venue : {state.workshopVenue}</p>
                 <p>Workshop Date : {state.workshopDate}</p>
                 <p>Workshop Time : {state.workshoptime}</p>
                 <p>Workshop Capacity : {state.workshopCapacity}</p>
                 <button onClick={temporaryDelete} className='deleteButton2'>Temporary Delete</button>
                 <button onClick={permanentDelete} className='deleteButton2'>Permanent Delete</button>

        </div>
    </div>
  )
}

export default DeleteCard