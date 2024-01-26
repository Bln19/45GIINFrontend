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
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenidoE">
            <tr v-if="this.cargando">
              <td colspan="5"><h3>Cargando...</h3></td>
            </tr>
            <tr v-else v-for="pedido, i in this.pedido" :key="pedido.id_pedido">
                <td v-text="(i+1)"></td>
                <td v-text="pedido.id_pedido"></td>
                <td>{{ formatFecha(pedido.fecha) }}</td>
                <td :style="{'background-color': pedido.estado === 1 ? '#ddf3e9' : '#FFF5E1'}">
                    <span v-html="formatEstado(pedido.estado)"></span>
                </td>
         
              <td>
                <router-link :to="{path:'viewDetPe/' + pedido.id_pedido}" class="btn btn-info">
                  <i class="fa-solid fa-eye"></i>
                </router-link>
                &nbsp;
                
                <button v-if="pedido.estado === 0" class="btn btn-danger" @click="eliminarPedido(pedido)">
                  <i class="fa-solid fa-trash"></i>
                </button>
                &nbsp;

                <button v-if="pedido.estado === 0" class="btn btn-success" @click="cambiarEstado(pedido.id_pedido)">
                  <i class="fa-solid fa-arrow-right-arrow-left"></i> Enviado
                </button>
                &nbsp;

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
  import {confirmar, enviarSolicitud} from '../funciones'

  export default{
    data(){
      return{
        pedido: null,
        cargando: false,
        urlDestino: '/viewPe'
      }
    },

    mounted(){
      this.getPedidos();

    },
    methods:{

        getPedidos(){
            this.cargando=true;
            axios.get('http://127.0.0.1:4000/pedidos').then(
            res => {
                this.pedido = res.data;
                this.cargando = false;
                
            }
            );
        },
        
        eliminarPedido(id){
          const pedidoEncontrado = this.pedido.find(p => p.id_pedido === id);
          if (pedidoEncontrado){
            confirmar('http://localhost:4000/delete_pedido/', id, 'Eliminar pedido', '¿Quieres eliminar el pedido? ', this.urlDestino);
          } else {
            console.error('Pedido no encontrado');
          }
          this.cargando=false;
        },


        formatFecha(fecha) {
        
            const fechaObj = new Date(fecha);
            const dia = fechaObj.getDate().toString().padStart(2, '0');
            const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
            const anio = fechaObj.getFullYear();
            return `${dia}/${mes}/${anio}`;
        },
        formatEstado(estado) {
            return estado === 1 ? '<strong>Enviado</strong>' : '<strong>Pendiente de enviar</strong>';
        },

        cambiarEstado(idPedido) {
          const url = `http://localhost:4000/update_estado_pedido/${idPedido}`;
          const mensaje = "Estado del pedido actualizado";
          const urlDestino = '/viewPe';
          enviarSolicitud('POST', {}, url, mensaje, urlDestino)
              .then(response => {

                  console.log("Pedido actualizado:", response);
              })
              .catch(error => {

                  console.error("Error al actualizar el pedido:", error);
              });
        }
    }
}
</script>