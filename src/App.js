import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import MyBids from "./pages/MyBids";
import PlaceBid from "./pages/PlaceBid";
import AdminBidHistory from "./pages/AdminBidHistory";
import ManageUsers from "./pages/ManageUsers";
import ManageProducts from "./pages/ManageProducts";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import SellerBids from "./pages/SellerBids";
import ManageBuyers from "./pages/ManageBuyers";
import ManageSellers from "./pages/ManageSellers";
import Register from "./pages/Register";
import BidMonitor from "./pages/BidMonitor";
import LiveAuctions from "./pages/LiveAuctions";
import ClosedAuctions from "./pages/ClosedAuctions";
import BidHistory from "./pages/BidHistory";
import SellerSales from "./pages/SellerSales";
import AdminBuyers from "./pages/AdminBuyers";
import AdminSellers from "./pages/AdminSellers";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

<Route path="/seller" element={<SellerDashboard />} />

<Route path="/buyer" element={<BuyerDashboard />} />

<Route path="/admin" element={<AdminDashboard />} />

<Route path="/register" element={<Register />} />

<Route path="/products" element={<Products />} />

<Route path="/place-bid" element={<PlaceBid />} />

<Route path="/my-bids" element={<MyBids />} />

<Route path="/live-auctions" element={<LiveAuctions />} />

<Route path="/closed-auctions" element={<ClosedAuctions />} />

<Route path="/bid-history" element={<BidHistory />} />

<Route path="/bid-monitor" element={<BidMonitor />} />

<Route path="/manage-buyers" element={<AdminBuyers />} />

<Route path="/manage-sellers" element={<AdminSellers />} />

<Route path="/manage-users" element={<ManageUsers />} />

<Route path="/manage-products" element={<ManageProducts />} />

<Route path="/add-product" element={<AddProduct />} />

<Route path="/my-products" element={<MyProducts />} />

<Route path="/edit-product/:id" element={<EditProduct />} />

<Route path="/seller-bids/:id" element={<SellerBids />} />

<Route path="/seller-sales" element={<SellerSales />} />
            </Routes>

        </BrowserRouter>

    );

}

export default App;