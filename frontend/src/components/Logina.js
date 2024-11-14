import React from 'react'

// function logon({}){
//     return (
//         <div>
//             <input data-testid="inputi1" name="email" placeholder='email'></input>
//             <input data-testid="inputi2" name="password" placeholder='password'></input>
//             <button data-testid="todo-2">Prijava</button>
//         </div>
        

//         )
// }
// export default logon;

export const Logon = () => {
    return (
                <div>
                    <input data-testid="inputi1" name="email" placeholder='email'></input>
                    <input data-testid="inputi2" name="password" placeholder='password'></input>
                    <button data-testid="botunP">Prijava</button>
                </div>
                
        
                )
}
//export default logon

export const Signu = () => {
    return (
                <div>
                    <h1 data-testid="prijava">Registriraj se</h1>
                    <input data-testid="inputi1" name="name" placeholder='name'></input>
                    <input data-testid="inputi2" name="email" placeholder='email'></input>
                    <input data-testid="inputi3" name="password" placeholder='password'></input>
                    <button data-testid="SignupB">Registriraj se</button>
                </div>
                
        
        )
}

export const Heade=()=>{
    return (
    <div>
      <h3 data-testid="header">Dobro dosli u python test</h3><br />
      
      <button data-testid="login">Login</button>
      <button data-testid="signup">Signup</button>
      <button data-testid="logout">Logout</button>
      
    </div>
    )
}

export const Welcom=()=>{
    return (
        <div>
            <h1 data-testid="header">Dobrodošao u PythonTest</h1>
            
            <ol data-testid="lista">
                <li>Test se sastoji od 10pitanja</li>
                <li>Svako pitanje ima 3 opcije</li>
                <li>Mogu se minjat odgovori prije nego se zavrsi kviz</li>
                <li>Rezultat ce biti vidljiv na kraju kviza</li>
            </ol>
            <form id="form">
            </form>
            <div className='start'>
                {/* <Link id="link" className="btn" to="/pythontest" onClick={startTest}>Start</Link> */}
            </div>
        </div>
      )
}

export const Resul=()=>{
    return (
        <div className='container'>
            <h1 className='title text-light'>Python test</h1>
    
            <div className='result flex-center'>
                <div className='flex'>
                    <span>Total points</span>
                    <span className='bold'>totalPoints</span>
                </div>
                <div className='flex'>
                    <span>Total questions</span>
                    <span className='bold'>total questions</span>
                </div>
                <div className='flex'>
                    <span>Total Attempts</span>
                    <span className='bold'>Attempts</span>
                </div>
                <div className='flex'>
                    <span >Total earn points</span>
                    <span className='bold'>total earn points</span>
                </div>
                <div className='flex'>
                    <span data-testid="result">Test result</span>
                    <span className='bold'>passed</span>
                </div>
            </div>
    
            <div className='start'>
                <button>Restart</button>
            </div>
            
        </div>
      )
}