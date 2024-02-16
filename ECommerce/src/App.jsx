// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Navbar from './components/Navbar/Navbar.jsx'
// import Home from "./pages/Home/Home.jsx"
// import Footer from "./components/Footer/Footer.jsx"
// import Cart from "./pages/Cart/Cart.jsx"
// import Product from "./pages/Product/Product.jsx"
// import Login from "./pages/Login/Login.jsx"
// import { useSelector } from "react-redux"
// function App() {
//   const userInfo = useSelector((state) => state.bazaar.userInfo);
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home/>}></Route>
//           <Route path="/cart" element={<Cart/>}></Route>
//           <Route path="/product/:id" element={<Product/>}></Route>
//           <Route path="/login" element={<Login/>}></Route>
//         </Routes>
//         <Footer/>
//       </Router>
//     </>
//   )
// }

// export default App
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import Login from "./pages/Login/Login";

function App() {
  const userInfo = useSelector((state) => state.bazaar.userInfo);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element = <Home/> />
        <Route path="/cart" element={userInfo ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={userInfo ? <Product /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userInfo ? <Login /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
