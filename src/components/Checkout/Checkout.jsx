import React, { useEffect } from 'react';
import './Checkout.css';

const Checkout = (items) => {

    const closeCheckout=()=>{
        const checkout = document.getElementById('checkout');
        checkout.style.display="none";
    }

    useEffect(()=>{
        items.items.map((item)=>(
            console.log(item.product.price)
        ))
    },[])
    return (
        <div className='checkout'id='checkout' onClick={closeCheckout}>
            <div className="checkout-container">
                <div className="checkout-top">
                    <div className="logo">Drip</div>
                    <div className="cross-rounded">X</div>
                </div>
                <div className="checkout-middle">
                    <div className="checkout-left"></div>
                    <div className="checkout-right">
                        <div className="ordersummary">Order Summary ^</div>
                        <div className="ordersummary-box">
                            <div className="products-window">
                                {items.items.map((item)=>(
                                    <div className="c-prod" key={item.id}>
                                        <div className="c-img">
                                            <img src={`${item.product.productImage}`} alt="" />
                                        </div>
                                        <div className="c-otherinfo">
                                            <div className="c-title">{item.product.productTitle}</div>
                                            <div className="c-qunatity">Quantity: {item.quantity}</div>
                                            <div className="c-price">Price: Rs.{item.product.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="subtotal-window">
                                <span>Subtotal</span>
                                <span></span>
                            </div>
                            <div className="shipping-window">
                                <span>Shipping</span>
                                <span></span>
                            </div>
                            <div className="topay-window">
                                <span>To Pay</span>
                                <span></span>
                            </div>
                        </div>
                        <div className="discount">
                            <input type="text" placeholder='Discount Code'/>
                        </div>
                    </div>
                </div>
                <div className="checkout-bottom"></div>

            </div>
        </div>
    )
}

export default Checkout