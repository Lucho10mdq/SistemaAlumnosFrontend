<template>
  <div id="app">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <h1>Agregar Nota</h1>
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="nombre">
                    <label>Promedio</label>
                    <input type="number" max="20" min="0" class="form-control" v-model="promedio">
                    <br>
                    <input id="show-modal" type="button" value="guardar" class="btn btn-success" v-on:click="agregarNota">
                   
                    <input type="button" value="Listar " class="btn btn-danger" v-on:click="listar">
                </div>
                <div class="col-md-6 col-xs-12">

                    <h1 v-if="lista.length > 0">Lista De Notas</h1>
                    <h1 v-else>No existen Notas</h1>
                    <table class="table">
                        <tr>
                            <th>Nombre</th>
                            <th>Promedio</th>
                        </tr>
                        <tr v-for="item in lista" v-bind:style="item.estado==false?'color:red':''" :key="item.id">
                            <td v-text="item.nombre"></td>
                            <td v-text="item.promedio"></td>
                            <td><input type="button" value="Eliminar " class="btn btn-danger" v-on:click="listar"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-xs-12">
                    <p class="text-center">
                        Luchomd10@gmail.com
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
       lista: [ // un array de tipo lista
            ],
            nombre: '', //en estas variables se van a usar para guardar el dato q viene desde los text
            promedio: '',
            
    }
  },
  methods:{
     listar() {
                //estadoA = false;
                axios.get('http://localhost:8000/api/apiJson').then((response) => {
                    this.lista = response.data;
                    this.$toasted.success("Listado Completo", {
                        duration: 2000,
                        position: 'top-right'
                    });
                })
                if (this.lista == '') {
                    this.$toasted.error("No hay datos para mostrar", {
                        duration: 2000,
                        position: 'top-right'
                    });
                }
            },
             agregarNota: function() {
               const estadoA = false;
                if (this.promedio >= 12.5) {
                  const estadoA = true;
                }
                if (this.nombre != '' && this.promedio != '') {
                    const nombreAux = this.nombre;
                    const promedioAux = this.promedio;
                    
                    const data = {
                        nombre: nombreAux ,
                        promedio: promedioAux
                    };
                    //this.lista.push({ nombre: this.nombre, promedio: this.promedio, estado: estadoA }) //push agregar datos al array
                    axios.post('http://localhost:8000/api/agregar',data);
                     this.$toasted.success("Se guardo correctamente", {
                        duration: 2000,
                        position: 'top-center'
                       // icon: 'check'
                    });
                    this.nombre = ""; // inicializamos de nuevo en vacio los text
                    this.promedio = "";
                } else {
                     this.$toasted.error("Debe llenar los campos vacios", {
                        duration: 2000,
                        position: 'top-center'
                       // icon: 'check'
                    });
                }
            }
  }

}
</script>

