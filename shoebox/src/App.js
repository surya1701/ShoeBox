import React from 'react';
import './App.css';
import Home from './features/home/Home';
import Cart from './features/cart/Cart';
import Checkout from './features/checkout/Checkout';
import Confirmation from './features/checkout/Confirmation';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <Header />
    //   <Home />
    // </div>
    <div className="App">
    <Router>
      <Routes>
          <Route exact path ="/" element={<Home/>}/>
          <Route path ="/cart" element={<Cart/>}/>
          <Route path ="/checkout" element={<Checkout/>}/>
          <Route path ="/confirmation" element={<Confirmation/>}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
