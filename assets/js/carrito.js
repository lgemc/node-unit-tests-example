export default class Carrito {
  //Añadir el producto al carrito
  comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
      const producto = e.target.parentElement;
      this.leerDatosProducto(producto);
      //console.log(producto);
    }
  }

  leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector("h5").textContent,
      precio: Number.parseInt(
        producto.querySelector(".precio").getAttribute("data-info")
      ),
      id: producto.querySelector("a").getAttribute("data-id"),
      cantidad: 1,
    };
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (productoLS) {
      if (productoLS.id === infoProducto.id) {
        productosLS = productoLS.id;
      }
    });
    if (productosLS === infoProducto.id) {
      //console.log('El producto ya está agregado');
      Swal.fire({
        icon: "prueba 2 ",
        title: "No tenemos stock suficiente, prueba con menos unidades",
        timer: 2500,
        showConfirmButton: false,
      });
    } else {
      this.insertarCarrito(infoProducto);
      Swal.fire({
        icon: "success",
        title: "Agregado",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  }

  insertarCarrito(producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${format_currency(producto.precio)}</td>
        <td>
        <a href="#" class="borrar-producto fa-solid fa-trash" data-id="${
          producto.id
        }"><p></p></a>
        </td>
        `;
    listaProductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    if (!productosLS.length) {
      document.getElementById("vaciar-carrito")?.classList.add("hidden");
      document.getElementById("procesar-pedido")?.classList.add("hidden");
    } else {
      document.getElementById("vaciar-carrito")?.classList.remove("hidden");
      document.getElementById("procesar-pedido")?.classList.remove("hidden");
    }
  }

  eliminarProducto(e) {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    if (!productosLS.length) {
      document.getElementById("vaciar-carrito")?.classList.add("hidden");
      document.getElementById("procesar-pedido")?.classList.add("hidden");
    } else {
      document.getElementById("vaciar-carrito")?.classList.remove("hidden");
      document.getElementById("procesar-pedido")?.classList.remove("hidden");
    }
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains("borrar-producto")) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector("a").getAttribute("data-id");
      Swal.fire({
        icon: "info",
        title: "Eliminado",
        timer: 2500,
        showConfirmButton: false,
      });
    }
    this.eliminarProductoLocalStorage(productoID);
    this.calcularTotal();
  }

  vaciarCarrito(e) {
    e.preventDefault();
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    if (!productosLS.length) {
      document.getElementById("vaciar-carrito")?.classList.add("hidden");
      document.getElementById("procesar-pedido")?.classList.add("hidden");
    } else {
      document.getElementById("vaciar-carrito")?.classList.remove("hidden");
      document.getElementById("procesar-pedido")?.classList.remove("hidden");
    }
    if (!listaProductos.firstChild) {
      return Swal.fire({
        icon: "error",
        title: "El carrito esta vacio, porfavor agrega productos ",
        timer: 2500,
        showConfirmButton: false,
      });
    }
    while (listaProductos.firstChild) {
      listaProductos.removeChild(listaProductos.firstChild);
      Swal.fire({
        icon: "info",
        title: "Carrito Vacío",
        timer: 2500,
        showConfirmButton: false,
      });
    }
    this.vaciarLocalStorage();
    return false;
  }

  guardarProductosLocalStorage(producto) {
    let productos;
    productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  obtenerProductosLocalStorage() {
    let productoLS;
    if (localStorage.getItem("productos") === null) {
      productoLS = [];
    } else {
      productoLS = JSON.parse(localStorage.getItem("productos"));
    }
    return productoLS;
  }

  eliminarProductoLocalStorage(productoID) {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    if (!productosLS.length) {
      document.getElementById("vaciar-carrito")?.classList.add("hidden");
      document.getElementById("procesar-pedido")?.classList.add("hidden");
    } else {
      document.getElementById("vaciar-carrito")?.classList.remove("hidden");
      document.getElementById("procesar-pedido")?.classList.remove("hidden");
    }
    productosLS.forEach(function (productoLS, index) {
      if (productoLS.id === productoID) {
        productosLS.splice(index, 1);
      }
    });
    localStorage.setItem("productos", JSON.stringify(productosLS));
  }

  leerLocalStorage() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    if (!productosLS.length) {
      document.getElementById("vaciar-carrito")?.classList.add("hidden");
      document.getElementById("procesar-pedido")?.classList.add("hidden");
    } else {
      document.getElementById("vaciar-carrito")?.classList.remove("hidden");
      document.getElementById("procesar-pedido")?.classList.remove("hidden");
    }
    productosLS.forEach(function (producto) {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${format_currency(producto.precio)}</td>
            <td>
            <a href="#" class="borrar-producto fa-solid fa-trash" data-id="${
              producto.id
            }"></a>
            </td>
            `;
      listaProductos?.appendChild(row);
    });
  }

  leerLocalStorageCompra() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    if (!productosLS.length) {
      document.getElementById("vaciar-carrito")?.classList.add("hidden");
      document.getElementById("procesar-pedido")?.classList.add("hidden");
    } else {
      document.getElementById("vaciar-carrito")?.classList.remove("hidden");
      document.getElementById("procesar-pedido")?.classList.remove("hidden");
    }
    productosLS.forEach(function (producto) {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${format_currency(producto.precio)}</td>
            <td>${producto.cantidad}</td>
            <td>${format_currency(producto.precio * producto.cantidad)}</td>
            <td>
            <a href="#" class="borrar-producto fa-solid fa-trash" data-id="${
              producto.id
            }"></a>
            </td>
            `;
      listaCompra.appendChild(row);
    });
  }

  vaciarLocalStorage() {
    localStorage.clear();
  }

  procesarPedido(e) {
    e?.preventDefault();
    if (this.obtenerProductosLocalStorage().length === 0) {
      Swal.fire({
        icon: "error",
        title: "El carrito está vacío, agrega un producto",
        timer: 2500,
        showConfirmButton: false,
      });
    } else {
      location.href = "carrito.html";
    }
  }

  calcularTotal() {
    let productoLS;
    let total = 0,
      subtotal = 0,
      igv = 0;
    productoLS = this.obtenerProductosLocalStorage();
    for (let i = 0; i < productoLS.length; i++) {
      let element = Number(productoLS[i].precio * productoLS[i].cantidad);
      total = total + element;
    }
    igv = parseInt((total * 19) / 100);
    subtotal = parseInt(total - igv);

    document.getElementById("subtotal").innerHTML =
      "$ " + format_currency(subtotal);
    document.getElementById("igv").innerHTML = "$ " + format_currency(igv);
    document.getElementById("total").value =
      "$ " + format_currency(parseInt(total));
  }
}
