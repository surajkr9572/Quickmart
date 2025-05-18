import { Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Header from "../components/Layout/Header";
import { ProductOverviewOne } from "../components/ProductOverviewOne";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("auth"));
      setUser(loggedInUser);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/products/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product, quantity, selectedSize, selectedColor) => {
    if (user) {
      const existingProductIndex = cart.findIndex(
        (item) =>
          item._id === product._id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
     
      if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += quantity;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        const updatedProduct = {
          ...product,
          quantity,
          selectedSize,
          selectedColor,
          user_id: user.user._id,
        };
        const updatedCart = [...cart, updatedProduct];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      toast.success("Item Added");
    } else {
      alert("Please login");
    }
  };

  return (
    <Layout>
      <Header />
      <ProductOverviewOne product={product} addToCart={addToCart} />
    </Layout>
  );
};

export default ProductDetails;
