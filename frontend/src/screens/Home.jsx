import React, { useState } from "react";

export const Home = () => {
  const [tipoDocumento, setTipoDocumento] = useState("RUC");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [resultados, setResultados] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState("personas");
  const [consultaRealizada, setConsultaRealizada] = useState(false);
  const [ultimaConsulta, setUltimaConsulta] = useState({
    tipoConsulta: "",
    numeroDocumento: "",
  });
  const [imagenVisible, setImagenVisible] = useState(true);

  const handleTipoConsultaChange = (e) => {
    setTipoConsulta(e.target.value);
  };

  const handleTipoDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
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
      numeroDocumento === ultimaConsulta.numeroDocumento
    ) {
      return (
        <div className="flex flex-col align-middle my-auto items-center justify-center">
          <h2 className="text-lg font-bold mb-4">Resultados:</h2>
          <table className="border border-gray-600 bg-gray-300">
            <tbody>
              {tipoConsulta === "empresas" ? (
                <>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      RUC:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.ruc}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      Nombre de Empresa:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.nombre_o_razon_social}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      Ubigeo:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.ubigeo}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      Departamento:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.departamento}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      Provincia:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.provincia}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      Distrito:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.distrito}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      Dirección:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.direccion_simple}
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      DNI
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.dni}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      Nombre:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {tipoDocumento === "RUC"
                        ? resultados.nombre_o_razon_social
                        : resultados.nombre}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2 font-bold">
                      RUC:
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {resultados.ruc}
                    </td>
                  </tr>
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
        token: "262hDDxDQDuliJVhp24MT5cZKnSYgOwYjvTzzsDIIY0LYcSpztmOwAgjFCVV",
        ruc: numeroDocumento,
      });
    } else if (tipoDocumento === "DNI") {
      url = "https://api.migo.pe/api/v1/dni";
      options.body = JSON.stringify({
        token: "262hDDxDQDuliJVhp24MT5cZKnSYgOwYjvTzzsDIIY0LYcSpztmOwAgjFCVV",
        dni: numeroDocumento,
      });
    }

    setImagenVisible(false); // Ocultar imagen al realizar la búsqueda

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setResultados(response);
        setConsultaRealizada(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4 flex h-screen w-screen bg-gradient-to-br from-orange-500 to-orange-800">
      <div className="w-1/2 relative flex flex-col justify-center items-center">
        <div className="my-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold">
            Buscar Cliente
          </h1>
        </div>
        <div className="mb-4">
          <label className="mr-2 font-bold">Tipo de Consulta:</label>
          <select
            className="p-2 border border-gray-700 rounded"
            value={tipoConsulta}
            onChange={handleTipoConsultaChange}
          >
            <option value="personas">Personas</option>
            <option value="empresas">Empresas</option>
          </select>
        </div>
        {tipoConsulta === "personas" && (
          <div className="mb-4">
            <label htmlFor="tipoDocumento" className="mr-2 font-bold">
              Tipo de Documento:
            </label>
            <select
              id="tipoDocumento"
              className="p-2 border border-gray-700 rounded"
              value={tipoDocumento}
              onChange={handleTipoDocumentoChange}
            >
              <option value="RUC">RUC</option>
              <option value="DNI">DNI</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="numeroDocumento" className="mr-2 font-bold">
            {tipoDocumento === "RUC" ? "RUC:" : "DNI:"}
          </label>
          <input
            className="p-2 border border-gray-700 rounded"
            value={numeroDocumento}
            onChange={handleNumeroDocumentoChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBuscarClick}
        >
          Buscar
        </button>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="relative">
          <img
            src="assets/images/logo-grande.png"
            alt="Imagen"
            className={
              imagenVisible
                ? "transform translate-y-0 opacity-100 transition-all duration-500"
                : "transform -translate-y-full opacity-0 transition-all duration-500"
            }
          />
          {consultaRealizada && renderTabla()}
        </div>
      </div>
    </div>
  );
};
