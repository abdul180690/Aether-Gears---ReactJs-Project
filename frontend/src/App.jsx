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
import ViewOrder from './components/ViewOrder';
import HelpCenter from './components/HelpCenter';
import PaymentMethods from './components/PaymentMethods';
import Complaints from './components/Complaints';
import PrivacyPolicy from './components/PrivaryPolicy';
import CookieSettings from './components/CookiSettings';
import TermsConditions from './components/TermsConditions';
import Cancellation from './components/Cancellations';
import Imprint from './components/Imprint';
import OurTeams from './components/OurTeams';
import Sustainability from './components/Sustainability';
import Press from './components/Press';
import Jobs from './components/Jobs';
import Newsletter2 from './components/NewsLetter2';
import ReturnsAndRefunds from './components/ReturnsAndRefunds';
import FAQs from './components/FAQs';
import ShippingAndDelivery from './components/ShippingAndDelivery';


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
    "/view-order/:orderId": "View Order",
    "/helpcenter": "Help Center",
    "/payment-methods": "Payment Methods",
    "/complaints": "Complaints",
    "/privacy-policy": "Privacy Policy",
    "/cookie-settings": "Cookie Settings",
    "/terms-conditions": "Terms & Conditions",
    "/cancellation": "Cancellation",
    "/imprint": "Imprint",
    "/our-teams": "Our Teams",
    "/sustainability": "Sustainability",
    "/press": "Press",
    "/jobs": "Jobs",
    "/news-letter2": "News Letter",
    "/returns-refunds": "Returns & Refunds",
    "/faqs": "FAQs",
    "/shipping-delivery": "Shipping and Delivery",
  };

  // Update the document title based on the route
  useEffect(() => {
    const currentTitle = titleMapping[location.pathname] || 'My React App'; // Default title
    document.title = currentTitle;
  }, [location]);

  return (
    <main className="bg-primary">
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
            <Route path="/view-order/:orderId" element={<ViewOrder />} />
            <Route path="/helpcenter" element={<HelpCenter />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-settings" element={<CookieSettings />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/cancellation" element={<Cancellation />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/our-teams" element={<OurTeams />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/press" element={<Press />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/news-letter2" element={<Newsletter2 />} />
            <Route path="/returns-refunds" element={<ReturnsAndRefunds />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/shipping-delivery" element={<ShippingAndDelivery />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
      <BackToTop />
    </main>
  );
};

export default App;
