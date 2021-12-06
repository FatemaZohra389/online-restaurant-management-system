import React from "react";
import './Signup.css';

const Signup = () =>{
    
    
    return (
        <div className="container">
            <div className="app-wrapper">
<div>

<h2 className="title" >Create Account</h2>

</div>
<form className="from-wrapper">
<div className="name">
    <label className="label">User name</label>
    <input 
    className="input" 
    type="text" 
    name="username"
    
    
    />
    </div>
    <div className="password">
    <label className="label">Password</label>
    <input 
    className="input"
    type="text" 
    name="password" 
    
    />
    
    </div>
<div className="confirm-password">
    <label className="label">Confirm-password</label>
    <input className="input" 
    type="text"  
    name="confirm-password" 
  
    />
    
    </div>
    
<div>
    <button className="submit" >Sign up</button>
</div>
  

 </form>
</div>
            </div>
       

    )


}
export default Signup;