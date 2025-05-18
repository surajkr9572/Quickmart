import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Posts from "./components/Posts";
// Lazy load the components
const HomePage = lazy(() => import("./pages/HomePage"));
const Policy = lazy(() => import("./pages/Policy"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Pagenotfound = lazy(() => import("./pages/Pagenotfound"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const PrivateRoute = lazy(() => import("./components/Layout/Routes/Private"));
const AdminRoute = lazy(() => import("./components/Layout/Routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const CreateCategory = lazy(() => import("./pages/Admin/CreateCategory"));
const CreateProduct = lazy(() => import("./pages/Admin/CreateProduct"));
const Users = lazy(() => import("./pages/Admin/Users"));
const Order = lazy(() => import("./pages/user/Order"));
const Products = lazy(() => import("./pages/Admin/Products"));
const UpdateProduct = lazy(() => import("./pages/Admin/UpdateProduct"));
const Search = lazy(() => import("./pages/Search"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Categories = lazy(() => import("./pages/Categories"));
const CategoryProduct = lazy(() => import("./pages/CategoryProduct"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrders"));

function App() {
  return (
    <>
      <Posts/>
      {/* Suspense component with a fallback loader */}
      <Suspense fallback={<div className="loader w-screen h-screen flex justify-center items-center text-xl bg-yellow-100 font-bold text-center animate-bounce">Welcome to QuickMart <br/>Page is loading..</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/search" element={<Search />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Order />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
