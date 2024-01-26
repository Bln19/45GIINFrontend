<template>
    <div class="row-mt-3">
      <br><br>
      <div class="shadow-sm col-md-6 offset-md-3 ">
        <div class="card">
          <h5 class="card-header bg-light text-center">Actualizar Pedido</h5>
          <div class="card-body" v-if="pedido">
            <form @submit.prevent="actualizarPedido">
              <div v-for="(producto, index) in pedido.productos" :key="index" class="mb-3">
                <div class="input-group mb-3">
                  <span class="input-group-text d-flex"><i class="fa-solid fa-box" style="margin-right: 10px;"></i><strong>Producto</strong></span>
                  <select v-model="producto.id_producto" class="form-control">
                    <option v-for="prod in listaProductos" :value="prod.id_producto">{{ prod.nombre }}</option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text d-flex"><i class="fa-solid fa-hashtag" style="margin-right: 10px;"></i><strong>Cantidad</strong></span>
                  <input type="number" v-model="producto.cantidad" class="form-control" required>
                </div>
              </div>
              <div class="col text-center">
                <button class="btn btn-success">Actualizar Pedido</button>
                &nbsp;
                <button class="btn btn-secondary" @click="cancelEditPedido">Cancelar</button>
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
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  export default {

    data() {
      return {
        id:0,
        pedido: null,
        listaProductos: [],
        url: 'http://localhost:4000/edit_pedido'
      };
    },
    
    mounted() {
      const ruta = useRoute();
      this.id = ruta.params.id;
      console.log("ID")
      console.log(this.id)
      this.url += '/' + this.id;
      console.log("RUTA")
      console.log(this.url)
      this.cargarPedido(this.id);
      this.cargarProductosDisponibles();
    },

    methods: {
        cargarPedido(idPedido) {
            axios.get(this.url).then(response => {
            this.pedido = response.data;
            }).catch(error => {
                console.error('Error al cargar el pedido:', error);
            });
        },
        cargarProductosDisponibles() {

            axios.get('http://localhost:4000/productos').then(response => {
            this.listaProductos = response.data;
            }).catch(error => {
                console.error('Error al cargar los productos:', error);
            });
        },
    
        cancelEditPedido() {
        this.$router.push('/ViewPe');
        }
    }
}
</script>


  