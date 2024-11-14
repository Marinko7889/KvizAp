import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import React from 'react';
import Signup from "./components/Signup"
import PythonTest from "./components/PythonTest"
import Welcome from './components/Welcome';
import Header from './components/Header';
import Result from './components/Result';
import { CheckUserExist } from './helper/helper';
import { useSelector } from 'react-redux';
//import Result from "./components/Result"
function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <React.Fragment>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            {/* {isLoggedIn && */}
            {isLoggedIn && <Route path="/welcome" element={<Welcome />}></Route>
            }{/* }  */} <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {isLoggedIn && <Route path="/pythontest" element={<PythonTest />} />}
            {/* <Route path="/PythonTest" element = {<CheckUserExist><PythonTest/></CheckUserExist>}/> */}
            {isLoggedIn && <Route path="/result" element={<Result />} />
            }          </Routes>
        </main>

      </div>
    </React.Fragment>
  );
}

export default App;
