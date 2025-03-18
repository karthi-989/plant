import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layOut";
import HeroSection from "./components/HeroSection";
import BestSelling from "./components/BestSelling";
import TrendingPlants from "./components/TrendingPlants";
import Blogs from "./components/Blogs";
import Planters from "./components/Planters";
import Shop from "./components/Shop";
import LandscapeGardening from "./components/LandscapeGardening";
import CartItem from "./components/CartItem";
import Signup from "./components/RegistartionForm";
import SignIn from "./components/LoginFrom";
import CelebsYouLove from "./components/CelebsYouLove";
import Cart from "./components/cart";
import Checkout from "./components/checkOut";
import AdminDashboard from "./components/AdminDasboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <Layout>
              <HeroSection />
              <BestSelling />
              <TrendingPlants />
              <Blogs />
              <Planters />
              <LandscapeGardening />
              <CelebsYouLove />
            </Layout>
          }
        />
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/plants"
          element={
            <Layout>
              <TrendingPlants />
            </Layout>
          }
        />
        <Route
          path="/planters"
          element={
            <Layout>
              <Planters />
            </Layout>
          }
        />
        <Route
          path="/blogs"
          element={
            <Layout>
              <Blogs />
            </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <Shop />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/cartItem"
          element={
            <Layout>
              <CartItem />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
