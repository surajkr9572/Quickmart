import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/Homepage.css";
import InfinteSlider from "./Infinite-slider";
const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMatchingItems, setNoMatchingItems] = useState(false); 

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let user = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts(); 
  }, []);

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/products`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
      if (!data.products) {
        setNoMatchingItems(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add product to cart

  return (
    <Layout title={"All Products - Best offers "}>
      <>
        <section class="pt-12 bg-gray-50 sm:pt-16">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="text-center">
              <p class="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                Best cloths Selling and Buying Platform
              </p>
              <h1 class="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
                We are building a platform where each small and big shop Owner
                can sell their cloth and user can buy that product which we
                deliver in just 20 minutes.
              </h1>
              <div class="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
                <a href="mailto:suraj43006@gmail.com?subject=Instructions&body=1.%20Send%20Request%20with%20the%20same%20reigistered%20Email%20ID.%20%0A2.%20Send%20some%20description%20about%20your%20shop%20and%20your%20products.">
                  <button class="mb-3 sm:mb-0 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                    Start Selling
                  </button>
                </a>

                <a
                  href="#product"
                  class="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-gray-900 hover:text-white transition-all duration-200 bg-gray-100 border-2 border-gray-900 sm:w-auto rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Buy Best Clothes
                </a>
              </div>
            </div>
          </div>
        </section>
      </>
      <InfinteSlider />
      <div className="container-fluid mt-3 home-page bg-gray-100 px-4">
        <div className="row">
          {/* Filter Section */}
          <div className="col-lg-2 col-md-3 col-sm-12 mb-4 filters bg-white shadow-sm p-3 rounded">
            <h4 className="text-center mb-3">Filter By Category</h4>
            <div className="d-flex flex-column gap-2">
              {categories?.map((c) => (
                <div key={c._id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  />
                  <label className="form-check-label ms-2">{c.name}</label>
                </div>
              ))}
            </div>

            <h4 className="text-center mt-4 mb-3">Filter By Prices</h4>
            <div className="d-flex flex-column gap-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <input
                      type="radio"
                      className="form-check-input"
                      value={p.array}
                      checked={radio === p.array}
                    />
                    <label className="form-check-label ms-2">{p.name}</label>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="d-flex flex-column mt-4">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Product Section */}
          <div className="col-lg-10 col-md-9 col-sm-12 bg-white" id="product">
            <h1 className="text-center mb-4 text-3xl font-bold text-green-900 py-10">
              All Products
            </h1>

            <div className="row mt-6">
              {noMatchingItems ? (
                <p className="text-center w-full h-full ">
                  No matching items found.
                </p>
              ) : (
                products?.map((p) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={p._id}>
                    <div className="h-100 shadow-sm rounded-xl bg-sky-50 bg-opacity-40">
                      <img
                        src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                        className="card-img-top rounded-2xl"
                        alt={p.name}
                        style={{ height: "100px", objectFit: "cover" }}
                      />
                      <div className="d-flex gap-2 px-2 py-2 flex-column justify-content-between">
                        <h5 className="card-title text-gray-800 font-bold">
                          {p.name}
                        </h5>
                        <p className="card-text text-gray-700 opacity-85">
                          {p.description.substring(0, 60)}...
                        </p>
                        <p className="card-text fw-bold">₹ {p.price}</p>
                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 w-11 bg-yellow-400 rounded-xl"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            More Details
                          </button>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
