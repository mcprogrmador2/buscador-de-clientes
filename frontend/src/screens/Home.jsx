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
    if (tipoConsulta === "empresas") {
      setResultados([
        {
          ruc: "12345678901",
          nombre: "Empresa 1",
          dueño: "Dueño 1",
          ciudad: "Ciudad 1",
        },
        {
          ruc: "23456789012",
          nombre: "Empresa 2",
          dueño: "Dueño 2",
          ciudad: "Ciudad 2",
        },
        {
          ruc: "34567890123",
          nombre: "Empresa 3",
          dueño: "Dueño 3",
          ciudad: "Ciudad 3",
        },
      ]);
    } else if (tipoConsulta === "personas") {
      setResultados([
        {
          dni: "12345678",
          nombres: "Persona 1",
          apellidos: "Apellido 1",
          ruc: "12345678901",
        },
        {
          dni: "23456789",
          nombres: "Persona 2",
          apellidos: "Apellido 2",
          ruc: "23456789012",
        },
        {
          dni: "34567890",
          nombres: "Persona 3",
          apellidos: "Apellido 3",
          ruc: "34567890123",
        },
      ]);
    }
    setUltimaConsulta({ tipoConsulta, numeroDocumento });
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
                        Dueño
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
                          {resultado.nombre}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.dueño}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {resultado.ciudad}
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
