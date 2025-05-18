import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useCart } from "../context/cart";
import Header from "../components/Layout/Header";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    const validCartItems = cart.filter(
      (item) => item._id && item.price && item.quantity
    );

    const calculateTotalPrice = () => {
      let total = 0;
      validCartItems.forEach((item) => {
        const discountPrice = item.price * 0.9;
        total += discountPrice * item.quantity;
      });
      return Math.floor(total);
    };

    const total = calculateTotalPrice();
    setTotalPrice(total);
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: total,
    }));
  }, [cart]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    totalAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const totalAmountInPaise = Math.max(
    parseInt(formData.totalAmount) * 100,
    100
  );

  const shipping_address = {
    fullname: formData.fullname,
    address: formData.address,
    email: formData.email,
    state: formData.state,
    city: formData.city,
    postcode: formData.pincode,
    phone_number: formData.mobile,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };

  var options = {
    key: "rzp_test_ZzOMVkgPqEwsuR",
    key_secret: "KkCy4QoJiQ5MDIF0qNVgv0E8",
    amount: totalAmountInPaise,
    currency: "INR",
    name: "Payment mode",
    description: "for testing purpose",
    handler: async function (response) {
      const paymentId = response.razorpay_payment_id;
      setPaymentSuccess(true);
      console.log(cart);
      try {
        await axios.post("http://localhost:8000/product/addtoCart", { cart });
        console.log("Cart data saved successfully");
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/");
      } catch (error) {
        //console.error("Error saving cart data:", error);
      }

      setFormData({
        fullname: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        totalAmount: "",
      });
    },
    modal: {
      ondismiss: function () {
        setPaymentSuccess(false);
      },
    },
    theme: {
      color: "#07a291db",
    },
  };

  var pay = new window.Razorpay(options);
  pay.open();
};


  return (
    <div className="bg-white">
      <Header />
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="overflow-hidden rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="px-5 py-6 text-gray-900 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="py-6">
                    <form onSubmit={handleSubmit}>
                      <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <div>
                          <h3
                            id="contact-info-heading"
                            className="text-lg font-semibold text-gray-900"
                          >
                            Contact information
                          </h3>
                          <div className="mt-4 w-full">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="fullname"
                            >
                              Full Name
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="Enter your name"
                              id="fullname"
                              name="fullname"
                              value={formData.fullname}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mt-4 w-full">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="Enter your email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mt-4 w-full">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="mobile"
                            >
                              Mobile no
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              placeholder="Enter your Mobile no"
                              id="mobile"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <hr className="my-8" />
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Shipping address
                          </h3>
                          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Address
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="address"
                                  name="address"
                                  autoComplete="street-address"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.address}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                City
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  autoComplete="address-level2"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.city}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium text-gray-700"
                              >
                                State
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="state"
                                  name="state"
                                  autoComplete="address-level1"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.state}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="pincode"
                                className="block text-sm font-medium text-gray-700"
                              >
                                PIN Code
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="pincode"
                                  name="pincode"
                                  autoComplete="postal-code"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  value={formData.pincode}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-6">
                            <div className="flex items-center gap-x-3">
                              <span className="text-sm font-medium text-gray-700">
                                Total Amount
                              </span>
                              <span className="text-sm font-semibold text-gray-900">
                                ₹{totalPrice}
                              </span>
                            </div>
                          </div>
                          <div className="mt-10">
                            <button
                              type="submit"
                              className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm ring-1 ring-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Order Summary */}
            <div className="border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Order summary
              </h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item._id} className="flex py-6">
                    <div className="w-1/2 flex-shrink-0">
                      <img
                        src={`${process.env.REACT_APP_API}/product/product-photo/${item._id}`}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between">
                      <div className="relative pr-9">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price} x {item.quantity}
                          </p>
                        </div>
                        <div className="absolute top-0 right-0">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() =>
                              setCart(cart.filter((c) => c._id !== item._id))
                            }
                          >
                            <X className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-4 text-sm font-medium text-gray-900">
                        ₹{item.price * item.quantity * 0.9}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
