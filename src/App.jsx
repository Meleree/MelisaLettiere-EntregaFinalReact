import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Footer from "../src/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import './App.css';
import NotFoundPage from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

function App() {
  return (
    <div className="container-app">
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <ToastContainer theme="dark" position="bottom-center" />

          <Routes>
            <Route path="/" element={<ItemListContainer greeting={"BIENVENIDOS"} />} />
            <Route path="/category/:idCategory" element={<ItemListContainer greeting={"BIENVENIDOS"} />} />
            <Route path="/detail/:idProduct" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CartProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
