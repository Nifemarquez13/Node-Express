const express = require("express");
const listEdit = require("./list-edit-router");
const listView = require("./list-view-router");
const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json());
app.use("/tareas", listView);
app.use("/tareas", listEdit);

app.listen(port, host, () => {
  console.log("Servidor encendido");
});
