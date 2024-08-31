import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DeleteCard.css'
function DeleteCard() {
    let { state } = useLocation();
    const navigate = useNavigate();

    const temporaryDelete = () => {
        // Your temporary delete logic here
    }

    const permanentDelete = async () => {
        try {
            const res = await axios.delete('http://localhost:5000/workshopapi/', {
                params: {
                    workshopDate: state.workshopDate,
                    workshoptime: state.workshoptime
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status === 200) {
                alert("Workshop Deleted Successfully!");
                navigate('/deleteworkshop', { replace: true });
                window.location.reload();  // This will reload the page to ensure data is refreshed
            } else {
                alert("Failed to Delete Workshop!");
            }
        } catch (error) {
            console.error("Error deleting workshop:", error);
            alert("Failed to Delete Workshop!");
        }
    };

    return (
        <div className="deleteContainer">
            <div className='deleteCard' >
                <p> Workshop Name : {state.workshopName} </p>
                <p>Workshop Type : {state.workshopType}</p>
                <p>Workshop Venue : {state.workshopVenue}</p>
                <p>Workshop Date : {state.workshopDate}</p>
                <p>Workshop Time : {state.workshoptime}</p>
                <p>Workshop Capacity : {state.workshopCapacity}</p>
                {/* <button onClick={temporaryDelete} className='deleteButton2'>Temporary Delete</button> */}
                <button onClick={permanentDelete} className='deleteButton2'>Permanent Delete</button>
            </div>
        </div>
    )
}

export default DeleteCard;
