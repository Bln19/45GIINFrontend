<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <br><br>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>CIF</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenidoE">
            <tr v-if="this.cargando">
              <td colspan="7"><h3>Cargando...</h3></td>
            </tr>
            <tr v-else v-for="empr, i in this.empresa" :key="empr.id_empresa">
              <td v-text="(i+1)"></td>
              <td v-text="empr.id_empresa"></td>
              <td v-text="empr.nombre"></td>
              <td v-text="empr.direccion"></td>
              <td v-text="empr.cif"></td>
              <td v-text="empr.email"></td>
              <td v-text="empr.telefono"></td>
              <td>
                <!-- <router-link :to="{path:'view/' + empr.id_empresa}" class="btn btn-info">
                  <i class="fa-solid fa-eye"></i>
                </router-link> -->
                &nbsp;
                
                <router-link :to="{path:'editE/'+ empr.id_empresa}" class="btn btn-warning">
                  <i class="fa-solid fa-edit"></i>
                </router-link>
                &nbsp;
                
                <button class="btn btn-danger" v-on:click="eliminarEmpresa(empr.id_empresa)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {confirmar} from '../funciones'

  export default{
    data(){
      return{
        empresa: null,
        cargando: false,
        urlDestino: '/'
      }
    },

    mounted(){
      this.getEmpresa();

    },

    methods:{
      getEmpresa(){
        this.cargando=true;
        axios.get('http://127.0.0.1:4000/empresa').then(
          res => {
            this.empresa = res.data;
            this.cargando = false;
            
          }
        );

      },
      eliminarEmpresa(id){
        console.log(this.empresa.id_empresa)
        confirmar('http://127.0.0.1:4000/empresa/'+id, this.empresa.id_empresa, 'Eliminar empresa', '¿Quieres eliminar la empresa '+this.empresa.nombre+' ?', this.urlDestino)
        this.cargando=false;

      }
    }
  }
</script>
