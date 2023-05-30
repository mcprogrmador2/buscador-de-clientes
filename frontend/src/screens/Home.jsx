import React, { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { addRegisterSuccess } from "../features/registerSlice";
import { Navigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export const Home = () => {
  const [tipoDocumento, setTipoDocumento] = useState("RUC");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [numeroDocumentoTemp, setNumeroDocumentoTemp] = useState("");
  const [resultados, setResultados] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState("personas");
  const [consultaRealizada, setConsultaRealizada] = useState(false);
  const [ultimaConsulta, setUltimaConsulta] = useState({
    tipoConsulta: "",
    numeroDocumento: "",
  });
  const [imagenVisible, setImagenVisible] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  if (user == null) {
    return <Navigate to={"/"} />;
  }

  const handleTipoConsultaChange = (e) => {
    setTipoConsulta(e);
  };

  const handleTipoDocumentoChange = (e) => {
    setTipoDocumento(e);
  };

  const handleNumeroDocumentoChange = (e) => {
    const inputValue = e.target.value;

    if (
      (tipoConsulta === "personas" &&
        tipoDocumento === "RUC" &&
        inputValue.length > 0 &&
        (!inputValue.startsWith("1") || inputValue.length > 11)) ||
      (tipoConsulta === "empresas" &&
        inputValue.length > 0 &&
        (!inputValue.startsWith("2") || inputValue.length > 11))
    ) {
      setNumeroDocumento("");
      return;
    }

    setNumeroDocumento(inputValue);
  };

  const renderTabla = () => {
    if (
      tipoConsulta === ultimaConsulta.tipoConsulta &&
      numeroDocumentoTemp === ultimaConsulta.numeroDocumento
    ) {
      return (
        <div
          className={`${
            imagenVisible
              ? "transform translate-y-full opacity-0 hidden transition-all duration-500"
              : "transform translate-y-0 opacity-100 transition-all duration-500"
          } flex flex-col align-middle my-auto items-center justify-center relative`}
        >
          <table className="border border-gray-600 bg-white">
            <tbody>
              {tipoConsulta === "empresas" ? (
                <>
                  <tr>
                    <td className="border border-orange-600 px-4 py-2 font-bold">
                      RUC:
                    </td>
                    <td className="border border-orange-600 px-4 py-2">
                      {resultados.ruc}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-orange-600 px-4 py-2 font-bold">
                      Nombre de Empresa:
                    </td>
                    <td className="border border-orange-600 px-4 py-2">
                      {resultados.nombre_o_razon_social}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-orange-600 px-4 py-2 font-bold">
                      Ubigeo:
                    </td>
                    <td className="border border-orange-600 px-4 py-2">
                      {resultados.ubigeo}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-orange-600 px-4 py-2 font-bold">
                      Departamento:
                    </td>
                    <td className="border border-orange-600 px-4 py-2">
                      {resultados.departamento}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-orange-600 px-4 py-2 font-bold">
                      Provincia:
                    </td>
                    <td className="border border-orange-600 px-4 py-2">
                      {resultados.provincia}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-orange-600 px-4 py-2 font-bold">
                      Distrito:
                    </td>
                    <td className="border border-orange-600 px-4 py-2">
                      {resultados.distrito}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-orange-600 px-4 py-2 font-bold">
                      Dirección:
                    </td>
                    <td className="border border-orange-600 px-4 py-2">
                      {resultados.direccion_simple}
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {tipoDocumento === "DNI" ? (
                    <>
                      <tr>
                        <td className="border border-orange-600 px-4 py-2 font-bold">
                          DNI
                        </td>
                        <td className="border border-orange-600 px-4 py-2">
                          {resultados.dni}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-orange-600 px-4 py-2 font-bold">
                          Nombre:
                        </td>
                        <td className="border border-orange-600 px-4 py-2">
                          {resultados.nombre}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="border border-orange-600 px-4 py-2 font-bold">
                          RUC
                        </td>
                        <td className="border border-orange-600 px-4 py-2">
                          {resultados.ruc}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-orange-600 px-4 py-2 font-bold">
                          Nombre:
                        </td>
                        <td className="border border-orange-600 px-4 py-2">
                          {resultados.nombre_o_razon_social}
                        </td>
                      </tr>
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleBuscarClick = () => {
    const nuevaConsulta = {
      tipoConsulta: tipoConsulta,
      numeroDocumento: numeroDocumento,
    };

    if (
      nuevaConsulta.tipoConsulta === ultimaConsulta.tipoConsulta &&
      nuevaConsulta.numeroDocumento === ultimaConsulta.numeroDocumento
    ) {
      return;
    }
    setUltimaConsulta(nuevaConsulta);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    };

    let url = "";

    if (tipoDocumento === "RUC") {
      url = "https://api.migo.pe/api/v1/ruc";
      options.body = JSON.stringify({
        token: "tGm6t6AIKu8vUkZN9pjS8urjD1YNRiXwvmEgnGpGPUe25qpZVz1SdHyduJei",
        ruc: numeroDocumento,
      });
    } else if (tipoDocumento === "DNI") {
      url = "https://api.migo.pe/api/v1/dni";
      options.body = JSON.stringify({
        token: "tGm6t6AIKu8vUkZN9pjS8urjD1YNRiXwvmEgnGpGPUe25qpZVz1SdHyduJei",
        dni: numeroDocumento,
      });
    }

    setImagenVisible(false);

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setResultados(response);
        setConsultaRealizada(true);
      })
      .catch((err) => console.error(err));
  };

  const handleRegistro = async () => {
    const currentTime = new Date().toISOString();

    await axios
      .post(`http://localhost:4000/api/registros`, {
        tiempo: currentTime,
        autor: user.id,
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento.toString(),
      },
      { withCredentials: "include" })
      .then(({ data }) => dispatch(addRegisterSuccess(data.register)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4 flex flex-col md:flex-row min-h-screen md:h-screen w-screen bg-gradient-to-br from-[#FB5001] to-[#FB8D01]">
      <div className="w-20 h-20 absolute m-4 p-3 justify-start rounded-full border-4 border-white overflow-hidden">
        <img
          src="assets/images/logo-white.png"
          alt="logo"
          className="max-w-full max-h-full mx-auto object-cover"
        />
      </div>
      <button
        className="absolute flex items-center top-0 right-0 m-4 p-2 bg-white hover:bg-orange-700 text-orange-700 hover:text-white font-bold py-2 px-6 rounded-3xl"
        onClick={handleLogout}
      >
        Logout
        <MdLogout className="ml-2" />
      </button>

      <div className="md:w-1/2 relative h-auto mt-24 md:mt-0 flex flex-col justify-center items-center">
        <div className="my-8">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white font-bold">
            Buscar Cliente
          </h1>
        </div>

        <div className="my-2 flex w-full justify-center">
          <button
            className={`p-2 flex items-center justify-center border w-1/2 max-w-[150px] xl:max-w-[200px] ${
              tipoConsulta === "personas" ? "bg-white" : "bg-black text-white"
            }`}
            onClick={() => {
              if (tipoConsulta === "personas") return;
              handleTipoConsultaChange("personas");
              setNumeroDocumento("");
              setImagenVisible(true);
            }}
          >
            Personas
            <FaUser className="ml-2" />
          </button>
          <button
            className={`p-2 flex items-center justify-center border w-1/2 max-w-[150px] xl:max-w-[200px] ${
              tipoConsulta === "empresas" ? "bg-white" : "bg-black text-white"
            }`}
            onClick={() => {
              if (tipoConsulta === "empresas") return;
              handleTipoConsultaChange("empresas");
              handleTipoDocumentoChange("RUC");
              setNumeroDocumento("");
              setImagenVisible(true);
            }}
          >
            Empresas
            <FaBuilding className="ml-2" />
          </button>
        </div>
        {tipoConsulta === "personas" && (
          <div className="my-2 flex w-full justify-center">
            <button
              className={`p-2 border w-1/2 max-w-[150px] xl:max-w-[200px] ${
                tipoDocumento === "RUC" ? "bg-white" : "bg-black text-white"
              }`}
              onClick={() => {
                if (tipoDocumento === "RUC") return;
                handleTipoDocumentoChange("RUC");
                setNumeroDocumento("");
                setImagenVisible(true);
              }}
            >
              RUC
            </button>
            <button
              className={`p-2 border w-1/2 max-w-[150px] xl:max-w-[200px] ${
                tipoDocumento === "DNI" ? "bg-white" : "bg-black text-white"
              }`}
              onClick={() => {
                if (tipoDocumento === "DNI") return;
                handleTipoDocumentoChange("DNI");
                setNumeroDocumento("");
                setImagenVisible(true);
              }}
            >
              DNI
            </button>
          </div>
        )}
        <div className="my-8 flex w-full justify-center">
          <input
            className="p-2 border border-orange-600 w-full max-w-[300px] xl:max-w-[400px]"
            value={numeroDocumento}
            onChange={handleNumeroDocumentoChange}
            placeholder={tipoDocumento === "RUC" ? "RUC" : "DNI"}
          />
        </div>
        <button
          className="bg-white hover:bg-orange-700 text-orange-700 hover:text-white font-bold py-2 px-12 rounded-3xl"
          onClick={() => {
            if (numeroDocumento.trim() !== "") {
              handleBuscarClick();
              setNumeroDocumentoTemp(numeroDocumento);
              handleRegistro();
            }
          }}
        >
          Buscar
        </button>
      </div>
      <div className="md:w-1/2 h-auto my-auto relative flex flex-col justify-center items-center">
        <div className="absolute">
          <img
            src="assets/images/logo-grande.png"
            alt="Imagen"
            className={`${
              imagenVisible
                ? "transform translate-y-0 opacity-100 transition-all duration-500"
                : "transform -translate-y-full opacity-0 transition-all duration-500"
            } w-full max-w-[200px] md:max-w-[400px] xl:max-w-[500px]`}
          />
        </div>
        <div className="absolute top-0 md:top-auto">
          {consultaRealizada && renderTabla()}
        </div>
      </div>
    </div>
  );
};
