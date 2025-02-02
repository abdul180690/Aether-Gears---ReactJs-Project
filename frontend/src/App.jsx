import React from 'react';
import Header from './components/Header';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Blog from './pages/Blog';
import AboutUs from './pages/AboutUs';
import Product from './pages/Product';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Login from './pages/Login';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WishList from './pages/WishList';
import Contact from './pages/Contact';
import Offers from './pages/Offers';

const App = () => {
  const location = useLocation();  
  return (
    <main className="overflow-hidden bg-amber-50"> 
      <ToastContainer />
      {/* <Header /> */}
      {/* Transition Group for page fade animations */}
      {/* <TransitionGroup>
        <CSSTransition
          key={location.key} // Unique key for each location to trigger animations
          timeout={750} // Duration of the transition
          classNames="fade" // CSS class for animation
        > */}
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        {/* </CSSTransition>
      </TransitionGroup> */}

      <Footer />
      <BackToTop />
    </main>
  );
};

export default App;

