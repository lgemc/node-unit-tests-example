import { expect } from "chai";
import Carrito from "./carrito.js";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { JSDOM } from "jsdom";
import Swal from "sweetalert2";
import chai from "chai";
import { LocalStorage } from "node-localstorage";

const { window } = new JSDOM(`<!DOCTYPE html><body></body>`, {
  url: "http://localhost",
});
global.window = window;
global.document = window.document;
global.Swal = Swal;
global.localStorage = new LocalStorage("./scratch");
global.format_currency = function format_currency(value) {
  return value.toLocaleString("es-ES", { style: "currency", currency: "COP" });
};

global.listaProductos = document.createElement("tbody");

chai.use(sinonChai);

// Sample HTML elements for testing
const createProductElement = () => {
  const div = document.createElement("div");
  div.innerHTML = `
      <img src="image.jpg" alt="Product">
      <h5>Product Title</h5>
      <span class="precio" data-info="1000"></span>
      <a href="#" data-id="1" class="agregar-carrito">Add to Cart</a>
    `;
  return div;
};

describe("Carrito", function () {
  let carrito;

  beforeEach(function () {
    carrito = new Carrito();
    localStorage.clear();
  });

  describe("comprar producto", function () {
    it('should call leerDatosProducto when "agregar-carrito" class is present', function () {
      const event = {
        preventDefault: sinon.spy(),
        target: createProductElement().querySelector(".agregar-carrito"),
      };
      const leerDatosProductoSpy = sinon.spy(carrito, "leerDatosProducto");
      const swalStub = sinon.stub(Swal, "fire").returns(Promise.resolve());
      carrito.comprarProducto(event);

      expect(event.preventDefault).to.have.been.called;
      expect(leerDatosProductoSpy).to.have.been.called;
      expect(swalStub).to.have.been.called;
      // expect swalstub fire to have been called with the following arguments
      expect(swalStub).to.have.been.calledWith({
        icon: "success",
        title: "Agregado",
        timer: 2500,
        showConfirmButton: false,
      });

      swalStub.restore();
      leerDatosProductoSpy.restore();
    });

    it('should not call leerDatosProducto when "agregar-carrito" class is not present', function () {
      const event = {
        preventDefault: sinon.spy(),
        target: createProductElement().querySelector(".precio"),
      };
      const leerDatosProductoSpy = sinon.spy(carrito, "leerDatosProducto");
      carrito.comprarProducto(event);

      expect(event.preventDefault).to.have.been.called;
      expect(leerDatosProductoSpy).to.not.have.been.called;

      leerDatosProductoSpy.restore();
    });

    it("should call leerDatosProducto with the correct arguments", function () {
      const event = {
        preventDefault: sinon.spy(),
        target: createProductElement().querySelector(".agregar-carrito"),
      };
      const swalStub = sinon.stub(Swal, "fire").returns(Promise.resolve());

      const leerDatosProductoSpy = sinon.spy(carrito, "leerDatosProducto");
      carrito.comprarProducto(event);

      expect(leerDatosProductoSpy).to.have.been.calledWith(
        event.target.parentElement
      );
      expect(swalStub).to.have.been.calledWith({
        icon: "success",
        title: "Agregado",
        timer: 2500,
        showConfirmButton: false,
      });

      swalStub.restore();
      leerDatosProductoSpy.restore();
    });

    it("should call swal with warning when product is already in the cart", function () {
      const event = {
        preventDefault: sinon.spy(),
        target: createProductElement().querySelector(".agregar-carrito"),
      };
      const swalStub = sinon.stub(Swal, "fire").returns(Promise.resolve());
      localStorage.setItem("productos", JSON.stringify([{ id: "1" }]));

      const leerDatosProductoSpy = sinon.spy(carrito, "leerDatosProducto");

      carrito.comprarProducto(event);

      expect(swalStub).to.have.been.calledWith({
        icon: "warning",
        title: "No tenemos stock suficiente, prueba con menos unidades",
        timer: 2500,
        showConfirmButton: false,
      });

      swalStub.restore();
      leerDatosProductoSpy.restore();
    });
  });
});
