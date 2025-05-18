import React, { useState } from "react";

export function ProductOverviewOne({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M"); // Default size
  const [selectedColor, setSelectedColor] = useState("red"); // Default color

  const sizes = ["S", "M", "L", "XL"];
  const colors = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Black", value: "black" },
    { name: "Yellow", value: "yellow" },
  ];

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
      {/* Breadcrumbs */}
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a href="#">Home</a>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize" href="#">
                products
              </a>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize" href="#">
                {product.name}
              </a>
            </li>
          </ol>
        </div>
      </div>

      {/* Product Details */}
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          <img
            src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
            alt={product.name}
            className="product-img"
          />
        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          {/* Product Info */}
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {product.name}
            </h2>
            <div className="mt-5 flex items-center">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </div>
              {product.originalPrice && (
                <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                  {product?.originalPrice?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
              )}
            </div>
          </div>

          {/* Size Selector */}
          <div className="border-b border-gray-300 pb-3">
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                Size
              </h3>
              <ul className="flex flex-wrap">
                {sizes.map((size) => (
                  <li
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`cursor-pointer px-3 py-1 mr-2 mb-2 rounded border ${
                      selectedSize === size
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    } border-gray-300`}
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selector */}
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                Color
              </h3>
              <ul className="flex flex-wrap">
                {colors.map((color) => (
                  <li key={color.value} className="mr-2">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={selectedColor === color.value}
                        onChange={() => setSelectedColor(color.value)}
                        className="sr-only"
                      />
                      <span
                        className={`inline-block w-6 h-6 rounded-full border border-gray-300 ${color.value}`}
                        style={{ backgroundColor: color.value }}
                      ></span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quantity Selector and Add to Cart Button */}
          <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8 md:pr-32 lg:pr-12 2xl:pr-32">
            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
              <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                onClick={decrementQuantity}
              >
                -
              </button>
              <span className="duration-250 text-heading flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24">
                {quantity}
              </span>
              <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() =>
                addToCart(product, quantity, selectedSize, selectedColor)
              }
            >
              Add to cart
            </button>
          </div>

          {/* Product Description */}
          <div className="py-6">
            <ul className="space-y-5 pb-1 text-sm">
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  SKU:
                </span>
                {product.sku || "N/A"}
              </li>
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Category:
                </span>
                <a
                  className="hover:text-heading transition hover:underline"
                  href="#"
                >
                  {product.category?.name || "Unknown"}
                </a>
              </li>
              <li className="productTags">
                <span className="text-heading inline-block pr-2 font-semibold">
                  Discount:
                </span>
                <b>10%</b>
              </li>
            </ul>
          </div>

          {/* Product Details */}
          <div className="shadow-sm">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Product Details
              </h2>
              <div className="relative">
                <button
                  className="focus:outline-none"
                  aria-label="toggle"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
              </div>
            </header>
            <div className="overflow-hidden border-t border-gray-300">
              <div className="p-5 text-sm text-gray-800 md:p-6 md:text-base lg:p-7 lg:text-lg">
                <p>{product.description || "No details available."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
