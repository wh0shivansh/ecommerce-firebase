import React from 'react';
import { useState,useEffect } from 'react';
import { collection,query,onSnapshot,getDocs, where } from 'firebase/firestore';
import {db} from "../../firebase/config";
import ProductCard from '../ProductsCard/ProductCard';
import { auth } from '../../firebase/config';
import './Products.css'

const Products = () => {

  
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

  const [products,setProducts] = useState([]);

  useEffect(()=>{
    const getProducts=()=>{
      const productsList = [];
      const path = `products-MOBILE`;

      getDocs(collection(db,"products")).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          productsList.push({...doc.data(),id:doc.id})
        })
        setProducts(productsList);
      }).catch((error)=>{
        console.log(error.message);
      })
    }
    getProducts();
  },[])
  console.log(products);


  return (
    <div className='products' style={{display:"flex"}}>
      <div className="products-title">
        New Arrivals
      </div>
      <div className="all-products">

      {products.map((product)=>(
        <ProductCard 
          key={product.id}
          product={product}
          user={loggedUser?loggedUser[0].uid:""}
          text={"hi"}
        />
      ))}
      </div>
    </div>
  );
}

export default Products