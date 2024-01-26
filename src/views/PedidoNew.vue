<template>
    <div class="row-mt-3">
      <br><br>
      <div class="shadow-sm col-md-6 offset-md-3">
        <div class="card">
          <h5 class="card-header bg-light text-center">Realizar Pedido</h5>
          <div class="card-body">
            <form @submit.prevent="crearPedido">
              <div v-for="(producto, index) in productos" :key="index" class="mb-3">
                <h5>Producto {{ index + 1 }}</h5>
              
                <div class="input-group">
                  <span class="input-group-text d-flex"><i class="fa-solid fa-box" style="margin-right: 10px;"></i><strong>Producto</strong></span>
                  <select v-model="producto.nombre" @change="asignarIdProducto(index)" class="form-control">
                    <option disabled value="">{{ producto.nombre ? '' : 'Selecciona un producto' }}</option>
                    <option v-for="prod in listaProductos" :value="prod.nombre">{{ prod.nombre }}</option>
                  </select>
                </div>
                <div class="input-group mt-2">
                  <span class="input-group-text d-flex"><i class="fa-solid fa-boxes" style="margin-right: 10px;"></i> <strong>Cantidad</strong> </span>
                  <input type="number" v-model="producto.cantidad" class="form-control" placeholder="Cantidad" required>
                </div>
              </div>
              <button type="button" class="btn btn-secondary mt-3" @click="addProducto">Añadir Producto</button>
              <div class="col text-center mt-3">
                <button class="btn btn-success">Realizar Pedido</button>
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
    select {
    appearance: none;
    background-image: url('https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/down-bottom-arrow-512.png');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 15px;
    color: #666565;
    }


</style>


  
  <script>

  import axios from 'axios';
  import {mostrarAlerta, enviarSolicitud} from '../funciones'

  
  export default {
    data() {
        return {
            productos: [{
                nombre: '', cantidad: '', id_producto: null }],
                listaProductos: [], // Lista de productos disponibles
                url: 'http://localhost:4000/add_pedido'
        };
    },
    mounted() {
        // Cargar la lista de productos disponibles
        axios.get('http://localhost:4000/productos')
        .then(response => {
        this.listaProductos = response.data;
        })
        .catch(error => {
        console.error('Error al cargar los productos:', error);
        });
    },
    methods: {
        addProducto() {
        this.productos.push({ nombre: '', cantidad: '', id_producto: null });
        },
        
        asignarIdProducto(index) {
            const productoSeleccionado = this.listaProductos.find(prod => prod.nombre === this.productos[index].nombre);
            if (productoSeleccionado) {
            this.productos[index].id_producto = productoSeleccionado.id_producto;
            }
        },
        crearPedido() {
            const productosParaEnviar = this.productos.filter(prod => prod.id_producto && prod.cantidad);
            if (productosParaEnviar.length === 0) {
                mostrarAlerta('Por favor, añade al menos un producto con cantidad válida', 'warning');
                return;
            }

            enviarSolicitud('POST', { productos: productosParaEnviar }, this.url, 'Pedido creado con éxito', '/viewPe')
                .then(response => {
                this.productos = [{ nombre: '', cantidad: '', id_producto: null }]; 
                })
                .catch(error => {
                console.error('Error al crear el pedido: ', error);
                mostrarAlerta('Error al crear el pedido', 'error');
                });
        }
    }
}
</script>