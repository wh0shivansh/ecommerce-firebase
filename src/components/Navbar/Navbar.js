import React ,{useEffect,useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import {signOut} from 'firebase/auth'
import { auth, db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import HomeIcon from '../../Assets/hut.png';
import ProfileIcon from '../../Assets/user.png';
import HeartIcon from '../../Assets/heart.png';
import CartIcon from '../../Assets/cart.png';
import MenuIcon from '../../Assets/menu.png';
import Cart from '../Cart/Cart';


const Navbar = () => {

  const [isDark,setisDark] = useState(false);

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

  const openSidebar=()=>{
      const sidebar = document.getElementById('sidebar');
      const sidebarOverlay = document.getElementById('sidebar-overlay');
      if(sidebar&&sidebarOverlay){
        sidebar.classList.add('sidebar-main');
        sidebar.classList.remove('sidebar-close');    
        sidebarOverlay.classList.add('sidebar-overlay');
        sidebarOverlay.classList.remove('display-none');
      }
  }
   const closeSidebar=()=>{
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if(sidebar&&sidebarOverlay){
      sidebar.classList.add('sidebar-close');
      sidebar.classList.remove('sidebar-main');
      sidebarOverlay.classList.remove('sidebar-overlay');
      sidebarOverlay.classList.add('display-none');
    }
  }  


  return (
    <>
    {!loggedUser&&
      <nav id='navbar' className='custom-navbar'>
        <div className="nav-hamburger nav-items" onClick={openSidebar}>
          <img src={MenuIcon}  className={`${isDark?'btn-black':'img-btn'}`}alt="" />

          <div className="sidebar-close" id='sidebar'>
    <div className="sidebar-top">
      <div className="userstate">
      <Link to={"/login"}></Link>    
         <button className='userstate-btn'>login</button>
      </div>
      <button className="close-sidebar" onClick={closeSidebar}>X</button>
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



        <div className={`nav-title nav-item ${isDark?'text-black':''}`}>
          The Drip
        </div>



        <div className="nav-links nav-items">
        <Link to={"/"}><div className={`nav-btn`}>
            <img src={HomeIcon} className={`${isDark?'btn-black':'img-btn'}`} alt="" />
          </div></Link>
        <Link to={"/register"}><div className='nav-btn'>
            <img src={ProfileIcon} className={`${isDark?'btn-black':'img-btn'}`}  alt="" />
          </div></Link>        
          <Link to={"#"}><div className='nav-btn'>
            <img src={HeartIcon}  className={`${isDark?'btn-black':'img-btn'}`}alt="" />
          </div></Link>
        {/* <Link to={`/cart/${uid}/`}>
          <div className="nav-btn">
            <img src={CartIcon} className={`${isDark?'btn-black':'img-btn'}`} alt="" />
            <span className='cart-quantity'>{loggedUser?loggedUser[0].cart:'0'}</span>
          </div>
        </Link> */}
        <span style={{width:'1.5rem'}}></span>
        </div>
      </nav>
}
{loggedUser&&
       <nav id='navbar' className='navbar'>



<div className="nav-hamburger nav-items" onClick={openSidebar}>
          <img src={MenuIcon}  className={`${isDark?'btn-black':'img-btn'}`}alt="" />

          <div className="sidebar-close" id='sidebar'>
    <div className="sidebar-top">
      <div className="userstate">
      <Link to={"/login"}></Link>    
         <button className='userstate-btn'>login</button>
      </div>
      <button className="close-sidebar" onClick={closeSidebar}>X</button>
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



        <div className={`nav-title nav-item ${isDark?'text-black':''}`}>
          The Drip
        </div>



        <div className="nav-links nav-items">
          
       <Link to={"/"}></Link>    
         <button onClick={logOut}>Logout</button>
         {loggedUser[0].email == "admin@admin.com"?
         <Link to={"/dashboard"}><button>Dashboard</button></Link>:<div></div>}

        <Link to={"/"}><div className={`nav-btn`}>
            <img src={HomeIcon} className={`${isDark?'btn-black':'img-btn'}`} alt="" />
          </div></Link>
        <Link to={"/register"}><div className='nav-btn'>
            <img src={ProfileIcon} className={`${isDark?'btn-black':'img-btn'}`}  alt="" />
          </div></Link>        
          <Link to={"#"}><div className='nav-btn'>
            <img src={HeartIcon}  className={`${isDark?'btn-black':'img-btn'}`}alt="" />
          </div></Link>
        <Link to={`/cart/${loggedUser[0].uid}/`}>
          <div className="nav-btn">
            <img src={CartIcon} className={`${isDark?'btn-black':'img-btn'}`} alt="" />
            <span className='cart-quantity'>{loggedUser?loggedUser[0].cart:'0'}</span>
          </div>
        </Link>
        <span style={{width:'1.5rem'}}></span>
        </div>
        <div className="display-none" id='sidebar-overlay' onClick={closeSidebar}></div>

      
     </nav> 
}

    </>
  )
}

export default Navbar