import React from 'react'
import Navbar from '../Navbar/Navbar';
import { useState,useEffect } from 'react';
import { db,auth, storage } from '../../firebase/config';
import { collection,getDocs,query,where,doc,updateDoc, addDoc } from 'firebase/firestore';
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage';


const Dashboard = () => {
    const [productTitle,setProductTitle]=useState("");
    const [productType,setproductType]=useState("");
    const [description,setdescription]=useState("");
    const [brand,setbrand]=useState("");
    const [price,setprice]=useState("");
    const [productImage,setproductImage]=useState("");
    const [warranty,setwarranty]=useState("");
    
    
    const [imageError,setImageError]=useState("");
    const [uploadError,setupload]=useState("");
    const [successMsg,setSuccessMsg]=useState("");

    const handleAddProduct=(e)=>{
        e.preventDefault();
        const storageRef = ref(storage,`productImages_${productType.toUpperCase()}/${Date.now()}`);

        uploadBytes(storageRef,productImage).then(()=>{
            getDownloadURL(storageRef).then((url)=>{
               addDoc(collection(db,`products`),{
                productTitle,
                productType,
                description,
                brand,
                price,
                warranty,
                productImage:url,
               })
            })
        })

    }

    const types = ['image/jpg','image/jpeg','image/PNG','image/png'];
    const handleProductImage=(e)=>{
        e.preventDefault();
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile && types.includes(selectedFile.type)){
                setproductImage(selectedFile);
                setImageError("");
            }else{
                setproductImage(null);
                setImageError("Please Select Valid Image Type");
            }
        }else{
            setImageError("Please Select a file");
        }
    }

    function GetCurrentUser() {
        const [user, setUser] = useState("");
        const userCollectionRef = collection(db, "users")
    
        useEffect(() => {
          auth.onAuthStateChanged(userlogged => {
            if (userlogged) {
              const setUsers = async () => {
                const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
                const data = await getDocs(q);
                setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
              };
              setUsers();
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
        {loggedUser&&
            <div>
                <form className='add-product-form' onSubmit={handleAddProduct}>
                    <p>Add Product</p>
                    {successMsg && <div>{successMsg}</div>}
                    {imageError && <div>{imageError}</div>}
                    {uploadError && <div>{uploadError}</div>}

                    <label>Product Title: </label>
                    <input type="text" onChange={(e)=>{setProductTitle(e.target.value)}} />
                    <label>Product Type: </label>
                    <input type="text" onChange={(e)=>{setproductType(e.target.value)}} />
                    <label>Price: </label>
                    <input type="text" onChange={(e)=>{setprice(e.target.value)}} />
                    <label>Warranty: </label>    
                    <input type="text" onChange={(e)=>{setwarranty(e.target.value)}} />
                    <label>Brand: </label>
                    <input type="text" onChange={(e)=>{setbrand(e.target.value)}} />                    
                    <label>Product Image: </label>
                    <input type="file" onChange={handleProductImage} />
                    <label>Product Description: </label>
                    <textarea onChange={(e)=>{setdescription(e.target.value)}}></textarea>

                <button type='submit'>Submit</button>

                </form>
            </div>
        }
        Dashboard</div>
  )
}

export default Dashboard