import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, RouteProps, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PgFOF from './components/PgFOF';
import Cart from './components/Cart/Cart';
import UserProfile from './components/UserProfile/UserProfile';
import Dashboard from './components/Dashboard/Dashboard';
import SingleProduct from './components/SingleProduct/SingleProduct';
import OrderSummary from './components/OrderSummary/OrderSummary';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/cart/:id/' element={<Cart />}></Route>
        <Route exact path='/userprofile' element={<UserProfile />}></Route>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
        <Route exact path='/ordersummary' element={<OrderSummary/>}></Route>
        <Route exact path='/product/:id/' element={<SingleProduct/>}></Route>
        <Route exact path='*' element={<PgFOF />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
