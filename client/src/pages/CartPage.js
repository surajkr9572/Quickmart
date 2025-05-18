import { Heart, Trash, ArrowRight } from "lucide-react";
import React from "react";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";

export default function CartPage() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const updatedCart = [...cart, { totalPrice: totalPriceNumber() }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/checkout", { state: { cart: updatedCart } });
  };
  const totalPriceNumber = () => {
    let total = 0;
    cart?.forEach((item) => {
      const discountPrice = item.price * 0.9;
      total += discountPrice * item.quantity;
    });
    return Math.floor(total);
  };

  const totalPrice = () => {
    return totalPriceNumber().toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };
  const totalDiscount = () => {
    let total = 0;
    cart?.forEach((item) => {
      const discountAmount = item.price * 0.1; 
      total += discountAmount * item.quantity;
    });
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const incrementQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrementQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeCartItem = (product) => {
    const updatedCart = cart.filter(
      (item) =>
        !(
          item._id === product._id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
        )
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cart?.map((product) => (
                  <div key={product._id} className="">
                    <li className="flex py-6 sm:py-6">
                      <div className="flex-shrink-0">
                        <img
                          src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href="#"
                                  className="font-semibold text-black"
                                >
                                  {product.name}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-sm text-gray-500">
                                Color: {product.selectedColor}
                              </p>
                              {product.selectedSize ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                  Size: {product.selectedSize}
                                </p>
                              ) : null}
                            </div>
                            <div className="mt-1 flex items-end">
                              <p className="text-xs font-medium text-gray-500 line-through">
                                {product.originalPrice}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                &nbsp;&nbsp;{Math.floor(product.price * 0.9)}
                              </p>
                              &nbsp;&nbsp;
                              <p className="text-sm font-medium text-green-500">
                                10% Off
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 flex">
                      <div className="min-w-24 flex">
                        <button
                          type="button"
                          className="h-7 w-7"
                          onClick={() => decrementQuantity(product._id)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          value={product.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center"
                          onClick={() => incrementQuantity(product._id)}
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                          onClick={() => removeCartItem(product)}
                        >
                          <Trash size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className="space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({cart.length} items)
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {totalPrice()}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">Discount</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {totalDiscount()}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {totalPrice()}
                    </dd>
                  </div>
                </dl>
                <div className="flex justify-end px-4 py-6">
                  <button
                    type="button"
                    className="flex items-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-900"
                    onClick={handleCheckout}
                  >
                    <span>Checkout</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}
