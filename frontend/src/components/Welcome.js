import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../styles/welcome.css"
import { Link } from 'react-router-dom';

axios.defaults.withCredentials=true;
let firstRender=true;
const Welcome = () => {

    
    
    const [user, setuser] = useState()
    const refreshToken=async()=>{
        const res=await axios.get("http://localhost:4000/api/refresh",{
            withCredentials:true
        }).catch(err=>console.log(err))

        const data=await res.data;
        return data;
    }
    const sendRequest=async()=>{
        const res=await axios.get("http://localhost:4000/api/user",{
            withCredentials:true
        }).catch(err=>console.log(err))

        const data=await res.data
        return data
    }
    useEffect(()=>{
        if(firstRender){
            firstRender=false;
            sendRequest().then((data)=>setuser(data.user))
        }
        let interval=setInterval(()=>{
            refreshToken().then(data=>setuser(data.user))
        },1000*28)
        return ()=>clearInterval(interval)
    },[])
  return (
    <div className='container'>
        <h1 className='title text-light'>Dobrodošao u PythonTest {user && <h3>{user.name}</h3>}</h1>
        
        <ol>
            <li>Test se sastoji od 10pitanja</li>
            <li>Svako pitanje ima 3 opcije</li>
            <li>Mogu se minjat odgovori prije nego se zavrsi kviz</li>
            <li>Rezultat ce biti vidljiv na kraju kviza</li>
        </ol>
        
        <div className='start'>
            <Link id="link" className="btn" to="/pythontest">Start</Link>
        </div>
    </div>
  )
}

export default Welcome