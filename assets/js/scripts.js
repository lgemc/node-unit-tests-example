jQuery('document').ready(function ($) {

    //menu
    var menuBtn = $('.menu-icon'),
        menu = $('.navigation ul');

    menuBtn.click(function () {
        if (menu.hasClass('show')) {
            menu.removeClass('show');
        } else {
            menu.addClass('show');
        }
    });

    //carrito-menu
    var carritoMenuBtn = $('.car'),
        carritomenu = $('.dropdown-menu');

    carritoMenuBtn.click(function () {
        if (carritomenu.hasClass('show')) {
            carritomenu.removeClass('show');
        } else {
            carritomenu.addClass('show');
        }
    });

});


//productos
let imagenes = document.querySelectorAll('.card-img');
let modal = document.querySelector('#modal');
let img = document.querySelector('#modal-img');
let boton = document.querySelector('#modal-boton');


//validar correo
function validarCorreo(correo, e) {
    var expReg = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    var esValido = expReg.test(correo);
    if (esValido == true) {
        console.log("es valido el correo");
        procesarCompra(e);
    }
    else {
        alert("el correo no es válido");
        return;
    }
}

//validar nombres
function sololetras(e) {
    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key).toLowerCase();
    letras = " abcdefghijklmnñopqrstuvwxyzáéíóúü";
    especiales = "8-37-38-46-164";
    teclado_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            teclado_especial = true; break;
        }
    }
    if (letras.indexOf(teclado) == -1 && !teclado_especial) {
        return false;
    }
}

/**
 * @param {Number} value 
 */
function format_currency(value) {
    return value.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
}