import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono, foco=''){
    if (foco!=''){
        document.getElementById(foco).focus();
    }

    Swal.fire({
        title: titulo,
        icon:icono,
        customClass:{confirmButton: 'btn btn-primary', popup:'animated zooinIn'},
        buttonsStyling:false
    });
}

export function confirmar(urlConSlash, id, titulo, mensaje, urlDestino){
    var url = urlConSlash +id;
    const swalWithBootstrapButton = Swal.mixin({
        customClass:{confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger'},

    
    });
    swalWithBootstrapButton.fire({
        title: titulo,
        text: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si, Eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'}).then((res) =>{
            if (res.isConfirmed){
                enviarSolicitud('DELETE', {id:id}, url, 'Eliminado con éxito', urlDestino);
            } else{
                mostrarAlerta('Operación Cancelada', 'info');
            }
        });

}

export function enviarSolicitud(metodo, parametros, url, mensaje, urlDestino, esFormulario, realizarRedireccion = true) {
    return new Promise((resolve, reject) => {
        const config = {
            method: metodo,
            data: parametros,
            url: url,
            headers: esFormulario ? { 'Content-Type': 'multipart/form-data' } : {}
        };

        axios(config).then(res => {
            var estado = res.status;
            if (estado == 200) {
                mostrarAlerta(mensaje, 'success');
                if (realizarRedireccion) {
                    window.setTimeout(() => {
                        window.location.href = urlDestino;
                    }, 3000);
                } else {
                    resolve(res); 
                }
            } else {
                mostrarAlerta('No se pudo recuperar la respuesta', 'error');
                reject(new Error('Respuesta no exitosa'));
            }
        }).catch(error => {
            mostrarAlerta('Servidor NO Disponible', 'error');
            console.error('Error en la solicitud: ', error);
            reject(error); // Rechaza la promesa con el error
        });
    });
}



