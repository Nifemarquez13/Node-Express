const express = require("express");
const app = express();
const port = 3000;
const host = "localhost";

// Definir la lista de tareas
const tasks = [
  {
    id: 0,
    descripcion: "Llenar mi diario de agradecimiento",
    estado: false,
  },
  {
    id: 1,
    descripcion: "Revisar correos y pagos pendientes de la semana",
    estado: true,
  },
  { id: 2, descripcion: "Estudiar plataforma", estado: false },
];

app.get("/tareas", (req, res) => {
  res.status(200).send(tasks);
});

app.listen(port, host, () => {
  console.log("Servidor encendido");
});
