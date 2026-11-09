// ---------- Productos ----------
var productos = [
  { id: 1, nombre: "Roll California", precio: 6500, icono: "🍣" },
  { id: 2, nombre: "Roll Philadelphia", precio: 7000, icono: "🍣" },
  { id: 3, nombre: "Roll Ebi Furai", precio: 7500, icono: "🍤" },
  { id: 4, nombre: "Nigiri de salmón", precio: 4500, icono: "🍱" },
  { id: 5, nombre: "Gyoza (6 un.)", precio: 4000, icono: "🥟" },
  { id: 6, nombre: "Té verde", precio: 1800, icono: "🍵" }
];

var carrito = [];

function formatoPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL");
}

var listaProductos = document.getElementById("lista-productos");

if (listaProductos) {
  mostrarProductos();
  mostrarCarrito();

  document.getElementById("btn-pagar").addEventListener("click", function () {
    var mensaje = document.getElementById("mensaje-pago");
    if (carrito.length === 0) {
      mensaje.textContent = "Agrega al menos un producto para pagar.";
      mensaje.className = "error";
    } else {
      mensaje.textContent = "Serás redirigido a la plataforma de pago.";
      mensaje.className = "ok";
    }
  });
}

function mostrarProductos() {
  var html = "";
  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];
    html += '<div class="producto">' +
              '<div class="foto">' + p.icono + '</div>' +
              '<h3>' + p.nombre + '</h3>' +
              '<p>' + formatoPrecio(p.precio) + '</p>' +
              '<button onclick="agregar(' + p.id + ')">Agregar al pedido</button>' +
            '</div>';
  }
  listaProductos.innerHTML = html;
}

function agregar(id) {
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].cantidad++;
      mostrarCarrito();
      return;
    }
  }
  for (var j = 0; j < productos.length; j++) {
    if (productos[j].id === id) {
      carrito.push({ id: id, nombre: productos[j].nombre, precio: productos[j].precio, cantidad: 1 });
    }
  }
  mostrarCarrito();
}

function quitar(id) {
  var nuevo = [];
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== id) {
      nuevo.push(carrito[i]);
    }
  }
  carrito = nuevo;
  mostrarCarrito();
}

function mostrarCarrito() {
  var html = "";
  var total = 0;

  if (carrito.length === 0) {
    html = "<p>Tu carrito está vacío.</p>";
  }

  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];
    total += item.precio * item.cantidad;
    html += '<div class="item">' +
              '<span>' + item.nombre + ' x' + item.cantidad + '</span>' +
              '<span>' + formatoPrecio(item.precio * item.cantidad) + '</span>' +
              '<button onclick="quitar(' + item.id + ')">Quitar</button>' +
            '</div>';
  }

  document.getElementById("items-carrito").innerHTML = html;
  document.getElementById("total").textContent = formatoPrecio(total);
}

var formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    var errores = [];
    var run = document.getElementById("run").value.trim();
    var nombre = document.getElementById("nombre").value.trim();
    var direccion = document.getElementById("direccion").value.trim();
    var comuna = document.getElementById("comuna").value.trim();
    var provincia = document.getElementById("provincia").value.trim();
    var region = document.getElementById("region").value.trim();
    var fecha = document.getElementById("fecha").value;
    var sexo = document.getElementById("sexo").value;
    var correo = document.getElementById("correo").value.trim();
    var telefono = document.getElementById("telefono").value.trim();

    if (run === "") { errores.push("Ingresa tu RUN."); }
    if (nombre === "") { errores.push("Ingresa tu nombre completo."); }
    if (direccion === "") { errores.push("Ingresa tu dirección."); }
    if (comuna === "") { errores.push("Ingresa tu comuna."); }
    if (provincia === "") { errores.push("Ingresa tu provincia."); }
    if (region === "") { errores.push("Ingresa tu región."); }
    if (fecha === "") { errores.push("Ingresa tu fecha de nacimiento."); }
    if (sexo === "") { errores.push("Selecciona tu sexo."); }
    if (telefono === "") { errores.push("Ingresa tu teléfono."); }

    var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
      errores.push("Ingresa un correo válido.");
    }

    var divErrores = document.getElementById("errores");
    var divExito = document.getElementById("exito");

    if (errores.length > 0) {
      divErrores.innerHTML = errores.join("<br>");
      divExito.textContent = "";
    } else {
      divErrores.textContent = "";
      divExito.textContent = "Registro exitoso. Ya puedes hacer tus pedidos.";
      formRegistro.reset();
    }
  });
}