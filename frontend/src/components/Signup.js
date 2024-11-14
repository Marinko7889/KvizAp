import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const history=useNavigate();
    const [inputs, setinputs] = useState({
        name:"",
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        setinputs(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    // const sendRequest=async()=>{
    //     const res=await axios.post("http://localhost:4000/api/signup",{
    //         name:inputs.name,
    //         email:inputs.email,
    //         password:inputs.password
    //     }).catch(err=>console.log(err))

    //     const data=await res.data;
    //     return data;
    // }
    const sendRequest = async () => {
        try {
          const res = await axios.post("http://localhost:4000/api/signup", {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
          });
      
          const data = res.data;
          return data;
        } catch (error) {
          console.log(error.response);
          if (error.response && error.response.data && error.response.data.message) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Dogodila se greška prilikom registracije.");
          }
          throw error;
        }
      };
    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     console.log(inputs)
    //     sendRequest().then(()=>history("/login"))
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
          .then(() => {
            setErrorMessage("");
            history("/login");
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
  return (
    <div id="a">
        
        <form onSubmit={handleSubmit} id="formaLogin">
        <h1 id="prijava">Registriraj se</h1>
            <input id="inputi" onChange={handleChange} name="name" value={inputs.name} placeholder='name' type="name"></input><br/>
            <input id="inputi" onChange={handleChange} name="email" value={inputs.email} placeholder='email' type="email"></input><br/>
            <input id="inputi" onChange={handleChange} name="password" value={inputs.password} placeholder='password' type="password"></input><br/>
            <button id="link" type="submit">Signup</button>
            {errorMessage && <p>Krivo uneseni podaci ili korisnik vec postoji</p>}
        </form>
    </div>
  )
}

export default Signup