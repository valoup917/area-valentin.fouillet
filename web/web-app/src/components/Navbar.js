import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";
import axios from "axios";
import { useCookies } from 'react-cookie';

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['email']);

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
  function download(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function Logout(e) {
    e.preventDefault();
    var status = 0;
    await axios({
      method: "GET",
      url: "http://localhost:8080/db/ManipulateLogin/getloginstate",
      params: {
        mail: cookies.email
      }
    }).then((response) => {
      status = response.status;
    })
    .catch(error => {
      status = error.response.status;
      console.log(error);
    });
    console.log(status)
    console.log(cookies.email);
    if (status === 400) {
      return alert("Your are not autorized. Please Sign in ⚠️")
    } else if (status === 200) {
      var new_status = 0
      await axios({
        method: 'POST',
        url: 'http://localhost:8080/db/ManipulateLogin/switchedLogin',
        data: {
          mail: cookies.email,
          state: false,
        }
      }).then(response => {
        new_status = response.status
      }).catch(err => {
        console.log(err)
      })
    }
    if (new_status === 200) {
      removeCookie('email');
      console.log(cookies.email);
      alert("Succesfully disconnected 🎉");
      await timeout(100);
      navigate('/');
    }
  }

  async function Login(e) {
    e.preventDefault();
    var status = 0;
    await axios({
      method: "GET",
      url: "http://localhost:8080/db/ManipulateLogin/getloginstate",
      params: {
        mail: cookies.email,
      }
    }).then((response) => {
      status = response.status;
    })
    .catch(error => {
      status = error.response.status
      console.log(error);
    });
    if (status === 200) {
      return alert("You are already connected");
    } else {
      navigate("/Login");
    }
    console.log(status)
  }

  async function Register(e) {
    e.preventDefault();
    var status = 0;
    await axios({
      method: "GET",
      url: "http://localhost:8080/db/ManipulateLogin/getloginstate",
      params: {
        mail: cookies.email,
      }
    }).then((response) => {
      status = response.status;
    })
    .catch(error => {
      status = error.response.status
      console.log(error);
    });
    if (status === 200) {
      alert("You are already connected");
      return navigate("/");
    } else {
      navigate("/register");
    }
    console.log(status)
  }


  return (
    <header aria-label="Site Header" className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>

          <div class="md:flex md:items-center md:gap-12">
            <nav aria-label="Site Nav" class="hidden md:block">
              <ul class="flex items-center gap-6 text-sm">
                <li>
                  <a
                    class="no-underline text-lg text-gray-900 transition hover:text-blue-700/75 px-4"
                    href="/areas"
                  >
                    Applets
                  </a>
                </li>

                <li>
                  <a
                    className="no-underline text-lg text-gray-900 transition hover:text-blue-700/75"
                    href="/history"
                  >
                    History
                  </a>
                </li>

                <li>
                  <a
                    className="no-underline text-lg text-gray-900 transition hover:text-blue-700/75 px-4"
                    href="/services"
                  >
                    Services
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="no-underline block w-full rounded bg-blue-600 px-12 py-3 text-sm font-bold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                  role="button"
                  onClick={(e) => Login(e)}
                >
                  Login
                </a>

                <div className="hidden sm:flex">
                  <a
                    className="no-underline block w-full rounded bg-white-400 px-12 py-3 text-sm font-bold text-black shadow hover:bg-gray-200 focus:outline-none focus:ring active:bg-gray-500 sm:w-auto"
                    role="button"
                    onClick={Register}
                  >
                    Register
                  </a>
                </div>
                <div className="hidden sm:flex">
                  <button className="no-underline block w-full rounded bg-red-900 px-12 py-3 text-sm font-bold text-white shadow hover:bg-red-500 focus:outline-none focus:ring active:bg-red-500 sm:w-auto" onClick={Logout}>
                    <a className="no-underline text-white">
                      Logout
                    </a>
                  </button>
                </div>
                <div className="hidden sm:flex">
                  <button className="no-underline block w-full rounded bg-red-600 px-12 py-3 text-sm font-bold text-white shadow hover:bg-red-400 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                    <a
                      className="no-underline text-white"
                      href="app-release.apk"
                      download
                    >
                      Get the mobile apk !
                    </a>
                  </button>
                </div>
              </div>
              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-blue-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
