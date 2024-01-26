<template>
  <div class="row-mt-3">
    <br><br>
    <div class="shadow-sm col-md-6 offset-md-3 ">
      <div class="card">
        <h5 class="card-header bg-light text-center"> 
          Actualizar Empresa
        </h5>
        <div class="card-body">
          <form v-on:submit="setEmpresa">
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
              &nbsp;
              &nbsp;
              <button class="btn btn-secondary" type = "button" @click="cancelEditEmpresa"><i class="fa-solid fa-times" style="margin-right: 10px;"></i>Cancelar</button>
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
      direccion:'',
      cif:'',
      email:'',
      telefono:'',
      url: 'http://localhost:4000/edit_empresa',
      cargando: false
    }
  },

  mounted(){
    const ruta = useRoute();
    this.id = ruta.params.id;
    this.url += '/' + this.id;
    console.log(this.url);
    this.getDataEmpresa();

  },

  methods:{

    getDataEmpresa(){
      axios.get(this.url).then(
        res => {
          console.log(JSON.stringify(res));
          this.nombre = res.data[0].nombre;
          this.direccion = res.data[0].direccion;
          this.cif = res.data[0].cif;
          this.email = res.data[0].email;
          this.telefono = res.data[0].telefono;
          console.log(res.data[0].telefono);
        }

      );

    },
    
    setEmpresa(){
      event.preventDefault();
      this.cargando=true;
        var parametros = {
          nombre:this.nombre.trim(), 
          direccion:this.direccion.trim(), 
          cif:this.cif.trim(), 
          email:this.email.trim(), 
          telefono:this.telefono.trim()
        }
        //enviarSolicitud('POST', parametros, this.url, 'Empresa creada')
        axios.post('http://localhost:4000/update_empresa/' + this.id, parametros)
        .then(response => {
          mostrarAlerta('Empresa actualizada con éxito', 'success');
          this.$router.push('/');
        })
        .catch(error => {

          mostrarAlerta('Error al actualizar la empresa', 'error');
        });
      
    },

    cancelEditEmpresa(){
        this.$router.push('/')
    }
  }
}
</script>
