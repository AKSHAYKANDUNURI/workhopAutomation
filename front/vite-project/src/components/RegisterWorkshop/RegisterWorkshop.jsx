import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RegisterWorkshop() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [hallTicket, setHallTicket] = useState('');

    const register = async (e) => {
        e.preventDefault();

        try {
            const data = {
                ...state,
                hallTicket: hallTicket,
            };

            const res = await axios.put('http://localhost:5000/workshopapi/register', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (res.status === 200) {
                alert('Registration Successful!!');
                navigate('/studenthome', { replace: true });
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Already Registered !!');
            } else {
                console.log("Registration Failed!!", error);
                alert('Registration Failed!! Please try again later.');
            }
        }
    };

    return (
        <div>
            <div className="registerContainer">
                <p>Workshop Name: {state.workshopName}</p>
                <p>Workshop Type: {state.workshopType}</p>
                <p>Workshop Venue: {state.workshopVenue}</p>
                <p>Workshop Date: {state.workshopDate}</p>
                <p>Workshop Time: {state.workshoptime}</p>
                <p>Available Slots: {state.availableSlots}</p>

                {state.workshopCapacity > 0 ? (
                    <form onSubmit={register}>
                        <input 
                            type="text" 
                            placeholder="Hall Ticket Number" 
                            value={hallTicket} 
                            onChange={(e) => setHallTicket(e.target.value)} 
                            required
                        />
                        <button type="submit">Register</button>
                    </form>
                ) : (
                    <p>Registrations Ended</p>
                )}
            </div>
        </div>
    );
}

export default RegisterWorkshop;
