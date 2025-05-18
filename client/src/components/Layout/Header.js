import React from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "./Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto font-bold flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        QuickCart
        <div className="flex grow justify-center">
          <SearchInput className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 justify-center" />
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          <NavLink
            to="/"
            className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
          >
            Home
            <span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </span>
          </NavLink>
          <NavLink
            to="/about"
            className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
          >
            About
            <span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </span>
          </NavLink>
          <div className="relative">
            <NavLink
              className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
              <span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </span>
            </NavLink>
            <ul className="dropdown-menu absolute hidden mt-2 rounded-lg shadow-lg bg-white">
              <li>
                <NavLink
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  to="/categories"
                >
                  All Categories
                </NavLink>
              </li>
              {categories?.map((c) => (
                <li key={c.slug}>
                  <NavLink
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <NavLink
              className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
              to="#"
              id="profileDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile
              <span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </span>
            </NavLink>
            <ul className="dropdown-menu absolute hidden mt-2 rounded-lg shadow-lg bg-white">
              {auth?.user ? (
                <>
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Badge count={cart?.length} showZero>
            <NavLink
              to="/cart"
              className="nav-link inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
            >
              Cart
            </NavLink>
          </Badge>
        </div>
        <div className="lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="space-y-2 px-2 pt-2 pb-3">
          <NavLink
            to="/"
            className="block rounded-md px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block rounded-md px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="block rounded-md px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
          >
            Contact
          </NavLink>
          <div className="relative">
            <NavLink
              className="block rounded-md px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
              <span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </span>
            </NavLink>
            <ul className="dropdown-menu absolute hidden mt-2 rounded-lg shadow-lg bg-white">
              <li>
                <NavLink
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  to="/categories"
                >
                  All Categories
                </NavLink>
              </li>
              {categories?.map((c) => (
                <li key={c.slug}>
                  <NavLink
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {auth ? (
            <Badge count={cart?.length} showZero>
              <NavLink
                to="/cart"
                className="block rounded-md px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
              >
                Cart
              </NavLink>
            </Badge>
          ) : (
            <div>
              <NavLink
                to="/login"
                className="block rounded-md px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-100"
              >
                Cart
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
