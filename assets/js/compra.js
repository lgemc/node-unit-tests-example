const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito2 = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito2.addEventListener('click', (e) => { compra.eliminarProducto(e) });
    compra.calcularTotal();
    procesarCompraBtn.addEventListener('click', procesarCompra);
}


function procesarCompra(e) {
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2500,
            showConfirmButton: false
        }).then(function () {
            window.location = "productos.html";
        })
        e.preventDefault();
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 2500,
            showConfirmButton: false
        })
        e.preventDefault();
    }
    else {

        var expReg = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        var esValido = expReg.test(correo.value);
        if (!esValido) {
            alert("el correo no es válido");
            e.preventDefault();
            return;
        }
        emailjs.init('-dFH2PTK_YHrv88jH')

        const btn = document.getElementById('procesar-compra');

        document.getElementById('procesar-pago')
            .addEventListener('submit', function (event) {
                event.preventDefault();

                const cargandoGif = document.querySelector('#cargando');
                cargandoGif.style.display = 'block';

                const enviado = document.createElement('img');
                enviado.src = 'assets/img/mail.gif';
                enviado.style.display = 'block';
                enviado.width = '150';

                const serviceID = 'service_crwa7q3';
                const templateID = 'template_hcj80s9';

                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {

                        cargandoGif.style.display = 'none';
                        document.querySelector('#loaders').appendChild(enviado);
                        setTimeout(() => {
                            enviado.remove();
                            compra.vaciarLocalStorage();
                            window.location = "productos.html";
                        }, 2500);

                    }, (err) => {
                        btn.value = 'Send Email';
                        alert(JSON.stringify(err));
                    });
            });

    }
}