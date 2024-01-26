<template>
    <div class="row-mt-3">
      <br><br>
      <div class="shadow-sm col-md-6 offset-md-3 ">
        <div class="card">
          <h5 class="card-header bg-light text-center"> 
            Añadir Nuevo Proveedor
          </h5>
          <div class="card-body">

            <form v-on:submit="addProveedor">
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-building" style="margin-right: 10px;"></i><strong>Nombre</strong></span>
                <input type="text" v-model="nombre" id ="nombre" placeholder="Ingresa el nombre del proveedor" required class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-file-alt" style="margin-right: 10px;"></i><strong>CIF</strong></span>
                <input type="text" v-model="cif" id ="cif" placeholder="Ingresa el CIF del proveedor" required class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-map-marker-alt" style="margin-right: 10px;"></i><strong>Dirección</strong></span>
                <input type="text" v-model="direccion" id ="direccion" placeholder="Ingresa la dirección del proveedor" required class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-envelope" style="margin-right: 10px;"></i><strong>Teléfono</strong></span>
                <input type="text" v-model="telefono" id ="telefono" placeholder="Ingresa el teléfono del proveedor" required class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-envelope" style="margin-right: 10px;"></i><strong>E-mail</strong></span>
                <input type="text" v-model="email" id ="email" placeholder="Ingresa el e-mail del proveedor" required class="form-control">
              </div>
             
              <div class="col text-center">
                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk" style="margin-right: 10px;"></i>Guardar</button>
                &nbsp;
                &nbsp;
                <button class="btn btn-success" type = "button" @click="backViewProveedor"><i class="fa-solid fa-arrow-left" style="margin-right: 10px;"></i>Volver</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.input-group-text {
    width: 150px;
    display: inline-block;
}
</style>

<script>
  import {mostrarAlerta, enviarSolicitud} from '../funciones'

  export default{
    data(){
      return{
        nombre: '',
        direccion:'',
        cif:'',
        email:'',
        telefono:'',
        url: 'http://localhost:4000/add_proveedor',
        urlDestino: '/viewP',
        cargando: false,
        esFormulario: false
      }
    },

    methods:{
    
        addProveedor(){
            event.preventDefault();
            this.cargando=true;
            if(this.nombre.trim()==''){
                mostrarAlerta('Ingresa el nombre del proveedor', 'warning', 'nombre');
            } else if(this.cif.trim()==''){
                mostrarAlerta('Ingresa el CIF del proveedor', 'warning', 'cif');
            } else if(this.direccion.trim()==''){
                mostrarAlerta('Ingresa la dirección del proveedor', 'warning', 'direccion');
            } else if(this.telefono.trim()==''){
                mostrarAlerta('Ingresa el teléfono del proveedor', 'warning', 'telefono');
            } else if(this.email.trim()==''){
                mostrarAlerta('Ingresa el email del proveedor', 'warning', 'email');
            } else{
                var parametros = {nombre:this.nombre.trim(), cif:this.cif.trim(), direccion:this.direccion.trim(), telefono:this.telefono.trim(), email:this.email.trim()}
                enviarSolicitud('POST', parametros, this.url, 'Proveedor creado', this.urlDestino, this.esFormulario)
            }
        },
        backViewProveedor (){
          this.$router.push('/viewP')

        }
    }
    }
</script>