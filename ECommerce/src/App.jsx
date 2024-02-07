import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar/Navbar.jsx'
import Home from "./pages/Home/Home.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Cart from "./pages/Cart/Cart.jsx"
import Product from "./pages/Product/Product.jsx"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/product/:id" element={<Product/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
