import React, { useState } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios'


export default function Register({ Login, error, props }) {
  const [cookies, setCookie] = useCookies(['email']);
  const navigate = useNavigate();
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  async function registerWithEmailPasword(e) {
    e.preventDefault();
    const mail = document.getElementById("mail-register");
    const password = document.getElementById("psswd");
    const value1 = mail?.value || '';
    const value2 = password?.value || '';
    console.log(value1);
    console.log(value2);
    var status = 0;
    await axios({
      method: 'POST',
      url: 'http://localhost:8080/auth/register',
      data: {
        mail: value1,
        password: value2
      }
    }).then(response => {
      console.log(response.status);
      status = response.status;
    }).catch((err) => {
      console.log(err);
    })
    if (status === 400) {
      return alert("Bad info given, need more information");
    } else if (status === 405) {
      return alert("This user already exists please, try with new credentials");
    }
    setCookie('email', value1);
    console.log(cookies.email);
    await timeout(500);
    navigate('/services');
  }
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create a new account today !</h1>

        <p className="mt-4 text-gray-500">
          Join the biggest automation company in the world.
          Take advantage of something is limited to every human ⏳
        </p>
      </div>

      <form action="" className="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="InEmail"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
              id="mail-register"
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              id="psswd"
            />

            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Already have an account ?
            <a className="underline" href="/Login">
              Sign In
            </a>
          </p>

          <button
            className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-bold text-white"
            onClick={(e) => registerWithEmailPasword(e)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
