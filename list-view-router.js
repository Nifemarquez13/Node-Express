const express = require("express");
const tareas = require("./tareas");
const router = express.Router();

const validarParametros = (req, res, next) => {
  const status = req.params.status;
  if (status !== "true" && status !== "false") {
    res
      .status(400)
      .send(
        "Los parámetros de busqueda no son válidos, seleccione (true o false)"
      );
  }
  next();
};

router.get("/", (req, res) => {
  res.status(200).send(tareas);
});

router.get("/:status", validarParametros, (req, res) => {
  const status = req.params.status;
  if (status === "true") {
    const tareasCompletadas = tareas.filter((item) => item.estado);
    if (tareasCompletadas) {
      res.json(tareasCompletadas);
    } else {
      res.status(404).send("No hay tareas completadas");
    }
  } else if (status === "false") {
    const tareasIncompletas = tareas.filter((item) => !item.estado);
    if (tareasIncompletas) {
      res.json(tareasIncompletas);
    } else {
      res.status(404).send("no hay tareas pendientes");
    }
  }
});

module.exports = router;
