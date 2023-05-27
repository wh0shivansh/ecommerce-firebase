import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { db, auth } from '../../firebase/config';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const SingleProduct = () => {
    const { id } = useParams();
    const [productTitle, setproductTitle] = useState("");
    const [product, setProduct] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");
    const [image, setimage] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


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

    function GetCurrentProduct(){
        useEffect(() => {
            const getProduct = async() => {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            }
            getProduct();

        }, [])
        return product
    }
    GetCurrentProduct();


    const addToCart = async() => {
        if (loggedUser) {
            addDoc(collection(db, `cart-${loggedUser[0].uid}`), {
                product,
                quantity: 1,
            }).then(async(docref) => {
                console.log("DocRef = "+docref.id);
                const ref = doc(db,`cart-${loggedUser[0].uid}`,`${docref.id}`);
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



    return (
        <div>
            <Navbar />
            {product.productTitle}
            <br />
            {product.price}
            <br />
            <button onClick={addToCart}>Add To Cart</button>
            <br />
            {product.description}
            <br />
            <img src={`${product.productImage}`} alt="" />
        </div>
    )
}

export default SingleProduct