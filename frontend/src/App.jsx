// import React from 'react';
// import Header from './components/Header';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Home from './pages/Home';
// import Collection from './pages/Collection';
// import Blog from './pages/Blog';
// import AboutUs from './pages/AboutUs';
// import Product from './pages/Product';
// import BackToTop from './components/BackToTop';
// import Footer from './components/Footer';
// import { ToastContainer } from 'react-toastify';
// import Cart from './pages/Cart';
// import PlaceOrder from './pages/PlaceOrder';
// import Login from './pages/Login';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import WishList from './pages/WishList';
// import Contact from './pages/Contact';
// import Orders from './pages/Orders';
// import Verify from './pages/Verify';


// const App = () => {
//   const location = useLocation();  
//   return (
//     <main className=""> 
//       <ToastContainer />
//       <Header />
//       {/* Transition Group for page fade animations */}
//       <TransitionGroup>
//         <CSSTransition
//           key={location.key} 
//           timeout={500} 
//           classNames="fade" 
//         >
//           <Routes location={location}>
//             <Route path="/" element={<Home />} />
//             <Route path="/collection" element={<Collection />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/about-us" element={<AboutUs />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/product/:productId" element={<Product />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/wishlist" element={<WishList />} />
//             <Route path="/place-order" element={<PlaceOrder />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/verify" element={<Verify />} />
//           </Routes>
//         </CSSTransition>
//       </TransitionGroup>

//       <Footer />
//       <BackToTop />
//     </main>
//   );
// };

// export default App;



import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
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
import Orders from './pages/Orders';
import Verify from './pages/Verify';

const App = () => {
  const location = useLocation();
  
  // Titles mapping based on routes
  const titleMapping = {
    '/': 'Home',
    '/collection': 'Collection',
    '/blog': 'Blog',
    '/about-us': 'About Us',
    '/contact': 'Contact',
    '/product/:productId': 'Product Details',
    '/cart': 'My Cart',
    '/wishlist': 'My Wish List',
    '/place-order': 'Place Order',
    '/login': 'Login',
    '/orders': 'My Orders',
    '/verify': 'Verify',
  };

  // Update the document title based on the route
  useEffect(() => {
    const currentTitle = titleMapping[location.pathname] || 'My React App'; // Default title
    document.title = currentTitle;
  }, [location]);

  return (
    <main className="">
      <ToastContainer />
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={500}
          classNames="fade"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default App;
