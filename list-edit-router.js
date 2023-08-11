const express = require("express");
const tareas = require("./tareas");
const router = express.Router();

router.post("/agregarTareas", (req, res) => {
  const id = req.body;
  const descripcion = req.body;
  const estado = req.body;
  tareas.push({
    id,
    descripcion,
    estado,
  });
  res.status(200).send("Tarea agregada con éxito");
});

router.delete("/Eliminar/:id/", (req, res) => {
  const IdSeleccionado = req.params.id;
  const tareaSeleccionada = tareas.findIndex(
    (select) => select.id === Number(IdSeleccionado)
  );
  if (IdSeleccionado !== -1) {
    tareas.splice(tareaSeleccionada, 1);
    res.status(200).send("Tarea Eliminada con éxito");
  } else {
    res.status(404).send("No se pudo eliminar la tarea");
  }
});

router.put("/actualizar/:id", (req, res) => {
  const IdSeleccionado = req.params.id;
  const tareaActualizada = req.body;
  const updateTask = tasks.find((item) => item.id === Number(IdSeleccionado));
  updateTask["descripcion"] = tareaActualizada.descripcion;
  updateTask["estado"] = tareaActualizada.estado;
  res.send(`Tarea con ID ${IdSeleccionado} actualizada exitosamente`);
});

module.exports = router;
