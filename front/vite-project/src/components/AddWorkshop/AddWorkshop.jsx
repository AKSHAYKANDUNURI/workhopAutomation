import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddWorkshop.css';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

function AddWorkshop() {
  const { register, handleSubmit } = useForm();

  const createWorkshop = async (workshopData) => {
    try {
      const response = await axios.post('http://localhost:5000/workshopapi/create', workshopData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        alert('Workshop created successfully!');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Venue is already occupied at the selected time.');
      } else {
        alert('Error creating workshop.');
      }
    }
  };



  return (

    <div className='mainContainer'>
      <Sidebar/>
    <div className="displayContainer">
    <div className="workshopContainer">
      <form onSubmit={handleSubmit(createWorkshop)} className="workshopForm">
        <input
          type="text"
          placeholder="Workshop Name"
          className="workshopInput"
          {...register("workshopName", { required: "Enter Workshop Name" })}
        />
        <br />
        <label className="workshopLabel">Workshop Type</label>
        <br />
        <select className="workshopSelect" {...register("workshopType", { required: "Select Workshop Type" })}>
          <option value="">None</option>
          <option value="ai">AI</option>
          <option value="cybersecurity">Cyber Security</option>
          <option value="cloudcomputing">Cloud Computing</option>
        </select>
        <br />
        <textarea
          placeholder="Workshop Description"
          className="workshopTextarea"
          {...register("workshopDesc", { required: "Enter Workshop Description" })}
        ></textarea>
        <br />
        <label className="workshopLabel">Venue</label>
        <select className="workshopSelect" {...register("workshopVenue", { required: "Select Workshop Venue" })}>
          <option value="">None</option>
          <option value="apj">APJ Audi</option>
          <option value="ks">KS Audi</option>
          <option value="b">B-Block Audi</option>
          <option value="pg">PG-Block Audi</option>
        </select>
        <br />
        <input
          type="date"
          className="workshopInput"
          {...register("workshopDate", { required: "Enter Workshop Date" })}
        />
        <input
          type="time"
          className="workshopInput"
          {...register("workshoptime", { required: "Enter Workshop Time" })}
        />
        <br />
        <label className="workshopLabel">Capacity</label>
        <input
          type="number"
          className="workshopInput"
          {...register("workshopCapacity", { required: "Enter Workshop Capacity" })}
        />
        <br />
        <button type="submit" className="workshopButton">Add Workshop</button>
      </form>
    </div>
    </div>
    </div>

  );
}

export default AddWorkshop;
