import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth,db} from '../../firebase/config';
import {collection,addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Register.css';


const Register = () => {
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [mobilenumber,setMobileNumber] = useState("");
  const [address,setAddress] = useState("");
  
  const navigate = useNavigate();
  const [errorMsg,setErrorMsg] = useState("");
  const [successMsg,setSuccessMsg] = useState("");


  const handleSubmit=(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
      const user = userCredentials.user;
      const initialCartValue=0;
      console.log(user);

      addDoc(collection(db,"users"),{
        username:userName,
        email:email,
        password:password,
        cart:initialCartValue,
        address:address,
        uid:user.uid
      }).then(()=>{
        setSuccessMsg("Registered Successfully!");
        setAddress("");
        setUserName("");
        setPassword("");
        setEmail("");
        setMobileNumber("");
        setErrorMsg("");

        setTimeout(() => {
            setSuccessMsg("");
            navigate('/login');
        }, 1000);
      })
      .catch((error)=>{setErrorMsg(error.message)});
    })
    .catch((error)=>{
      if(error.message=='Firebase: Error (auth/invalid-email).'){
        setErrorMsg("Fill all the required field");
      }
    })
  }

  return (
    <div className='signup'>
      <Navbar/>
      <br />
      <br />
      <br />
      <br />
      <div className="signup-container" >
        <form className="signup-form" onSubmit={handleSubmit}>
          <p>Create Account</p>

          {successMsg&&<>
          <div className='success-msg'>
              {successMsg}
            </div></>}  
            {errorMsg&&<>
          <div className='success-msg'>
              {errorMsg}
            </div></>}

          <label htmlFor="">Your Name</label>
          <input onChange={(e)=>setUserName(e.target.value)} type="text" />
          <label htmlFor="">Mobile Number</label>
          <input onChange={(e)=>setMobileNumber(e.target.value)} type="tel"  />
          <label htmlFor="">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" />
          <label htmlFor="">Password</label>
          <input onChange={(e)=>setPassword(e.target.value)} type="password"  />
          <label htmlFor="">Address</label>
         <textarea onChange={(e)=>setAddress(e.target.value)} ></textarea>
         <button type='submit'className='submit-btn'>Sign Up</button>
        <div>
          <span className='switch-login-signup'>Already have an account?</span>
          <Link to="/login" className='switch-btn' >Sign In</Link>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Register