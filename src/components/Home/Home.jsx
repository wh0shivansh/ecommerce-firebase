import React, { useEffect, useState } from 'react'
import Banner from '../Banner';
import { auth, db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Products from '../Products/Products';
import SpecialNavbar from '../SpecialNavBar/SpecialNavbar';


const Home = () => {

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
  console.log(loggedUser);
  // if(loggedUser){

  // }


  return (
    <div>
      <SpecialNavbar/>
      <Banner />
      <Products/>
    </div>
  )
}

export default Home