const { Router } = require("express");

const router = Router();

//modelo de tareas
const Tarea = require("../model/Tareas");

//api para manejar las tareas
router.get("/", async (req, res) => {
  const resp = await Tarea.find(); //consulta la bd todas las tareas
  res.json(resp);
});

router.post("/", async (req, res) => {
  const { titulo, descripcion } = req.body;
  //crea una tarea con los datos del req.body
  const tareaGuardada = new Tarea({
    titulo,
    descripcion,
  });
  await tareaGuardada.save(); //guarda la tarea en mongodb
  res.status(200).json({ status: "Guardado", data: tareaGuardada });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const eliminado = await Tarea.findByIdAndDelete({ _id: id });
  if (eliminado) {
    res.status(200).json({ status: "Eliminado" });
  } else {
    res.status(404).json({ status: "Este dato no existe" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;
  await Tarea.findByIdAndUpdate({ _id: id }, { titulo, descripcion });
  res.status(200).json({ status: "dato actualizado" });
});
module.exports = router;
