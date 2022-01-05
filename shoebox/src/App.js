import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './features/home/Home';
import Cart from './features/cart/Cart';
import Explore from './features/explore/Explore';
import Checkout from './features/checkout/Checkout';
import Confirmation from './features/checkout/Confirmation';
import ProductDemo from './features/product/ProductDemo';
import Profile from './features/Profile/Profile'

import ExploreBrandName from './features/explore/ExploreBrandName';

function App() {
  return (
    // <div className="App">
    //   <Header />
    //   <Home />
    // </div>
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/product" element={<ProductDemo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/brand/:brandName" element={<ExploreBrandName/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
