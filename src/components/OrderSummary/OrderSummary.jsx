import React, { useState ,useEffect} from 'react';
import { db,auth } from '../../firebase/config';
import { collection,getDoc,where,query,getDocs ,doc} from 'firebase/firestore';

const OrderSummary = () => {
    const [isAddress,setIsAddress]=useState(false);
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
        {loggedUser[0].address == ""&&
            <div>Address Page</div>
        }        
        {loggedUser[0].address != ""&&
            <div>Order Summary Page</div>
        }
        
    </div>
  )
}

export default OrderSummary