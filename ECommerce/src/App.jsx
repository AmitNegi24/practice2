import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";
import Checkout from "./pages/CheckOut/Checkout";


function App() {
  const userInfo = useSelector((state) => state.bazaar.userInfo);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={userInfo ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={!userInfo ? <Login /> : <Navigate to="/" />} />
        <Route path="/checkout" element={userInfo ? <Checkout /> : <Navigate to="/login" />} /> {/* Checkout route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
