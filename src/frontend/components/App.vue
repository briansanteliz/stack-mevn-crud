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
            <div class="col-md-5 p-4">
                <div class="card">
                    <div class="card-header">
                        <h5 class="text-center text-uppercase">Agrega una Tarea</h5>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent ="agregarTarea">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Escribe el titulo" v-model="tarea.titulo">
                            </div>
                            <div class="form-group">
                                <textarea class="form-control"  placeholder="Escribe la descripcion" v-model="tarea.descripcion"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-info btn-block text-uppercase" style="border: none;" >enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default{
        //datos que usara el CRUD
        data(){
             return {
                //retorna un objeto tarea con los valores de los inputs
                //obtenidos del v-model
                tarea:{
                    titulo:'',
                    descripcion:''
                }
             }
        },
        methods:{
            //metodo para agregar una tarea
            agregarTarea(){
                console.log(this.tarea)
                //limpia los inputs del form añ ejecutar el form
                this.tarea.titulo="";
                this.tarea.descripcion="";
            }
        }
    }
</script>
