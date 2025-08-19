import React from 'react'
import { NavLink } from 'react-router-dom'

function Login() {
  return (
    <div>
      <span className="formPanel">
        <form className="form" action="">
          <h2 className='text-5xl m-5'>Log in</h2>
          
          <div className="input-group input-user">
            <input type="text" name="username" id="username" required />
            <label htmlFor="username">Username</label>
          </div>

          <div className="input-group input-pass">
            <input type="password" name="password" id="password" required />
            <label htmlFor="password">Password</label>
          </div>

          <span class="register-text">Not registered yet? <a href="#">Click <span class="here-text">Here!</span></a></span>


          <nav className="buttons">
            <button type="submit" className="logInBtn">Log In</button>
          <NavLink to="/"><button type="button" className="closeModal">Go back</button></NavLink>  
          </nav>
        </form>
      </span>
    </div>
  )
}

export default Login
