import React from 'react'
import Navbar from '../Navbar/Navbar'
import {db,auth} from '../../firebase/config';
import { useState,useEffect } from 'react';
import { collection,getDocs,where,query} from 'firebase/firestore';
import CartCard from '../CartCard/CartCard';
import { Link, useParams } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems,setcartItems] = useState([]);
  const [subtotal,setsubtotal] = useState(0);
  const {id} = useParams();
  // console.log(id);
  
  if(id){
    const getCartData = async()=>{
      const cartArray=[];
      const path = `cart-${id}`;
      await getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          cartArray.push({...doc.data(),doc:id})
        });
        setcartItems(cartArray);
      }).catch("Error");
    }
    getCartData();
  }
  // console.log(cartItems)

  return (
    <div className='cart'>
        {/* <Navbar/>  */}
        <div className="cart-title">
          <br />
          cart
        </div>
          <br />
        <div className="cart-container">
        {cartItems.map((item)=>(
          <CartCard
          key={item.id
}          
items={item}
userid={id}
          />
        ))}

        <div className="sub-total">
          Subtotal : 
        </div>

        </div>
            <div className="cart-checkout">

        <Link to={"/ordersummary"}><button>Checkout</button></Link>
            </div>

    </div>
  )
}

export default Cart