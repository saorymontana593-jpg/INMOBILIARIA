
const seccion = document.querySelector(".parallax");
const imagenes = document.querySelectorAll(".fondo-imagen");
const texto = document.querySelector(".portada-texto");
const indicador = document.querySelector(".indicador-scroll");

// Actualizar el año automáticamente.
document.getElementById("anio").textContent =
    new Date().getFullYear();

// Controlar el efecto de las seis imágenes.
function actualizarParallax() {
    const altoPantalla = window.innerHeight;
    const recorrido = seccion.offsetHeight - altoPantalla;

    if (recorrido <= 0) return;

    const rect = seccion.getBoundingClientRect();

    // Progreso del scroll entre 0 y 1.
    const progreso = Math.max(
        0,
        Math.min(1, -rect.top / recorrido)
    );

    // Posición entre la primera y la última imagen.
    const posicion = progreso * (imagenes.length - 1);

    // Desvanecer las imágenes al finalizar la galería.
    const salida = Math.max(
        0,
        Math.min(1, (1 - progreso) / 0.12)
    );

    imagenes.forEach((imagen, indice) => {
        const distancia = Math.abs(posicion - indice);

        // Transición gradual entre imágenes.
        const opacidad = Math.max(0, 1 - distancia) * salida;

        // Movimiento de profundidad.
        const movimiento = (progreso - indice / (imagenes.length - 1)) * -45;

        imagen.style.opacity = opacidad;
        imagen.style.transform =
            `scale(1.08) translateY(${movimiento}px)`;
    });

    // Ocultar el texto inicial gradualmente.
    texto.style.opacity = Math.max(
        0,
        Math.min(1, 1 - progreso * 5)
    );

    // Ocultar el indicador de scroll.
    if (indicador) {
        indicador.style.opacity = Math.max(
            0,
            1 - progreso * 8
        );
    }
}

// Evitar cálculos innecesarios durante el scroll.
let pendiente = false;

function solicitarActualizacion() {
    if (pendiente) return;

    pendiente = true;

    requestAnimationFrame(() => {
        actualizarParallax();
        pendiente = false;
    });
}

window.addEventListener("scroll", solicitarActualizacion, {
    passive: true
});

window.addEventListener("resize", solicitarActualizacion);

actualizarParallax();


// FORMULARIO DE CONTACTO
const formulario = document.querySelector("#formulario-contacto");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formulario.reportValidity()) return;

        const datos = new FormData(formulario);

        const nombre = datos.get("nombre");
        const correo = datos.get("correo");
        const asunto = datos.get("asunto");
        const mensaje = datos.get("mensaje");

        const destinatario = "contacto@roma.com";

        const cuerpo =
            `Nombre: ${nombre}\n` +
            `Correo: ${correo}\n` +
            `Consulta: ${asunto}\n\n` +
            `Mensaje:\n${mensaje}`;

        const url =
            `mailto:${destinatario}` +
            `?subject=${encodeURIComponent(asunto)}` +
            `&body=${encodeURIComponent(cuerpo)}`;

        window.location.href = url;
    });
}