import React from 'react'
import {useForm } from 'react-hook-form'

function UpdateWorkshop() {
    const {register , handleSubmit} =useForm();
    const updateWorkshop=(updateData)=>{
        console,console.log(updateData);
        
        
    }
  return (
    <div>
        <div className="container">
            <form action="" onSubmit={handleSubmit(updateWorkshop)}>
                <label htmlFor="">Attended Strength</label>
                <input type="number" 
                {...register('workshopAttendance', {required:"Enter Attended Strength"})} />
                <label htmlFor="">Upload Attendance List </label>
                <br />
                <input type="file" accept='.jpg , .pdf , .png , .jpeg '
                {...register('attendenceDocument', {required:"Upload Document"})} />
                <br />
                <button type='submit'> Update Workshop Details</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateWorkshop