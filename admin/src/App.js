import "./App.css";
import { Header } from "./componets/Header";
import { Sidebar } from "./componets/Sidebar";
import { Order } from "./pages/Order";
import { Product } from "../src/pages/Product";
import { User } from "../src/pages/User";
import { AddNewProduct } from "./componets/AddNewProduct";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Sidebar></Sidebar>
          <div className="content">
            <Header></Header>
            <div className="content-body">
              <Routes>
                <Route path="/" element={<Order />} />
                <Route path="/product" element={<Product />} />
                <Route path="/user" element={<User />} />
                <Route path="/add-new-product" element={<AddNewProduct />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
