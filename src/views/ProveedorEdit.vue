<template>
  <div class="row-mt-3">
    <br><br>
    <div class="shadow-sm col-md-6 offset-md-3 ">
      <div class="card">
        <h5 class="card-header bg-light text-center"> 
          Actualizar Proveedor
        </h5>
        <div class="card-body">
          <form v-on:submit="setProveedor">

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
              <button class="btn btn-secondary" type = "button" @click="cancelEditProveedor"><i class="fa-solid fa-times" style="margin-right: 10px;"></i>Cancelar</button>
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
import {mostrarAlerta, enviarSolicitud} from '../funciones';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default{
  data(){
    return{
      id:0,
      nombre: '',
      cif:'',
      direccion:'',
      telefono:'',
      email:'',
      url: 'http://localhost:4000/edit_proveedor',
      cargando: false
    }
  },

  mounted(){
    const ruta = useRoute();
    this.id = ruta.params.id;
    this.url += '/' + this.id;
    console.log(this.url);
    this.getDataProveedor();

  },

  methods:{

    getDataProveedor(){
      axios.get(this.url).then(
        res => {
          console.log(JSON.stringify(res));
          this.nombre = res.data[0].nombre;
          this.cif = res.data[0].cif;
          this.direccion = res.data[0].direccion;
          this.telefono = res.data[0].telefono;
          this.email = res.data[0].email;
          console.log(res.data[0].telefono);
        }

      );

    },
    
    setProveedor(){
      event.preventDefault();
      this.cargando=true;
        var parametros = {
          nombre:this.nombre.trim(),
          cif:this.cif.trim(), 
          direccion:this.direccion.trim(),
          telefono:this.telefono.trim(),
          email:this.email.trim() 
        }
        //enviarSolicitud('POST', parametros, this.url, 'Empresa creada')
        axios.post('http://localhost:4000/update_proveedor/' + this.id, parametros)
        .then(response => {
          mostrarAlerta('Proveedor actualizado con éxito', 'success');
          this.$router.push('/viewP');
        })
        .catch(error => {
          mostrarAlerta('Error al actualizar el proveedor', 'error');
        });
      
    },
    cancelEditProveedor(){
        this.$router.push('/viewP')
    }

  }
}
</script>
