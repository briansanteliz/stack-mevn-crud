<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-info" style="background: #6f42c1 !important;">
      <div class="container">
        <a class="navbar-brand" href="/">STACK MEVN CRUD</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
      </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-md-5 mt-4">
                <div class="card">
                    <div class="card-header">
                       <template v-if="estado">
                        <h5 class="text-center text-uppercase">actualiza una Tarea</h5>
                       </template>
                       <template v-else>
                        <h5 class="text-center text-uppercase">agrega una Tarea</h5>
                       </template>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent ="agregarTarea">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Escribe el titulo" v-model="tarea.titulo" required>
                            </div>
                            <div class="form-group">
                                <input type="email" placeholder="Escribe tu email" class="form-control" required v-model="tarea.email">
                            </div>
                            <div class="form-group">
                                <input type="number" placeholder="Escribe tu telefono" class="form-control" min="0" required v-model="tarea.telefono">
                            </div>
                            <div class="form-group">
                                <textarea class="form-control"  placeholder="Escribe la descripcion" v-model="tarea.descripcion" required></textarea>
                            </div>
                            <div class="form-group">
                               <template v-if="estado">
                                <button type="submit" class="btn btn-warning btn-block text-uppercase text-light" style="border: none;" >Actualizar</button>
                               </template>
                               <template v-else>
                                <button type="submit" class="btn btn-info btn-block text-uppercase" style="border: none;" >enviar</button>
                               </template>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7 mt-4">
                <table class="table table-bordered">
                    <thead>
                        <template v-if="tareasObtenidas.length > 0">
                            <tr>
                                <th>Titulo</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Descripcion</th>
                                <!-- <th>Fecha</th> -->
                                <th>Acciones</th>
                            </tr>
                        </template>
                        <template v-else>
                            <h3 class="text-center text-uppercase">No hay Registros</h3>
                            <p class="text-center">Agrega uno para comenzar</p>
                        </template>
                    </thead>
                    <tbody>
                        <tr v-for="tarea of tareasObtenidas">
                            <td>{{tarea.titulo}}</td>
                            <td>{{tarea.email}}</td>
                            <td>{{tarea.telefono}}</td>
                            <td>{{tarea.descripcion}}</td>
                            <!-- <td>{{tarea.fecha}}</td> -->
                            <td class="d-flex">
                                    <button @click="eliminarTarea(tarea._id)" class=" btn btn-danger mr-3"><i class="fas fa-trash"></i></button>
                            
                            
                                <button @click="actualizarTarea(tarea._id)" class="btn btn-info"><i class="fas fa-pencil-alt"></i></i></button>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
      //clase para agregar una nueva tarea
      class Tarea{
          constructor(titulo, email, telefono, descripcion){
              this.titulo = titulo;
              this.email= email;
              this.telefono = telefono;
              this.descripcion = descripcion;
          }
      }
            
        
    export default{
      
        //datos que usara el CRUD
        data(){
             return {
                //retorna un objeto tarea con los valores de los inputs
                //obtenidos del v-model
                tarea: new Tarea(),
                //arreglo de tareas obtenidos de la api
                tareasObtenidas: [],
                estado:false, //estado para saber si se esta editando
                tareaEditarId: '' //se llenara con el id de la tarea a editar
             }
        },
        //apenas la app se ejecuta se ejecuta este metodo
        created(){
            this.obtenerTareas()
        },
        methods:{            
            //metodo para agregar una tarea 
            agregarTarea(){
                //comprueba si la tarea agregar es para actualizar o es nueva
                if(this.estado){
                    //actualiza una tarea
                    fetch('/api/tareas/' + this.tareaEditarId,{
                        method: 'PUT',
                        body: JSON.stringify(this.tarea),
                        headers:{
                            'Accept':'application/json', 
                        'Content-type':'application/json'
                        }
                       
                    })

                    .then(res=>res.json())
                            .then(data=>this.obtenerTareas()) //actualza el front
                        this.estado = false; //cambia el estado a falso
                }else{
                    //Valida los campos
                    if(this.tarea.titulo === undefined || this.tarea.email === undefined || this.tarea.telefono === undefined  || this.tarea.descripcion === undefined  ){
                     alert('todos los campos son obligatorios')
                     return
                 }
                //envia una peticion a la api del server con los datos de la tarea
                fetch('/api/tareas',{
                    method:'POST', //metodo post
                    body:JSON.stringify(this.tarea), //el cuerpo sera el objeto de tarea pero debe ser un string
                    headers:{
                        'Accept':'application/json', //cabeceras de la peticion
                        'Content-type':'application/json'
                    }
                })
                    .then(res=>res.json())  //res.json devuelve una promesa
                        .then(data=>{
                            //ejecuta el metodo de obtener tareas 
                            this.obtenerTareas()
                        })
                }
                //limpia los inputs al ejecutar el form
                this.tarea = new Tarea()
            },
            obtenerTareas(){
                //realiza peticion get a la api
                fetch('/api/tareas')
                    .then(res=>res.json())
                        .then(data=> {
                            this.tareasObtenidas = data;  //asignados los datos al arreglo
                        })
            },
            eliminarTarea(id){
                //realiza peticion a la api con el metodo delete junto al id
                fetch('/api/tareas/' + id, {
                    method:'DELETE',
                    headers:{
                        'Accept':'application/json', 
                        'Content-type':'application/json'
                    }
                })
                .then(res=>res.json())
                        .then(data=>this.obtenerTareas()) //obtiene las tareas y actualiza el front end
            },
            actualizarTarea(id){
                //obtiene las tareas por id
                fetch('/api/tareas/' + id)
                .then(res=>res.json())
                .then(data=>{
                    //crea un nuevo clase  y lo asigna al objeto tarea, los inputs se actualizan con el valor del dato obtenido
                    this.tarea = new Tarea(data.titulo, data.email, data.telefono, data.descripcion)
                    this.estado = true; //actualiza el estado a true
                    this.tareaEditarId = data._id //asigna el _id
                })
            }
        }
    }
</script>
