import React from 'react'
import { useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const create=()=>{
    navigate('./addworkshop');

  }
  const update=()=>{
    navigate('./updateworkshop');

  } 
  const deletes =()=>{
    navigate('./deleteworkshop');

  }
  return (
    <div>
        <h1>Login Page</h1>
        <button onClick={create}>Create WorkShop</button>
        <button onClick={update}>Update WorkShop</button>
        <button onClick={deletes}>Delete WorkShop</button>


    </div>
  )
}

export default Login;