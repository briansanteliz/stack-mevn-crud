const mongoose = require("mongoose");
const { Schema } = mongoose;
//definiendo el Schema de las tareas
const tareaSchema = new Schema({
  titulo: String,
  email: String,
  telefono: Number,
  descripcion: String,
  fecha: { type: Date, default: Date.now },
});

//exportando y creando el modelo de los datos
module.exports = mongoose.model("Tareas", tareaSchema);
