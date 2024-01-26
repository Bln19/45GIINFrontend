<template>
    <div class="row-mt-3">
      <br><br>
      <div class="shadow-sm col-md-6 offset-md-3 ">
        <div class="card">
          <h5 class="card-header bg-light text-center"> 
            Añadir Nueva Empresa
          </h5>
          <div class="card-body">
            <form v-on:submit="addEmpresa">
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-building" style="margin-right: 10px;"></i><strong>Nombre</strong></span>
                <input type="text" v-model="nombre" id ="nombre" placeholder="Ingresa el nombre de la empresa" required class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-map-marker-alt" style="margin-right: 10px;"></i><strong>Dirección</strong></span>
                <input type="text" v-model="direccion" id ="direccion" placeholder="Ingresa la dirección de la empresa" required class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-file-alt" style="margin-right: 10px;"></i><strong>CIF</strong></span>
                <input type="text" v-model="cif" id ="cif" placeholder="Ingresa el CIF de la empresa" required class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-envelope" style="margin-right: 10px;"></i><strong>E-mail</strong></span>
                <input type="text" v-model="email" id ="email" placeholder="Ingresa el e-mail de la empresa" required class="form-control">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-envelope" style="margin-right: 10px;"></i><strong>Teléfono</strong></span>
                <input type="text" v-model="telefono" id ="telefono" placeholder="Ingresa el teléfono de la empresa" required class="form-control">
              </div>
              <div class="col text-center">
                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk" style="margin-right: 10px;"></i>Guardar</button>

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
        url: 'http://localhost:4000/empresa',
        urlDestino: '/',
        cargando: false,
        esFormulario: false
      }
    },

    methods:{
      
      addEmpresa(){
        event.preventDefault();
        this.cargando=true;
        if(this.nombre.trim()==''){
          mostrarAlerta('Ingresa el nombre de la empresa', 'warning', 'nombre');
        } else if(this.direccion.trim()==''){
          mostrarAlerta('Ingresa la dirección de la empresa', 'warning', 'direccion');
        } else if(this.cif.trim()==''){
          mostrarAlerta('Ingresa el CIF de la empresa', 'warning', 'cif');
        } else if(this.email.trim()==''){
          mostrarAlerta('Ingresa el email de la empresa', 'warning', 'email');
        } else if(this.telefono.trim()==''){
          mostrarAlerta('Ingresa el teléfono de la empresa', 'warning', 'telefono');
        } else{
          var parametros = {nombre:this.nombre.trim(), direccion:this.direccion.trim(), cif:this.cif.trim(), email:this.email.trim(), telefono:this.telefono.trim()}
          enviarSolicitud('POST', parametros, this.url, 'Empresa creada', this.urlDestino, this.esFormulario)
        }
      }
    }
  }
</script>
