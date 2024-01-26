<template>
    <div class="row-mt-3">
      <br><br>
      <div class="shadow-sm col-md-6 offset-md-3 ">
        <div class="card">
          <h5 class="card-header bg-light text-center"> 
            Añadir Nuevo Producto
          </h5>
          <div class="card-body">

            <form v-on:submit="addProducto" enctype="multipart/form-data">

                <div class="input-group mb-3 d-flex justify-content-center">
                    <img v-if="this.imagen" height="200" :src="this.imagen" id="fotoimg" class="img-thumbnail" alt="">
                    <img v-else style="width: 200px !important;" src="https://cdn3.iconfinder.com/data/icons/furniture-color-3/512/furniture_living_room_house-26-512.png" id="fotoimg" class="img-thumbnail" alt="">
                
                </div>
                
                <div class="input-group mb-3 ">
                    <span class="input-group-text d-flex "><i class="fa-solid fa-barcode" style="margin-right: 10px;"></i><strong>Referencia</strong></span>
                    <input type="text" v-model="referencia" id ="referencia" placeholder="Ingresa la referencia del producto" required class="form-control">
                 </div>

                
                 <div class="input-group mb-3">
                    <span class="input-group-text d-flex" style="width: fit-content;" ><i class="fa-solid fa-image" ></i></span>
                    <input v-on:change="previsualizarFoto" ref="imagenInput" type="file" accept = "image/jpeg, image/png, image/jpg" class="form-control" style="font-weight: bold;">
                </div>


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
                    <span class="input-group-text d-flex"><i class="fa-solid fa-boxes" style="margin-right: 10px;"></i><strong>Stock</strong></span>
                    <input type="number" v-model="stock" id ="stock" placeholder="Ingresa el stock del producto" required class="form-control">
                </div>

                <!-- Selector de Proveedores -->
                <div class="input-group mb-3">
                    
                    <span class="input-group-text d-flex">
                        <i class="fa-solid fa-building" style="margin-right: 10px;"></i><strong>Proveedor</strong>
                    </span>


                    <select v-model="id_proveedor" id="proveedor" required class="form-control" @change="verificarProveedorNuevo">
                        <option disabled value="">Selecciona un proveedor</option>
                        <option v-for="proveedor in proveedores" :value="proveedor.id_proveedor">{{ proveedor.nombre }}</option>
                    </select>

                    <a @click="abrirPopupNuevoProveedor" class="btn btn-success">
                        <i class="fa fa-plus"></i>
                    </a>
                </div>
                
                <!-- Popup para nuevo proveedor -->

                <div v-if="mostrarPopupNuevoProveedor" class="popup">
                    <a @click="cerrarPopupNuevoProveedor" class="btn btn-icon btn-danger">
                        <i class="fa fa-times"></i>
                    </a>
                    <proveedor-form
                    :url = "urlProveedor"
                    :urlDestino = "urlDestinoProveedor"
                    @proveedorCreado="handleProveedorCreado">
                    </proveedor-form>
    
                </div>

                <div class="col text-center">
                    <button class="btn btn-success "><i class="fa-solid fa-floppy-disk" style="margin-right: 10px;"></i>Guardar</button>
                    &nbsp;
                    &nbsp;
                    <button class="btn btn-success" type = "button" @click="backViewProducto"><i class="fa-solid fa-arrow-left" style="margin-right: 10px;"></i>Volver</button>


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

.popup {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
    width: 55%;  /* Ancho del popup */
    height: 40%; /* Alto del popup */
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    z-index: 1000;
    overflow: auto;
}
.input-group .btn-sm {
    padding: 0 5px;
    margin-right: 5px;
    height: 38px;
}
.btn-icon {
    
    position: absolute;
    top: 10px; /* Ajusta la distancia desde la parte superior */
    right: 10px; /* Ajusta la distancia desde la izquierda */
}
</style>

<script>

    import { toHandlers } from 'vue';
    import {mostrarAlerta, enviarSolicitud} from '../funciones'
    import axios from 'axios';
    import ProveedorForm from './ProveedorForm.vue'


    export default{
        
        components: {
            
            'proveedor-form' : ProveedorForm

        },

        data(){
            return{
                
                imagen:'',
                referencia: '',
                nombre: '',
                descripcion:'',
                tamano:'',
                color:'',
                material:'',
                precio:'',
                stock:0,
                url: 'http://localhost:4000/add_producto',
                urlProveedor: 'http://localhost:4000/add_proveedor',
                urlDestinoProveedor: '/viewP',
                urlDestino: '/viewPr',
                cargando: false,
                esFormulario: true,
                proveedores:[],
                id_proveedor: null,
                mostrarCamposNuevoProveedor:false,
                mostrarPopupNuevoProveedor: false,
                nuevoProveedor:{
                    nombre:'',
                    cif: '',
                    direccion: '',
                    telefono: '',
                    email: '',
                }
            }
        },

        mounted(){

            this.cargarProveedores();

        },

        methods:{

            cargarProveedores(){
                axios.get('http://localhost:4000/proveedores')
                .then(response => {
                this.proveedores = response.data;
                })
                .catch(error => {
                    console.error("Hubo un error al cargar los proveedores: ", error);
                    mostrarAlerta('Error al cargar proveedores', 'error');
                });

            },

            verificarProveedorNuevo(){
                this.mostrarCamposNuevoProveedor = this.id_proveedor === 'nuevo';
            },

            addProducto(event){
                console.log("EJECUTANDO GUARDAR AÑADIR");
                event.preventDefault();
                this.cargando=true;
                if(this.referencia.trim()==''){
                    mostrarAlerta('Ingresa la referencia del producto', 'warning', 'referencia');
                } else if(this.nombre.trim()==''){
                    mostrarAlerta('Ingresa el nombre del producto', 'warning', 'nombre');
                } else if(this.descripcion.trim()==''){
                    mostrarAlerta('Ingresa la descripcion del producto', 'warning', 'descripcion');
                } else if(this.tamano.trim()==''){
                    mostrarAlerta('Ingresa el tamaño del producto', 'warning', 'tamano');
                } else if(this.color.trim()==''){
                    mostrarAlerta('Ingresa el color del producto', 'warning', 'color');
                } else if(this.material.trim()==''){
                    mostrarAlerta('Ingresa el material del producto', 'warning', 'material');
                } else if(this.precio.trim()==''){
                    mostrarAlerta('Ingresa el precio del producto', 'warning', 'precio');
                }
                let formData = new FormData();
                const imagenInput = this.$refs.imagenInput;

                console.log("longitud:", imagenInput.files.length);

                if(imagenInput && imagenInput.files.length > 0) {
                    console.log("Archivo a enviar:", imagenInput.files[0]);
                    formData.append('imagen', imagenInput.files[0]);
                }
                
                formData.append('referencia', this.referencia.trim());
                formData.append('nombre', this.nombre.trim());
                formData.append('descripcion', this.descripcion.trim());
                formData.append('tamano', this.tamano.trim());
                formData.append('color', this.color.trim());
                formData.append('material', this.material.trim());
                formData.append('precio', this.precio.trim());
                formData.append('stock', this.stock);

            
                if (this.id_proveedor && !this.mostrarCamposNuevoProveedor) {
                    formData.append('id_proveedor', this.id_proveedor);
                }
                
                if (this.mostrarCamposNuevoProveedor) {

                    Object.keys(this.nuevoProveedor).forEach(key => {
                        formData.append(key, this.nuevoProveedor[key]);
                    });
                }
                enviarSolicitud('POST', formData, this.url, 'Producto creado', this.urlDestino, this.esFormulario);

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

            abrirPopupNuevoProveedor() {
                this.mostrarPopupNuevoProveedor = true;
            },

            cerrarPopupNuevoProveedor() {
                this.mostrarPopupNuevoProveedor = false;
            },
            handleProveedorCreado(nuevoProveedor){
                this.cerrarPopupNuevoProveedor();
                this.cargarProveedores();
                this.id_proveedor = nuevoProveedor.id;
            },
            backViewProducto(){
                this.$router.push('/viewPr')

            }

        }
    }

</script>