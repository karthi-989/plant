import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use `Routes` instead of `Switch` (for React Router v6+)
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BestSelling from "./components/BestSelling";
import TrendingPlants from "./components/TrendingPlants";
import Blogs from "./components/Blogs";
import HotSale from "./components/HotSale";
import Planters from "./components/Planters";
import Shop from "./components/Shop";
import LandscapeGardening from "./components/LandscapeGardening";
import CartItem from "./components/CartItem"
import Footer from "./components/Footer";
import Signup from "./components/RegistartionForm";
import SignIn from "./components/LoginFrom";
// import ProductDetail from "./components/ProductDetail";
import CelebsYouLove from "./components/CelebsYouLove";


function App() {
  return (
    <Router>
      <Routes>
        {/* Main Home Page */}
        <Route
          path="/home"
          element={
            <>
            <Header />
              <HeroSection />
              <BestSelling />
              <TrendingPlants />
              <Blogs />
              <HotSale />
              <Planters />
              <LandscapeGardening />
              <CelebsYouLove />
              <Footer />
              {/* <ProductDetail/> */}
            </>
          }
        />

        {/* Individual Routes for Components */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/plants" element={<TrendingPlants />} />
        <Route path="/Planters" element={<Planters />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/hot-sale" element={<HotSale />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/CartItem" element={<CartItem />} />
        <Route path="/CartItem" element={<CartItem />} />
      </Routes>
    </Router>
  );
}

export default App;
