import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/inde'


const Login = () => {
    const dispatch=useDispatch();
    const history=useNavigate();
    const [inputs, setinputs] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState("");
    const handleChange=(e)=>{
        setinputs(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const sendRequest=async()=>{
        try{
            const res=await axios.post("http://localhost:4000/api/login",{
                email:inputs.email,
                password:inputs.password
            }).catch(err=>console.log(err))
    
            const data=await res.data;
            return data;
        }catch(error){
            console.log(error);
            throw error;
        }
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
          .then((data) => {
            try{
                if (data.message!="SUcesfully logged in") {
                    throw new Error(data.message);
                               
                } else {
                    try{
                        dispatch(authActions.login());
                        history("/welcome"); 
                    }catch(err){
                        console.log(err)
                    }
                      
                }
            }catch(err){
                console.log(err)
            }
            
          })
          .catch((error) => {
            console.log(error.message);
            setError(error.message);
          });
      };
  return (
    <div id="a" data-testid="loginDiv">
        <form onSubmit={handleSubmit} id="formaLogin">
            <h1 id="prijava">Prijavi se</h1>
            <input id="inputi" onChange={handleChange} name="email" value={inputs.email} placeholder='email' type="email"></input><br/>
            <input id="inputi" onChange={handleChange} name="password" value={inputs.password} placeholder='password' type="password"></input><br/>
            <button type="submit" id="link">Login</button>
            {error && <p>Krivo upisana lozinka</p>} {/* Prikazivanje poruke o grešci */}

        </form>
    </div>
  )
}

export default Login