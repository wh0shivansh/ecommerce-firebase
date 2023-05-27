import React ,{useEffect,useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SpecialNavbar.css';
import {signOut} from 'firebase/auth'
import { auth, db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import HomeIcon from '../../Assets/hut.png';
import ProfileIcon from '../../Assets/user.png';
import HeartIcon from '../../Assets/heart.png';
import CartIcon from '../../Assets/cart.png';
import MenuIcon from '../../Assets/menu.png';
import Cart from '../Cart/Cart';
import CartCard from '../CartCard/CartCard';
import Checkout from '../Checkout/Checkout';


const SpecialNavbar = () => {
  const [sisDark,ssetisDark] = useState(false);
  const [subtotal,setsubtotal] = useState(0);

  const [cartItems,setcartItems] = useState([]);
  // console.log(id);
  


  const closeCart=()=>{
    const cart = document.getElementById('cart');
    const cartOverlay = document.getElementById('cart-overlay');
    cart.classList.add('cart-close');
    cart.classList.remove('cart-main');
    cartOverlay.classList.remove('cart-overlay');
    cartOverlay.classList.add('display-none');
  }  
  const openSidebar=()=>{
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    sidebar.classList.add('sidebar-main');
    sidebar.classList.remove('sidebar-close');    
    sidebarOverlay.classList.add('sidebar-overlay');
    sidebarOverlay.classList.remove('display-none');
  }
   const closeSidebar=()=>{
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    sidebar.classList.add('sidebar-close');
    sidebar.classList.remove('sidebar-main');
    sidebarOverlay.classList.remove('sidebar-overlay');
    sidebarOverlay.classList.add('display-none');
  }  
  
  const openCart=()=>{
    const cart = document.getElementById('cart');
    const cartOverlay = document.getElementById('cart-overlay');
    cart.classList.add('cart-main');
    cart.classList.remove('cart-close');    
    cartOverlay.classList.add('cart-overlay');
    cartOverlay.classList.remove('display-none');
  }
  
  

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



useEffect(()=>{
  if(loggedUser){
    const getCartData = async()=>{
      const cartArray=[];
      const path = `cart-${loggedUser[0].uid}`;
      await getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          cartArray.push({...doc.data(),doc:loggedUser[0].uid})
        });
        setcartItems(cartArray);
      }).catch("Error");
    }
    getCartData();
  }
})


  const navigate = useNavigate();

  const logOut=()=>{
    auth.signOut().then(()=>{
      navigate('/login');
    })
  }

  const [cartdata,setCartData] = useState([]);
  if(loggedUser){
    const getcartData=async()=>{
      const cartArray=[];
      const path = `cart-${loggedUser[0].uid}`
      getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          cartArray.push({...doc.data(),id:doc.id})
        });
        setCartData(cartArray);
      }).catch("Error");
    }
    getcartData();
  }

  useEffect(()=>{
    var total =0;
    for(let i=0;i<cartItems.length;i++){
      total=total+parseInt(cartItems[i].product.price);
    }
    setsubtotal(total);
  })


  return (
    <>
    {!loggedUser&&
      <div id='navbar' className='snav'>
        <div className="snav-hamburger snav-items" onClick={openSidebar}>
          <img src={MenuIcon}  className={`${sisDark?'sbtn-black':'simg-btn'}`}alt="" />

          <div className="sidebar-close" id='sidebar'>
    <div className="sidebar-top">
      <div className="userstate">
      <Link to={"/login"}></Link>    
         <button className='userstate-btn'>login</button>
      </div>
      <div className="close-sidebar" onClick={closeSidebar}>X</div>
    </div>
    <div className="sidebar-items">
      <div className="sidebar-item item1">download app</div>
      <div className="sidebar-item item2">track order</div>
      <div className="sidebar-item item3">place a return request</div>
      <div className="sidebar-item item4">customer support</div>
    </div>
    <div className="sidebar-bottom">
     <div className="row">
     <div className="icon fb-icon"></div>
      <div className="icon insta-icon"></div>
      <div className="icon yt-icon"></div>
     </div>     
     <div className="row">
     <div className="icon pinterest-icon"></div>
      <div className="icon linkedin-icon"></div>
      <div className="icon main-icon"></div>
     </div>

    </div>
  </div>
</div>



        <div className={`snav-title snav-item ${sisDark?'stext-black':''}`}>
          The Drip
        </div>



        <div className="snav-links snav-items">
        <Link to={"/"}><div className={`snav-btn`}>
            <img src={HomeIcon} className={`${sisDark?'sbtn-black':'simg-btn'}`} alt="" />
          </div></Link>
        <Link to={"/register"}><div className='snav-btn'>
            <img src={ProfileIcon} className={`${sisDark?'sbtn-black':'simg-btn'}`}  alt="" />
          </div></Link>        
          <Link to={"#"}><div className='snav-btn'>
            <img src={HeartIcon}  className={`${sisDark?'sbtn-black':'simg-btn'}`}alt="" />
          </div></Link>
        {/* <Link to={`/error`}>
          <div className="snav-btn">
            <img src={CartIcon} className={`${sisDark?'sbtn-black':'simg-btn'}`} alt="" />
            <span className='scart-quantity'>{cartdata!=""?cartdata.length:'0'}</span>
          </div>
        </Link> */}
        <span style={{width:'1.5rem'}}></span>
        </div>
      </div>
}
{loggedUser&&
<div id='navbar' className='snav'>
<div className="snav-hamburger snav-items" onClick={openSidebar}>
  <img src={MenuIcon}  className={`${sisDark?'sbtn-black':'simg-btn'}`}alt="" />



  <div className="sidebar-close" id='sidebar'>
    <div className="sidebar-top">
      <div className="userstate">
      <Link to={"/"}></Link>    
         <button onClick={logOut} className='logout-btn userstate-btn'>Logout</button>
      </div>
      <div className="close-sidebar" onClick={closeSidebar}>X</div>
    </div>
    <div className="sidebar-items">
      <div className="sidebar-item item1">download app</div>
      <div className="sidebar-item item2">track order</div>
      <div className="sidebar-item item3">place a return request</div>
      <div className="sidebar-item item4">customer support</div>
    </div>
    <div className="sidebar-bottom">
     <div className="row">
     <div className="icon fb-icon"></div>
      <div className="icon insta-icon"></div>
      <div className="icon yt-icon"></div>
     </div>     
     <div className="row">
     <div className="icon pinterest-icon"></div>
      <div className="icon linkedin-icon"></div>
      <div className="icon main-icon"></div>
     </div>

    </div>
  </div>
</div>



<div className={`snav-title snav-item ${sisDark?'stext-black':''}`}>
  The Drip
</div>



<div className="snav-links snav-items">
{loggedUser[0].email == "admin@admin.com"?
         <Link to={"/dashboard"}><button>Dashboard</button></Link>:<div></div>}
<Link to={"/"}><div className={`snav-btn`}>
    <img src={HomeIcon} className={`${sisDark?'sbtn-black':'simg-btn'}`} alt="" />
  </div></Link>
<Link to={"/register"}><div className='snav-btn'>
    <img src={ProfileIcon} className={`${sisDark?'sbtn-black':'simg-btn'}`}  alt="" />
  </div></Link>
  <Link to={"#"}><div className='snav-btn'>
    <img src={HeartIcon}  className={`${sisDark?'sbtn-black':'simg-btn'}`}alt="" />
  </div></Link>
{/* <Link to={`/cart/${loggedUser[0].uid}/`}> */}
  <div className="snav-btn" onClick={openCart}>
    <img src={CartIcon} className={`${sisDark?'sbtn-black':'simg-btn'}`} alt="" />
    <span className='scart-quantity'>{cartdata!=""?cartdata.length:'0'}</span>
  </div>
{/* </Link> */}
<div className="display-none" id='cart-overlay' onClick={closeCart}></div>
<div className="display-none" id='sidebar-overlay' onClick={closeSidebar}></div>
<div className='cart-close' id='cart'>
  <span className='cart-top'>  <div className="cross-btn" onClick={closeCart}>X</div>
  <div className="cart-title">
          cart
        </div></span>
          <br />
          <br />

        <div className="cart-container">
        {cartItems.map((item)=>(
          <CartCard
          key={item.id
}          
items={item}
userid={loggedUser[0].uid}
          />
        ))}

        </div>
        <div className="sub-total">
          SubTotal : Rs. {subtotal?subtotal:"xxx"}
        </div>
            <div className="cart-checkout">

        <Link to={"/ordersummary"}><button>Checkout</button></Link>
            </div>
</div>  
<div className="checkout-func">

            <Checkout items={cartItems}/>
</div>


<span style={{width:'1.5rem'}}></span>
</div>
</div>
}
    </>
  )
}

export default SpecialNavbar