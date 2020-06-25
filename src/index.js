const express = require("express");
const morgan = require("morgan");
const path = require('path')
const mongoose = require('mongoose')

const app = express();


//rutas
const tareasRuta = require('./routes/tareas')


//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//Archivos Staticos (por defecto el navegador leer los archivos html)
app.use(express.static(path.join(__dirname, 'public')));

//Rutas del servidor
app.use('/tareas', tareasRuta)

//iniciando el servidor y la bd
const start = async () => {
  await app.listen(app.get("port"));
  console.log(`Servidor en el puerto ${app.get("port")}`);
  await mongoose.connect('mongodb://localhost/stack-mevn')
  console.log('db connected')
};
start();
