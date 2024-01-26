import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmpresaView from '../views/EmpresaView.vue'
import EmpresaNew from '../views/EmpresaNew.vue'
import EmpresaEdit from '../views/EmpresaEdit.vue'
import EmpresaDelete from '../views/EmpresaDelete.vue'

import ProeveedorView from '../views/ProveedorView.vue'
import ProeveedorNew from '../views/ProveedorNew.vue'
import ProeveedorEdit from '../views/ProveedorEdit.vue'

import ProveedorForm from '../views/ProveedorForm.vue'

import ProductoView from '../views/ProductoView.vue'
import ProductoNew from '../views/ProductoNew.vue'
import ProductoEdit from '../views/ProductoEdit.vue'
import ProductoDetalleView from '../views/ProductoDetalleView.vue'

import PedidoView from '../views/PedidoView.vue'
import PedidoNew from '../views/PedidoNew.vue'
import PedidoEdit from '../views/PedidoEdit.vue'

import PedidoDetalleView from '../views/PedidoDetalleView.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/viewE/:id',
    name: 'viewEmpresa',
    component: EmpresaView
  },
  {
    path: '/createE',
    name: 'createEmpresa',
    component: EmpresaNew
  },

  {
    path: '/editE/:id',
    name: 'editEmpresa',
    component: EmpresaEdit
  },

  {
    path: '/deleteE/:id',
    name: 'deleteEmpresa',
    component: EmpresaDelete
  },


  {
    path: '/viewP',
    name: 'viewProveedor',
    component: ProeveedorView
  },
  {
    path: '/createP',
    name: 'createProveedor',
    component: ProeveedorNew
  },

  {
    path: '/editP/:id',
    name: 'editProveedor',
    component: ProeveedorEdit
  },

  {
    path: '/formP/',
    name: 'formProveedor',
    component: ProveedorForm
  },

  {
    path: '/viewPr',
    name: 'viewProducto',
    component: ProductoView
  },
  {
    path: '/createPr',
    name: 'createProducto',
    component: ProductoNew
  },
  {
    path: '/editPr/:id',
    name: 'editProducto',
    component: ProductoEdit
  }, 

  {
    path: '/viewDetPr/:id',
    name: 'viewDetalleProducto',
    component: ProductoDetalleView
  },
 

  {
    path: '/viewPe',
    name: 'viewPedido',
    component: PedidoView
  },

  {
    path: '/createPe',
    name: 'createPedido',
    component: PedidoNew
  },

  {
    path: '/viewDetPe/:id',
    name: 'viewDetallePedido',
    component: PedidoDetalleView
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
