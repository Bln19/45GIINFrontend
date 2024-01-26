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
                <th>CIF</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody class="table-group-divider" id="contenidoP">
              <tr v-if="this.cargando">
                <td colspan="7"><h3>Cargando...</h3></td>
              </tr>
              
              <tr v-else v-for="prov, i in this.proveedores" :key="prov.id_proveedor">
                <td v-text="(i+1)"></td>
                <td v-text="prov.id_proveedor"></td>
                <td v-text="prov.nombre"></td>
                <td v-text="prov.cif"></td>
                <td v-text="prov.direccion"></td>
                <td v-text="prov.telefono"></td>
                <td v-text="prov.email"></td>
                <td>
                  <!-- <router-link :to="{path:'view/' + prov.id_proveedor}" class="btn btn-info">
                    <i class="fa-solid fa-eye"></i>
                  </router-link>
                  &nbsp; -->
                  
                  <router-link :to="{path:'editP/'+ prov.id_proveedor}" class="btn btn-warning">
                    <i class="fa-solid fa-edit"></i>
                  </router-link>
                  &nbsp;
                  
                  <button class="btn btn-danger" v-on:click="eliminarProveedor(prov.id_proveedor)">
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

    export default {
        data(){
            return{
                proveedores: null,
                cargando: false,
                urlDestino: '/viewP',
            }
        },

        mounted(){
            this.getProveedor();

        },

        methods: {

            getProveedor(){
                this.cargando = true;
                axios.get('http://localhost:4000/proveedores').then(
                    res => {
                        this.proveedores = res.data;
                        this.cargando = false;
                    }

                );
            },
            eliminarProveedor(id){
                const proveedor = this.proveedores.find(p => p.id_proveedor === id);
                if (proveedor){
                    confirmar('http://localhost:4000/delete_proveedor/', id, 'Eliminar proveedor', '¿Quieres eliminar el proveedor ' + proveedor.nombre + '?', this.urlDestino);
                } else {
                    console.error('Proveedor no encontrado');
                }
                this.cargando=false;
            }
        }
    }
</script>