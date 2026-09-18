/* ============================================================
   JAVASCRIPT - lunea fitness and spa
   Desarrollado con JavaScript básico
   ============================================================ */


/* ------------------------------------------------------------
   VARIABLES DEL CARRITO
   ------------------------------------------------------------ */

let carrito = [];


/* ------------------------------------------------------------
   AGREGAR PRODUCTO AL CARRITO
   ------------------------------------------------------------ */

function agregarCarrito(nombre, precio) {

    const producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);

    actualizarCarrito();

    alert(nombre + " fue agregado al carrito.");

}


/* ------------------------------------------------------------
   MOSTRAR PRODUCTOS DEL CARRITO
   ------------------------------------------------------------ */

function actualizarCarrito() {

    const contenedor = document.getElementById("productosCarrito");

    const contador = document.getElementById("contadorCarrito");

    const totalElemento = document.getElementById("total");


    contador.textContent = carrito.length;


    contenedor.innerHTML = "";


    if (carrito.length === 0) {

        contenedor.innerHTML =
            "<p>No hay productos en el carrito.</p>";

        totalElemento.textContent = "$0";

        return;

    }


    let total = 0;


    carrito.forEach(function(producto, indice) {

        total += producto.precio;


        const elemento = document.createElement("div");

        elemento.className = "producto-carrito";


        elemento.innerHTML = `

            <h4>${producto.nombre}</h4>

            <p>
                $${producto.precio.toLocaleString("es-CO")}
            </p>

            <button
                class="btn-eliminar"
                onclick="eliminarProducto(${indice})">

                Eliminar

            </button>

        `;


        contenedor.appendChild(elemento);

    });


    totalElemento.textContent =
        "$" + total.toLocaleString("es-CO");

}


/* ------------------------------------------------------------
   ELIMINAR PRODUCTO
   ------------------------------------------------------------ */

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}


/* ------------------------------------------------------------
   ABRIR CARRITO
   ------------------------------------------------------------ */

function abrirCarrito() {

    document
        .getElementById("carrito")
        .classList
        .add("abierto");

}


/* ------------------------------------------------------------
   CERRAR CARRITO
   ------------------------------------------------------------ */

function cerrarCarrito() {

    document
        .getElementById("carrito")
        .classList
        .remove("abierto");

}


/* ------------------------------------------------------------
   FINALIZAR COMPRA
   ------------------------------------------------------------ */

function finalizarCompra() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }


    alert(
        "Gracias por tu compra en Lunea Fitness and Spa. " +
        "Un asesor se comunicará contigo."
    );

}


/* ------------------------------------------------------------
   BUSCADOR DE PRODUCTOS
   ------------------------------------------------------------ */

const buscador =
    document.getElementById("buscador");

const filtroCategoria =
    document.getElementById("filtroCategoria");


function filtrarProductos() {

    const texto =
        buscador.value.toLowerCase();

    const categoria =
        filtroCategoria.value;


    const productos =
        document.querySelectorAll(".producto");


    productos.forEach(function(producto) {

        const nombre =
            producto.dataset.nombre.toLowerCase();

        const categoriaProducto =
            producto.dataset.categoria;


        const coincideNombre =
            nombre.includes(texto);


        const coincideCategoria =
            categoria === "todos" ||
            categoriaProducto === categoria;


        if (coincideNombre && coincideCategoria) {

            producto.style.display = "block";

        } else {

            producto.style.display = "none";

        }

    });

}


buscador.addEventListener(
    "input",
    filtrarProductos
);


filtroCategoria.addEventListener(
    "change",
    filtrarProductos
);


/* ------------------------------------------------------------
   PROMOCIÓN
   ------------------------------------------------------------ */

function mostrarPromocion() {

    alert(
        "Promoción disponible: hasta 20% de descuento " +
        "en productos seleccionados."
    );

}


/* ------------------------------------------------------------
   FORMULARIO DE CONTACTO
   ------------------------------------------------------------ */

const formulario =
    document.getElementById("formularioContacto");


/*
    Comprobamos que el formulario exista.

    Esto evita que JavaScript se detenga
    si todavía no hemos creado el formulario
    o si el ID está escrito diferente.
*/

if (formulario) {

    formulario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const nombre =
                document.getElementById("nombre").value;


            alert(
                "Gracias, " +
                nombre +
                ". Hemos recibido tu mensaje."
            );


            formulario.reset();

        }
    );

}

/* ------------------------------------------------------------
   CHATBOT BÁSICO
   ------------------------------------------------------------ */

const botonEnviar =
    document.getElementById("btnEnviar");

const mensajeInput =
    document.getElementById("mensajeInput");

const mensajes =
    document.getElementById("mensajes");


function enviarMensaje() {

    const texto =
        mensajeInput.value.trim();


    if (texto === "") {

        return;

    }


    /* MENSAJE DEL CLIENTE */

    const mensajeCliente =
        document.createElement("div");

    mensajeCliente.className =
        "cliente";

    mensajeCliente.textContent =
        texto;


    mensajes.appendChild(
        mensajeCliente
    );


    mensajeInput.value = "";


    /* RESPUESTA DEL BOT */

    let respuesta =
        "Gracias por escribirnos. Un asesesor de Lunea Fitnness puede ayudarte.";


    const pregunta =
        texto.toLowerCase();


    if (
        pregunta.includes("producto") ||
        pregunta.includes("productos")
    ) {

        respuesta =
            "Tenemos planes de suscripcion para cada tipo de necesidad, como: spa, gimnasio, jacuzzi, sauna y más"    }


    else if (
        pregunta.includes("precio") ||
        pregunta.includes("precios")
    ) {

        respuesta =
            "Puedes consultar los precios directamente en nuestra sección de productos.";

    }


    else if (
        pregunta.includes("horario") ||
        pregunta.includes("abierto")
    ) {

        respuesta =
            "Nuestro horario es de lunes a domingo de 6:00 AM a 8:00 PM.";

    }


    else if (
        pregunta.includes("contacto") ||
        pregunta.includes("telefono") ||
        pregunta.includes("teléfono")
    ) {

        respuesta =
            "Puedes contactarnos desde la sección Contacto de nuestra página.";

    }


    else if (
        pregunta.includes("hola") ||
        pregunta.includes("buenas")
    ) {

        respuesta =
            "¡Hola! ¿En qué podemos ayudarte?";

    }


    setTimeout(function() {

        const mensajeBot =
            document.createElement("div");

        mensajeBot.className =
            "bot";

        mensajeBot.textContent =
            respuesta;


        mensajes.appendChild(
            mensajeBot
        );


        mensajes.scrollTop =
            mensajes.scrollHeight;

    }, 500);

}


if (botonEnviar) {

    botonEnviar.addEventListener(
        "click",
        enviarMensaje
    );

}

/* ------------------------------------------------------------
   ENVIAR CHAT CON ENTER
   ------------------------------------------------------------ */

if (mensajeInput) {

    mensajeInput.addEventListener(
        "keydown",
        function(evento) {

            if (evento.key === "Enter") {

                enviarMensaje();

            }

        }
    );

}
