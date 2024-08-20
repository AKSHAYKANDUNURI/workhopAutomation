import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddWorkshop.css';

function AddWorkshop() {
  const { register, handleSubmit } = useForm();

  const createWorkshop = async (workshopData) => {
    try {
      const response = await axios.post('http://localhost:5000/workshopapi/create', workshopData, {
        headers: {
          'Content-Type': 'application/json',
        },
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
    <div className="container">
      <form onSubmit={handleSubmit(createWorkshop)}>
        <input
          type="text"
          placeholder="Workshop Name"
          {...register("workshopName", { required: "Enter Workshop Name" })}
        />
        <br />
        <label>Workshop Type</label>
        <br />
        <select {...register("workshopType", { required: "Select Workshop Type" })}>
          <option value="">None</option>
          <option value="ai">AI</option>
          <option value="cybersecurity">Cyber Security</option>
          <option value="cloudcomputing">Cloud Computing</option>
        </select>
        <br />
        <textarea
          placeholder="Workshop Description"
          {...register("workshopDesc", { required: "Enter Workshop Description" })}
        ></textarea>
        <br />
        <label>Venue</label>
        <select {...register("workshopVenue", { required: "Select Workshop Venue" })}>
          <option value="">None</option>
          <option value="apj">APJ Audi</option>
          <option value="ks">KS Audi</option>
          <option value="b">B-Block Audi</option>
          <option value="pg">PG-Block Audi</option>
        </select>
        <br />
        <input
          type="date"
          {...register("workshopDate", { required: "Enter Workshop Date" })}
        />
        <input
          type="time"
          {...register("workshoptime", { required: "Enter Workshop Time" })}
        />
        <br />
        <label>Capacity</label>
        <input
          type="number"
          {...register("workshopCapacity", { required: "Enter Workshop Capacity" })}
        />
        <br />
        <button type="submit">Add Workshop</button>
      </form>
    </div>
  );
}

export default AddWorkshop;
