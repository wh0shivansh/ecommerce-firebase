import React, { useEffect, useState } from 'react';
import './CartCard.css';
import { db } from '../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash';

const CartCard = (props) => {


    const [productQuantity, setProductQuantity] = useState(props.items.quantity);

    const increaseQuantity = () => {
        if (productQuantity > 0) { setProductQuantity(productQuantity + 1) };
    }
    const decreaseQuantity = () => {
        if (productQuantity > 1) { setProductQuantity(productQuantity - 1) };
    }
    const deleteCartItem = async () => {
        await deleteDoc(doc(db, `cart-${props.userid}`, `${props.items.id}`))
            .then(() => {
                console.log("doc deleted");
            })
    }
    return (
        <div className='cart-card'>
            <div className='cart-cont-1'>
                <div className="prod-img">
                    <img src={`${props.items.product.productImage}`} alt="" />
                </div>
            </div>

            <div className="cart-cont-2">
                <div className="prod-title">
                    {props.items.product.productTitle}
                </div>
                <div className="quantity-box">
                    <button onClick={decreaseQuantity}>-</button>
                    <div className="prod-quantity">
                    {productQuantity}
                    </div>
                    <button onClick={increaseQuantity}>+</button>
                </div>
            </div>

            <div className="cart-cont-3">
                <div className="deletefromcart">
                    <button onClick={deleteCartItem}><DeleteIcon/></button>
                </div>
                <div className='prod-price' />
                Rs. {`${productQuantity * props.items.product.price}`}
                <div />
            </div>

        </div>
    )
}

export default CartCard