import axios from 'axios';
import React, { useState, useContext ,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './UpdateWorkshop.css';
import Sidebar from '../Sidebar/Sidebar';
import { WorkshopContext } from '../Context/workshopContext';
import UpdateWorkshopCard from '../UpdateWorkshopCard/UpdateWorkshopCard';
function UpdateWorkshop() {
    const { data } = useContext(WorkshopContext); 
    const [fData, setFData] = useState(data); 

    const { register, handleSubmit, reset } = useForm();

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

            if (res.status === 200) {
                alert('Workshop updated successfully');
                console.log('Update response:', res.data);
            } else {
                alert('Failed to update workshop');
            }

        } catch (error) {
            alert('Error updating workshop');
            console.error('Update error:', error);
        }
    };

    useEffect(() => {
        setFData(data);
    }, [data]);

    const filter = (filterElement) => {
        let filteredData = [...data];

        if (filterElement.workshopName) {
            filteredData = filteredData.filter(item => item.workshopName === filterElement.workshopName);
        }

        if (filterElement.workshopType) {
            filteredData = filteredData.filter(item => item.workshopType === filterElement.workshopType);
        }

        if (filterElement.workshopVenue) {
            filteredData = filteredData.filter(item => item.workshopVenue === filterElement.workshopVenue);
        }

        if (filterElement.workshopDate) {
            filteredData = filteredData.filter(item => item.workshopDate === filterElement.workshopDate);
        }

        setFData(filteredData);
    };

    const handleReset = () => {
        reset(); 
        setFData(data);
    };

    return (
        <div className='mainContainer'>
            <Sidebar />
            <div className="displayContainer">
                <div className="workshopContainer2">
                    <div className="containerFilter">
                        <form onSubmit={handleSubmit(filter)}>
                            <input
                                className="inputFilter"
                                type="text"
                                placeholder="Workshop Name"
                                {...register("workshopName")}
                            />

                            <label className="labelFilter">Workshop Type</label>
                            <select className="selectFilter" {...register("workshopType")}>
                                <option value="">None</option>
                                <option value="ai">AI</option>
                                <option value="cybersecurity">Cyber Security</option>
                                <option value="cloudcomputing">Cloud Computing</option>
                            </select>

                            <label className="labelFilter">Venue</label>
                            <select className="selectFilter" {...register("workshopVenue")}>
                                <option value="">None</option>
                                <option value="apj">APJ Audi</option>
                                <option value="ks">KS Audi</option>
                                <option value="b">B-Block Audi</option>
                                <option value="pg">PG-Block Audi</option>
                            </select>

                            <input
                                type="date"
                                className="dateFilter"
                                {...register("workshopDate")}
                            />

                            <button className="buttonFilter" type="submit">Filter</button>
                            <button type="button" onClick={handleReset} className="buttonFilter">Reset</button>
                        </form>
                    </div>

                    <div className="cardBundle">
                        {fData.length === 0 ? (
                            <p>No records found</p>
                        ) : (
                            fData.map((item, index) => (
                                <div key={index} className="cardContainer">
                                    <UpdateWorkshopCard item={item} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateWorkshop;
