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
                <th>Id QR</th>
                <th>Imagen</th>
                <th>Referencia</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Tamaño</th>
                <th>Color</th>
                <th>Material</th>
                <th>Precio</th>
                <th style="width: 170px !important;">Acciones</th>
              </tr>
            </thead>
            <tbody class="table-group-divider" id="contenidoP">
              <tr v-if="this.cargando">
                <td colspan="12"><h3>Cargando...</h3></td>
              </tr>
              
              <tr v-else v-for="prod, i in this.productos" :key="prod.id_producto">
                <td v-text="(i+1)"></td>
                <td v-text="prod.id_producto"></td>
                <td v-text="prod.id_codigoqr"></td>
                <td>
                    <img v-if="prod.imagen" style="width: 150px !important;" :src="'http://localhost:4000/'+prod.imagen" class="img-thumbnail" alt="">
                    <img v-else style="width: 100px !important;" src="https://cdn3.iconfinder.com/data/icons/furniture-color-3/512/furniture_living_room_house-26-512.png" class="img-thumbnail" alt="">
                </td>
                <td v-text="prod.referencia"></td>
                <td v-text="prod.nombre"></td>
                <td v-text="prod.descripcion"></td>
                <td v-text="prod.tamano"></td>
                <td v-text="prod.color"></td>
                <td v-text="prod.material"></td>
                <td v-text="prod.precio"></td>
               
                <td>
                  <router-link :to="{path:'viewDetPr/' + prod.id_producto}" class="btn btn-info">
                    <i class="fa-solid fa-eye"></i>
                  </router-link>
                  
                  &nbsp;
                  
                  <router-link :to="{path:'editPr/'+ prod.id_producto}" class="btn btn-warning">
                    <i class="fa-solid fa-edit"></i>
                  </router-link>
                  
                  &nbsp;
                  
                  <button class="btn btn-danger" v-on:click="eliminarProducto(prod.id_producto)">
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
                productos: null,
                cargando: false,
                urlDestino: '/viewPr',
            }
        },

        mounted(){
            this.getProducto();

        },

        methods: {

            getProducto(){
                this.cargando = true;
                axios.get('http://localhost:4000/productos').then(
                    res => {
                        this.productos = res.data;
                        this.cargando = false;
                    }

                );
            },
            
            eliminarProducto(id){
                const producto = this.productos.find(p => p.id_producto === id);
                if (producto){
                    confirmar('http://localhost:4000/delete_producto/', id, 'Eliminar producto', '¿Quieres eliminar el producto ' + producto.nombre + '?', this.urlDestino);
                } else {
                    console.error('Producto no encontrado');
                }
                this.cargando=false;
            }
            
        }
    }
</script>