import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../redux/inde'
axios.defaults.withCredentials = true
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:4000/api/logout", null, {
      withCredentials: true
    });
    if (res.status = 200) {
      return res
    }
    return new Error("Unable to logout")
  }
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()))
  }
  return (
    <div id="header">
      {!isLoggedIn &&<h3 id="h3head">Dobro dosli u python test</h3>}<br />
      
      {!isLoggedIn && <><button><Link to={"/login"} id="link">Login</Link></button>
        <button><Link to={"/signup"} id="link">Signup</Link></button></>}
      {isLoggedIn && <button><Link to={"/"} onClick={handleLogout} id="link">Logout</Link></button>
      }
    </div>
  )
}

export default Header