import React, { useState } from 'react';
import './ProductCard.css';
import {Link} from 'react-router-dom';
import { addDoc,collection,doc ,updateDoc} from 'firebase/firestore';
import { db } from '../../firebase/config';

const ProductCard = (props) => {
  const [successMsg,setSuccessMsg] = useState('');
  const [errorMsg,setErrorMsg] = useState('');
  // console.log("PROPS = "+props.user);
  // console.log("PROPS = "+props.text);
  // console.log("PROPS = "+props.product.productImage);
  const loggedUser = props.user;
  const productFirebase = props.product;
  
  const addToCart = async() => {
    if (loggedUser) {
        addDoc(collection(db, `cart-${loggedUser}`), {
            product:productFirebase,
            quantity: 1,
        }).then(async(docref) => {
            console.log("DocRef = "+docref.id);
            const ref = doc(db,`cart-${loggedUser}`,`${docref.id}`);
            await updateDoc(ref,{
                id:docref.id
            }).then(()=>{
                console.log("Data added to cart")
            })
            setSuccessMsg("Product added to cart")
        }).catch((error) => {
            setErrorMsg(error.message);
        })
    } else {
        setErrorMsg("You need to login first");
    }
}

  let mrp = parseInt(props.product.price);

  return (
    <div className='product-card'>
      {/* <Link to={`/product/${product.product.id}`}><div className="pcard-title">

        {product.product.productTitle}
      </div></Link> */}
      <div className="pcard-img">
        <img src={`${props.product.productImage}`} alt="" />
      </div>
        <div className="pcard-title">
{props.product.productTitle}

        </div>  
        <div className="pcard-price">
        Rs.&nbsp;{props.product.price}

        </div>
        <div className="pcard-buttons">

        <button>Buy Now</button>
        <button onClick={addToCart}>Add To Cart</button>
        </div>

    </div>
  )
}
export default ProductCard