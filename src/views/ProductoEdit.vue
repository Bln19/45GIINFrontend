<template>
    <div class="row-mt-3">
      <br><br>
      <div class="shadow-sm col-md-6 offset-md-3 ">
        <div class="card">
          <h5 class="card-header bg-light text-center"> 
            Actualizar Producto
          </h5>
          <div class="card-body">

            <form v-on:submit="setProducto" enctype="multipart/form-data">
                <div class="input-group mb-3 d-flex justify-content-center">
                    <img v-if="this.imagen" height="200" :src="this.imagen" id="fotoimg" class="img-thumbnail" alt="">
                    <img v-else style="width: 200px !important;" src="https://cdn3.iconfinder.com/data/icons/furniture-color-3/512/furniture_living_room_house-26-512.png" id="fotoimg" class="img-thumbnail" alt="">
                
                </div>
                
                <div class="input-group mb-3 ">
                    <span class="input-group-text d-flex "><i class="fa-solid fa-barcode" style="margin-right: 10px;"></i><strong>Referencia</strong></span>
                    <input type="text" v-model="referencia" id ="referencia" placeholder="Ingresa la referencia del producto" required class="form-control">
                 </div>
            
                 <div class="input-group mb-3">
                    <span class="input-group-text d-flex" style="width: fit-content;" ><i class="fa-solid fa-upload" ></i></span>
                    <input v-on:change="previsualizarFoto" ref="imagenInput" type="file" accept = "image/jpeg, image/png, image/jpg" class="form-control" style="font-weight: bold;">
                </div>

                <input type="hidden" name="imagenActual" :value="imagenActual">

                <div class="input-group mb-3">
                    <span class="input-group-text d-flex"><i class="fa-solid fa-tag" style="margin-right: 10px;"></i><strong>Nombre</strong></span>
                    <input type="text" v-model="nombre" id ="nombre" placeholder="Ingresa el nombre del producto" required class="form-control">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text d-flex"><i class="fa-solid fa-info-circle" style="margin-right: 10px;"></i><strong>Descripción</strong></span>
                    <input type="text" v-model="descripcion" id ="descripcion" placeholder="Ingresa la descripción del producto" required class="form-control">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text d-flex"><i class="fa-solid fa-expand-arrows-alt" style="margin-right: 10px;"></i><strong>Tamaño</strong></span>
                    <input type="text" v-model="tamano" id ="tamano" placeholder="Ingresa el tamaño del producto" required class="form-control">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text d-flex"><i class="fa-solid fa-palette" style="margin-right: 10px;"></i><strong>Color</strong></span>
                    <input type="text" v-model="color" id ="color" placeholder="Ingresa el color del producto" required class="form-control">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text d-flex"><i class="fa-solid fa-list" style="margin-right: 10px;"></i><strong>Material</strong></span>
                    <input type="text" v-model="material" id ="material" placeholder="Ingresa el material del producto" required class="form-control">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text d-flex"><i class="fa-solid fa-euro-sign" style="margin-right: 10px;"></i><strong>Precio</strong></span>
                    <input type="text" v-model="precio" id ="precio" placeholder="Ingresa el precio del producto" required class="form-control">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text d-flex"><i class="fa-solid fa-boxes" style="margin-right: 10px;"></i><strong>Cantidad</strong></span>
                    <input type="number" v-model="stock" id="stock" placeholder="Ingresa el stock del producto" required class="form-control">
                </div>
             
                <div class="col text-center">
                    <button class="btn btn-success "><i class="fa-solid fa-floppy-disk" style="margin-right: 10px;"></i>Guardar</button>
                    &nbsp;
                    &nbsp;
                    <button class="btn btn-secondary" type = "button" @click="cancelEditProducto"><i class="fa-solid fa-times" style="margin-right: 10px;"></i>Cancelar</button>
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
        idqr:0,
        imagen: '',
        imagenActual:'',
        referencia: '',
        nombre:'',
        descripcion:'',
        tamano:'',
        color:'',
        material:'',
        precio:'',
        stock:'',
        url: 'http://localhost:4000/edit_producto',
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
                if (response.data && response.data.length > 0) {
                const producto = response.data[0];
                this.imagen = producto.imagen ? 'http://localhost:4000/' + producto.imagen : '';
                this.imagenActual = producto.imagen;
                this.referencia = producto.referencia;
                this.nombre = producto.nombre;
                this.descripcion = producto.descripcion;
                this.tamano = producto.tamano;
                this.color = producto.color;
                this.material = producto.material;
                this.precio = producto.precio;
                this.cargarStockProducto(producto.id_producto)
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

        setProducto(event) {
            event.preventDefault();
            this.cargando = true;

            let formData = new FormData();
            const imagenInput = this.$refs.imagenInput;

            if (imagenInput && imagenInput.files.length > 0) {
                formData.append('imagen', imagenInput.files[0]);
            }
            else{
                formData.append('imagenActual', this.imagenActual);
            }

            formData.append('referencia', this.referencia.trim());
            formData.append('nombre', this.nombre.trim());
            formData.append('descripcion', this.descripcion.trim());
            formData.append('tamano', this.tamano.trim());
            formData.append('color', this.color.trim());
            formData.append('material', this.material.trim());
            formData.append('precio', this.precio);
            formData.append('stock', this.stock);

            const urlEditarProducto = `http://localhost:4000/update_producto/${this.id}`;

            axios.post(urlEditarProducto, formData)
            .then(response => {
                mostrarAlerta('Producto actualizado con éxito', 'success');
                this.$router.push('/viewPr');
            })
            .catch(error => {
                mostrarAlerta('Error al actualizar el producto', 'error');
                console.error('Error al actualizar el producto:', error);
            })
            .finally(() => {
                this.cargando = false;
            });
        },
        cancelEditProducto(){
            this.$router.push('/viewPr')
        },

        cargarStockProducto(id_producto){
            
            const url_stock = `http://localhost:4000/get_stock_producto/${id_producto}`;
            console.log(url_stock)
            axios.get(url_stock)
            .then (response => {
                if(response.data){
                    this.stock = response.data.stock;
                }
            })
            .catch (error => {
                console.error('Error al obtener el stock del producto:', error)
            })

        }
    }
  }
  </script>
  