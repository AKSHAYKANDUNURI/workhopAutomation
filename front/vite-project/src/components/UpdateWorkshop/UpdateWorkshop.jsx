import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './UpdateWorkshop.css';
import Sidebar from '../Sidebar/Sidebar';

function UpdateWorkshop() {
    const { register, handleSubmit } = useForm();

    const updateWorkshop = async (workshopData) => {
        const formData = new FormData();
        formData.append("workshopAttendance", workshopData.workshopAttendance);
        formData.append('attendenceDocument', workshopData.attendenceDocument[0]);

        try {
            const res = await axios.post('http://localhost:5000/workshopapi/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            if (res) {
                console.log(res);
            }

        } catch (error) {
            alert(error);
        }
    };

    return (
<div className='mainContainer'>
      <Sidebar/>
    <div className="displayContainer">
    <div className="workshopContainer">            <form onSubmit={handleSubmit(updateWorkshop)} className="workshopForm">
                <label htmlFor="" className="workshopLabel">Attended Strength</label>
                <input
                    type="number"
                    className="workshopInput"
                    {...register('workshopAttendance', { required: "Enter Attended Strength" })}
                />
                <label htmlFor="" className="workshopLabel">Upload Attendance List</label>
                <br />
                <input
                    type="file"
                    accept='.jpg, .pdf, .png, .jpeg'
                    className="workshopInput"
                    {...register('attendenceDocument', { required: "Upload Document" })}
                />
                <br />
                <button type="submit" className="workshopButton">Update Workshop Details</button>
            </form>
        </div>
        </div>
        </div>

    );
}

export default UpdateWorkshop;
