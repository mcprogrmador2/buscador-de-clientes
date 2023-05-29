import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const logged = useSelector((state) => state.isLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:4000/api/trabajadores/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: "include" }
      )
      .then(({ data }) => dispatch(loginSuccess(data.user)))
      .then(() => setRedirect(true))
      .catch((e) => console.log(e));
  };

  if (redirect) {
    return <Navigate to={"/home"} />;
  }

  {
    /** */
  }
  if (logged === true) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-[#FB5001] to-[#FB8D01]">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Inicio de sesión
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-white hover:bg-orange-700 text-orange-700 hover:text-white border border-orange-700 font-bold py-2 px-12 rounded-3xl focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};
