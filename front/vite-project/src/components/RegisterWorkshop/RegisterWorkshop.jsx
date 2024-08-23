import React from 'react'
import { useLocation } from 'react-router-dom'

function RegisterWorkshop() {
    const {state} = useLocation();
    const register=()=>{
        alert("registered")
    }

  return (
    <div>
       <div className="registerContainer">
                <p> Workshop Name : {state.workshopName} </p>
                <p>Workshop Type : {state.workshopType}</p>
                <p>Workshop Venue : {state.workshopVenue}</p>
                <p>Workshop Date : {state.workshopDate}</p>
                <p>Workshop Time : {state.workshoptime}</p>
                <p>Workshop Capacity : {state.workshopCapacity}</p>

               <button onClick={register}>Register</button>
            </div>
        
    </div>
  )
}

export default RegisterWorkshop