const express = require("express");
const listEdit = require("./list-edit-router");
const listView = require("./list-view-router");
const app = express();
const port = 3000;
const host = "localhost";
const login = require("./login");

app.use(express.json());
app.use("/tareas", [listView, listEdit]);
app.use("/login", login);

app.listen(port, host, () => {
  console.log("Servidor encendido");
});
