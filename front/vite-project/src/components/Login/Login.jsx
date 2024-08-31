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
            if(res.data.role === "staff")
            navigate('/addworkshop');
            else
            navigate('/studenthome')
        } else if (res.status === 201) {
            alert('Invalid Password');
        }
        else if(res.status === 202)
        {
          alert("Invalid Username")
        }

    } catch (error) {
        alert("Login Error");
    }
};

  return (
    <div>
        

        <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form action=""  className="form1" onSubmit={handleSubmit(loginHandle)}>
    <h3>Login Here</h3>
        <label className='label1' for="username">Username</label>
        <input type="text" className="input1" placeholder="Email or Phone" id="username" {...register("username" ,{required:"username"})}/>
        <label className='label1' for="password">Password</label>
        <input className='input1' type="password" placeholder="Password" id="password" {...register("password" ,{required:"password"})} />
        <button className="button1" type='submit' >Login</button>
        
    </form>
    </div>
  )
}

export default Login;