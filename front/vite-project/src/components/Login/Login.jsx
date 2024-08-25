import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const {register ,handleSubmit} = useForm(); 



  const loginHandle = async (data) => {
    
    try {
        const res = await axios.post('http://localhost:5000/userapi/', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.status === 200) {
            alert('Login Successful');
        } else if (res.status === 201) {
            alert('Invalid Password');
        }else if(res.status === 202)
        {
          alert("Invalid Username")
        }

    } catch (error) {
        alert("Login Error");
    }
};

  return (
    <div>
        <div className="loginContainer">
          <form action="" onSubmit={handleSubmit(loginHandle)}>
            <input type="text"  placeholder='Username' {...register("username" ,{required:"username"})}/>
            <input type="password" placeholder='Password' {...register("password" ,{required:"password"})}/>
            <p>staff</p>
            <input type="radio" value="staff"  {...register("role",{required:"staff"})} />
            <p>student</p>
            <input type="radio" value="student"   {...register("role" ,{required:"student"})}/>
          <button type='submit'>Login</button>
          </form>
        </div>
    </div>
  )
}

export default Login;