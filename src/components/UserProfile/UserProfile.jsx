import React from 'react'
import Navbar from '../Navbar/Navbar';
import { useState,useEffect } from 'react';
import { auth, db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const UserProfile = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          };
          getUsers();
        }
        else {
          setUser(null);
        }
      })
    }, [])
    return user
  }
  const loggedUser = GetCurrentUser();

  return (
    <div>
      <Navbar/>
      <div className="userprofile-outer">
        {loggedUser? <div className='userprofile'>
          <p>Your Account Details</p>

          <div className='data-row'>
            <span>Your Name </span>
            <span>{loggedUser[0].username}</span>
          </div>                  
          <div className='data-row'>
            <span>Registered Email</span>
            <span>{loggedUser[0].email}</span>
          </div>          
          <div className='data-row'>
            <span>Address</span>
            <span>{loggedUser[0].address}</span>
          </div>
        </div>:<div>Loggin First</div>}
      </div>
      </div>
  )
}

export default UserProfile