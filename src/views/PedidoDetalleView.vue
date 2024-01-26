<template>
  <div class="row-mt-3">
    <br><br>
    <div class="shadow-sm col-md-6 offset-md-3 ">
      <div class="card" style="min-width: 700px !important; margin: 0 auto;">
        <h5 class="card-header bg-light text-center">DETALLE del PEDIDO</h5>
        &nbsp;
        <div class="card-body">
          <div class="d-flex justify-content-between">
          <h6><strong>Número de Pedido: </strong>{{ pedido.id_pedido }}</h6>
          <h6><strong>Fecha: </strong>{{ formatFecha(pedido.fecha) }}</h6>
          </div>
          &nbsp;
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Ref. Producto</th>
                <th>Nombre Producto</th>
                <th>Cantidad</th>
                <th>Precio/ud</th>
                <th>Precio Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="producto in pedido.productos" :key="producto.id_producto">
                <td>{{ producto.id_producto }}</td>
                <td>{{ producto.referencia }}</td>
                <td>{{ producto.nombre_producto }}</td>
                <td>{{ producto.cantidad }}</td>
                <td>{{ producto.precio_unitario | formatoMoneda }}</td>
                <td>{{ producto.precio_total | formatoMoneda }}</td>
              </tr>
            </tbody>
          </table>

          <div class="col text-center">
            <button class="btn btn-success" type="button" @click="cancelViewPedido">
              <i class="fa-solid fa-arrow-left" style="margin-right: 10px;"></i>Volver
            </button>
          </div>
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
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      pedido: {
        id_pedido: 0,
        fecha: '',
        productos: []
      }
    };
  },

  mounted() {
    const ruta = useRoute();
    this.pedido.id_pedido = ruta.params.id;
    this.getDataPedido();
  },

  methods: {
    getDataPedido() {
      axios.get(`http://localhost:4000/pedido_detalle/${this.pedido.id_pedido}`)
        .then(response => {
          if (response.data && response.data.length > 0) {
            this.pedido.fecha = response.data[0].fecha;
            this.pedido.productos = response.data;
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos del pedido:', error);
        });
    },

    formatFecha(fecha) {
      const fechaObj = new Date(fecha);
      const dia = fechaObj.getDate().toString().padStart(2, '0');
      const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
      const anio = fechaObj.getFullYear();
      return `${dia}/${mes}/${anio}`;
    },
    cancelViewPedido() {
  this.$router.push('/viewPe');
  }
},
filters: {
  formatoMoneda(valor) {
  // Formatear el número como moneda
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(valor);
  }
  }
}
</script>
