const express = require("express");
const tareas = require("./tareas");
const router = express.Router();

router.use(express.json());

const validarCampos = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    const { id, descripcion, estado } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send("El cuerpo de la solicitud no puede estar vacío.");
    }

    if (!id || !descripcion || !estado) {
      return res
        .status(400)
        .send(
          "Por favor valide que todos los campos (id, descripcion y estado) tengan información "
        );
    }

    if (descripcion.length < 3) {
      return res.status(400).send("La descripción no debe ser tan corta.");
    }

    if (estado !== true && estado !== false) {
      return res.status(400).send("El estado debe ser completado o pendiente.");
    }
  }

  next();
};

router.use(validarCampos);

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
