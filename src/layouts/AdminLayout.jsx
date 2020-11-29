import clsx from "clsx";
import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminLayout(props) {
  const menuRef = useRef(null);
  const siderRef = useRef(null);

  const location = useLocation();

  const handleSiderToggle = () => {
    const { classList } = siderRef.current;
    if (classList.contains("-translate-x-full")) {
      classList.remove("-translate-x-full");
      classList.add("translate-x-0");
    } else {
      classList.remove("translate-x-0");
      classList.add("-translate-x-full");
    }
  };

  const handleClick = () => {
    const { classList } = menuRef.current;
    classList.toggle("overflow-visible");
    classList.toggle("max-h-screen");
  };

  return (
    <>
      <header className="bg-gray-900 p-5 lg:ml-72 shadow-lg">
        <nav className="container mx-auto text-gray-50 flex justify-between flex-wrap items-center">
          <div>
            <h1 className="text-2xl tracking-wide">Dashboard</h1>
          </div>
          <div className="flex items-center justify-center lg:hidden p-3 w-12 h-12">
            <button onClick={handleClick}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className="w-full lg:w-auto flex-grow lg:flex-grow-0 lg:flex lg:items-center overflow-hidden lg:overflow-visible max-h-0 transition-all duration-300"
            ref={menuRef}
          >
            <ul className="lg:flex justify-end pt-6 lg:pt-0">
              <li className="p-2 hover:bg-blue-700 transition lg:px-5 lg:ml-2 rounded cursor-pointer">Nav 1</li>
              <li className="p-2 hover:bg-blue-700 transition lg:px-5 lg:ml-2 rounded cursor-pointer">Nav 2</li>
              <li className="p-2 hover:bg-blue-700 transition lg:px-5 lg:ml-2 rounded cursor-pointer">Nav 3</li>
              <li className="p-2 hover:bg-blue-700 transition lg:px-5 lg:ml-2 rounded cursor-pointer">Nav 4</li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="fixed bottom-2 left-2 lg:hidden w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded-full z-50">
        <button className="text-xl" onClick={handleSiderToggle}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <aside
        className="fixed left-0 top-0 transform -translate-x-full lg:translate-x-0 transition-transform min-h-screen bg-gray-900 shadow-md w-72 "
        ref={siderRef}
      >
        <h1 className="text-2xl p-5 bg-gray-900 text-white text-center">Henefisa</h1>
        <ul className="py-5">
          <li
            className={clsx("mb-3 text-xl text-gray-50 hover:bg-blue-700 py-2 px-5 transition cursor-pointer", {
              "bg-blue-700 text-gray-50": location.pathname === "/admin/dashboard"
            })}
          >
            <Link to="/admin/dashboard" className="w-full block hover:text-gray-50">
              Dashboard
            </Link>
          </li>
          <li
            className={clsx("mb-3 text-xl text-gray-50 hover:bg-blue-700 py-2 px-5 transition cursor-pointer", {
              "bg-blue-700 text-gray-50": location.pathname === "/admin/posts"
            })}
          >
            <Link to="/admin/posts" className="w-full block hover:text-gray-50">
              Posts
            </Link>
          </li>
          <li
            className={clsx("mb-3 text-xl text-gray-50 hover:bg-blue-700 py-2 px-5 transition cursor-pointer", {
              "bg-blue-700 text-gray-50": location.pathname === "/admin/users"
            })}
          >
            <Link to="/admin/users" className="w-full block hover:text-gray-50">
              Users
            </Link>
          </li>
        </ul>
      </aside>
      <main style={{ minHeight: "calc(100vh - 120px)" }} className="lg:ml-72">
        {props.children}
      </main>
      <footer className="lg:ml-72 h-12 flex items-center justify-center bg-gray-900 text-gray-50">
        <h1 className="text-2xl">Henefisa admin</h1>
      </footer>
    </>
  );
}
