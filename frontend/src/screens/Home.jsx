import React, { useState } from "react";

export const Home = () => {
  const [tipoDocumento, setTipoDocumento] = useState("RUC");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [resultados, setResultados] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState("personas");
  const [ultimaConsulta, setUltimaConsulta] = useState({
    tipoConsulta: "",
    numeroDocumento: "",
  });

  const handleTipoConsultaChange = (e) => {
    setTipoConsulta(e.target.value);
  };

  const handleTipoDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
  };

  const handleNumeroDocumentoChange = (e) => {
    setNumeroDocumento(e.target.value);
  };

  const handleBuscarClick = () => {
    if (
      tipoConsulta === ultimaConsulta.tipoConsulta &&
      numeroDocumento === ultimaConsulta.numeroDocumento
    ) {
      return;
    }
    setUltimaConsulta({ tipoConsulta, numeroDocumento });

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

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tipo de Consulta:
        </label>
        <select
          className="p-2 border border-gray-300 rounded"
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
            className="p-2 border border-gray-300 rounded"
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
          className="p-2 border border-gray-300 rounded"
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

      {resultados.length > 0 &&
        tipoConsulta === ultimaConsulta.tipoConsulta &&
        numeroDocumento === ultimaConsulta.numeroDocumento && (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Resultados:</h2>

            <table className="border border-gray-300">
              <thead>
                <tr>
                  {tipoConsulta === "empresas" ? (
                    <>
                      <th className="border border-gray-300 px-4 py-2">RUC</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Nombre de Empresa
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Ubigeo
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Ciudad
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="border border-gray-300 px-4 py-2">DNI</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Nombres
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Apellidos
                      </th>
                      <th className="border border-gray-300 px-4 py-2">RUC</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {resultados.map((resultado, index) => (
                  <tr key={index}>
                    {tipoConsulta === "empresas" ? (
                      <>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.ruc}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.nombre_o_razon_social}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.ubigeo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.provincia}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.dni}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.nombres}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.apellidos}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.ruc}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};
