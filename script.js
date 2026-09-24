// ==========================================
// INVITACIÓN DE GRADO - VERSIÓN 1
// Carlos Andrés Durán Torres
// ==========================================

// Datos temporales.
// Más adelante estos datos serán reemplazados
// automáticamente por los datos provenientes
// del Excel.
const invitados = {
  "GRD001": {
    nombre: "María López",
    cupos: 2
  },
  "GRD002": {
    nombre: "Juan Pérez",
    cupos: 1
  },
  "GRD003": {
    nombre: "Familia González",
    cupos: 4
  },
  "GRD004": {
    nombre: "Andrés Martínez",
    cupos: 2
  }
};

const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const errorScreen = document.getElementById("errorScreen");
const openButton = document.getElementById("openInvitation");
const guestName = document.getElementById("guestName");
const guestSeats = document.getElementById("guestSeats");
const whatsappButton = document.getElementById("whatsappButton");

// Obtener el código desde la URL.
// Ejemplo:
// index.html?codigo=GRD001
const params = new URLSearchParams(window.location.search);
const codigo = params.get("codigo");

// Buscar invitado
const invitado = codigo ? invitados[codigo.toUpperCase()] : invitados["GRD001"];

// Mostrar los datos personalizados
if (invitado) {
  guestName.textContent = invitado.nombre;
  guestSeats.textContent = invitado.cupos;
} else {
  cover.classList.add("hidden");
  errorScreen.classList.remove("hidden");
}

// Abrir invitación
openButton.addEventListener("click", () => {
  cover.classList.add("hidden");
  invitation.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Preparar mensaje de WhatsApp
const numeroWhatsApp = "573184374039";

const mensaje = encodeURIComponent(
  `Hola Carlos, soy ${invitado ? invitado.nombre : "tu invitado"}. ` +
  `Confirmo mi asistencia a tu celebración de grado. ` +
  `Tengo ${invitado ? invitado.cupos : 1} cupo(s) reservado(s). 🎓`
);

whatsappButton.href = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
