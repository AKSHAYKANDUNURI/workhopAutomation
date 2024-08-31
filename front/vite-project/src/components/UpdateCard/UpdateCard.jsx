import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateCard() {
    let { state } = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const update = async (workshopData) => {
        const formData = new FormData();
        formData.append("workshopAttendance", workshopData.workshopAttendance);
        formData.append("_id", state._id);

        // Check if a file is selected before appending to formData
        if (workshopData.attendenceDocument && workshopData.attendenceDocument.length > 0) {
            formData.append('attendenceDocument', workshopData.attendenceDocument[0]);
        } else {
            alert("Please upload an attendance document.");
            return; // Stop the function if no file is selected
        }

        try {
            const res = await axios.post('http://localhost:5000/workshopapi/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            if (res.status === 200) {
                alert('Workshop updated successfully');
                console.log('Update response:', res.data);
                navigate('/updateworkshop');
                window.location.reload()
            } else {
                alert('Failed to update workshop');
            }

        } catch (error) {
            alert('Error updating workshop');
            console.error('Update error:', error);
        }
    };

    return (
       <div className="deleteContainer">
         <div className="deleteCard">
            <p>Workshop Name: {state.workshopName}</p>
            <p>Workshop Type: {state.workshopType}</p>
            <p>Workshop Venue: {state.workshopVenue}</p>
            <p>Workshop Date: {state.workshopDate}</p>
            <p>Workshop Time: {state.workshoptime}</p>
            <p>Workshop Capacity: {state.workshopCapacity}</p>
            {state.updated == 1 ? (
                <p>Updated</p>
               
            ) : (
                <form onSubmit={handleSubmit(update)}>
                <div className='combo'><p>Attended Strength</p>
                <input type="number"  className='input'{...register("workshopAttendance", { required: 'Attendance is required' })} /></div>
                <p>Upload Attendance List</p>
                <input type="file" className ="uploadInput" accept='.jpg,.pdf,.jpeg,.png' {...register("attendenceDocument", { required: 'Attendance document is required' })} />
                <button type='submit' className='updateButton'>Update</button>
            </form>
            )}
        </div>
       </div>
    );
}

export default UpdateCard;
