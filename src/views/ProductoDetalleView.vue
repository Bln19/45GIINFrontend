<template>
    <div class="row-mt-3">
      <br><br>
      <div class="shadow-sm col-md-6 offset-md-3 ">
        <div class="card" style="min-width: 700px !important; margin: 0 auto;" >
            
          
            <h5 class="card-header bg-light text-center"> 
            <strong>DETALLE PRODUCTO</strong>
            </h5>
          
          
            <div class="card-body">
                
                <div class="images-container">

                    <div class="image-wrapper">
                        <img v-if="this.imagen" height="200" :src="this.imagen" id="fotoimg" class="img-thumbnail" alt="">
                        <img v-else style="width: 200px !important;" src="https://cdn3.iconfinder.com/data/icons/furniture-color-3/512/furniture_living_room_house-26-512.png" id="fotoimg" class="img-thumbnail" alt="">
                    </div>

                    <div class="image-wrapper">
                        <img v-if="this.imagenCodigoQR" style="max-width: 250px !important;" :src="this.imagenCodigoQR" class="img-thumbnail" alt="Código QR">
                        <img v-else style="max-width: 200px !important;" src="https://cdn1.iconfinder.com/data/icons/basic-ui-169/32/Qr_Code-512.png" class="img-thumbnail" alt="Sin imagen QR">
                    </div>        
                    
                </div>
         

            <h6 class="card-header bg-light text-left" style="margin-top: 50px; margin-bottom: 20px; border-bottom: none;"> 
                <strong>CARACTERÍSTICAS</strong>
            </h6>
            <div class="input-group mb-3 ">
                <span class="input-group-text d-flex "><i class="fa-solid fa-barcode" style="margin-right: 10px;"></i><strong>Referencia</strong></span>
                <input type="text" v-model="referencia" id ="referencia" required class="form-control" readonly>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-tag" style="margin-right: 10px;"></i><strong>Nombre</strong></span>
                <input type="text" v-model="nombre" id ="nombre" required class="form-control" readonly>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-info-circle" style="margin-right: 10px;"></i><strong>Descripción</strong></span>
                <input type="text" v-model="descripcion" id ="descripcion" required class="form-control" readonly>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-expand-arrows-alt" style="margin-right: 10px;"></i><strong>Tamaño</strong></span>
                <input type="text" v-model="tamano" id ="tamano" required class="form-control" readonly>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-palette" style="margin-right: 10px;"></i><strong>Color</strong></span>
                <input type="text" v-model="color" id ="color" required class="form-control" readonly>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-list" style="margin-right: 10px;"></i><strong>Material</strong></span>
                <input type="text" v-model="material" id ="material" required class="form-control" readonly>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-euro-sign" style="margin-right: 10px;"></i><strong>Precio</strong></span>
                <input type="text" v-model="precio" id ="precio" required class="form-control" readonly>
            </div>



            <h6 class="card-header bg-light text-left" style="margin-top: 20px; margin-bottom: 20px; border-bottom: none;"> 
                <strong>STOCK</strong>
            </h6>

            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-boxes" style="margin-right: 10px;"></i><strong>Cantidad</strong></span>
                <input type="text" v-model="stock" id="stock" required class="form-control" readonly>
            </div>



            <h6 class="card-header bg-light text-left" style="margin-top: 20px; margin-bottom: 20px; border-bottom: none;"> 
                <strong>PROVEEDOR</strong>
            </h6>

            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-key" style="margin-right: 10px;"></i><strong>ID Proveedor</strong></span>
                <input type="text" v-model="id_proveedor" id="id_proveedor" class="form-control" readonly>
            </div>

            
            <div class="input-group mb-3">
              <span class="input-group-text d-flex"><i class="fa-solid fa-building" style="margin-right: 10px;"></i><strong>Nombre</strong></span>
              <input type="text" v-model="nombre_proveedor" id ="nombre_proveedor" required class="form-control" readonly>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text d-flex"><i class="fa-solid fa-file-alt" style="margin-right: 10px;"></i><strong>CIF Proveedor</strong></span>
                <input type="text" v-model="cif_proveedor" id="cif_proveedor" class="form-control" readonly>
            </div>

             
            <div class="col text-center">
                <button class="btn btn-success" type = "button" @click="cancelViewProducto"><i class="fa-solid fa-arrow-left" style="margin-right: 10px;"></i>Volver</button>
            </div>


          </div>
        </div>
      </div>
    </div>
</template>
  
<style scoped>


    .images-container {
        display: flex;
        justify-content: space-between; /* Alinea los elementos a los extremos */
    }
    .image-wrapper {
        flex: 1; /* Hace que cada contenedor de imagen ocupe espacio igual */

    }
    .input-group-text {
      width: 150px;
      display: inline-block;
    }
    .img-thumbnail {
    display: block;
    max-width: 300px; 
    max-height: 300px; 
    width: auto; 
    height: auto; 
    object-fit: contain;
    margin: 0 auto; 
    }
</style>

<script>
  import {mostrarAlerta} from '../funciones';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  export default{
    data(){
      return{
        id:0,
        id_codigoqr:0,
        id_proveedor:'',
        imagenCodigoQR: '',
        imagen: '',
        imagenActual:'',
        referencia: '',
        nombre: '',
        descripcion:'',
        tamano:'',
        color:'',
        material:'',
        precio:'',
        nombre_proveedor:'',
        cif_proveedor:'',
        stock: 0,
        url: 'http://localhost:4000/producto_detalle',
        cargando: false
      }
    },
  
    mounted(){
      const ruta = useRoute();
      this.id = ruta.params.id;
      this.url += '/' + this.id;
      console.log(this.url);
      this.getDataProducto();
  
    },
  
    methods:{

        
        getDataProducto() {
            axios.get(this.url)
            .then(response => {
                console.log(JSON.stringify(response));
                if (response.data && response.data.length > 0) {
                const producto = response.data[0];
                this.id_codigoqr = producto.id_codigoqr;
                this.imagen = producto.imagen ? 'http://localhost:4000/' + producto.imagen : '';
                this.imagenCodigoQR = producto.imagenCodigoQR ? 'http://localhost:4000/' + producto.imagenCodigoQR : '';
                this.imagenActual = producto.imagen;
                this.referencia = producto.referencia;
                this.nombre = producto.nombre;
                this.descripcion = producto.descripcion;
                this.tamano = producto.tamano;
                this.color = producto.color;
                this.material = producto.material;
                this.precio = producto.precio;
                this.stock = producto.stock;
                this.id_proveedor = producto.id_proveedor;
                this.nombre_proveedor = producto.nombre_proveedor;
                this.cif_proveedor = producto.cif_proveedor;
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos del producto:', error);
            });
        },

        previsualizarFoto(event){
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function(){
                var miFoto = document.getElementById('fotoimg');
                miFoto.src = reader.result;
                this.imagen = miFoto.src;
            }


        },

        cancelViewProducto(){
            this.$router.push('/viewPr')
        }
    }
  }
  </script>