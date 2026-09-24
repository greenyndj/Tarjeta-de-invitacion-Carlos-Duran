// ==========================================
// INVITACIÓN DE GRADO - VERSIÓN DINÁMICA
// Con ingreso manual y lectura de CSV local
// ==========================================

const csvPath = "invitados.csv";

const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const errorScreen = document.getElementById("errorScreen");
const openButton = document.getElementById("openInvitation");
const guestName = document.getElementById("guestName");
const guestSeats = document.getElementById("guestSeats");
const whatsappButton = document.getElementById("whatsappButton");

// Elementos del formulario manual
const codeForm = document.getElementById("codeForm");
const codigoInput = document.getElementById("codigoInput");
const btnVerificar = document.getElementById("btnVerificar");
const msjError = document.getElementById("msjError");

let baseDeDatos = [];

// Obtener el código desde la URL si existe (Ej: ?codigo=GRD001)
const params = new URLSearchParams(window.location.search);
const codigoEnUrl = params.get("codigo");

// 1. Cargar el CSV al abrir la página
Papa.parse(csvPath, {
  download: true,
  header: true,
  complete: function(results) {
    baseDeDatos = results.data;
    
    if (codigoEnUrl) {
      verificarCodigo(codigoEnUrl, true);
    } else {
      // Si no hay código en la URL, mostrar el formulario para ingresarlo
      codeForm.classList.remove("hidden");
    }
  },
  error: function(err) {
    console.error("Error al cargar la base de datos:", err);
  }
});

// 2. Función para buscar el código
function verificarCodigo(codigoIngresado, vieneDeUrl = false) {
  const invitadoEncontrado = baseDeDatos.find(
    fila => fila.Codigo && fila.Codigo.toUpperCase() === codigoIngresado.toUpperCase()
  );

  if (invitadoEncontrado) {
    // Éxito: Ocultar formulario, mostrar botón de abrir y configurar datos
    msjError.classList.add("hidden");
    codeForm.classList.add("hidden");
    openButton.classList.remove("hidden");
    configurarInvitacion(invitadoEncontrado);
  } else {
    // Error
    if (vieneDeUrl) {
      mostrarError(); // Pantalla completa de error
    } else {
      msjError.classList.remove("hidden"); // Mostrar texto rojo
    }
  }
}

// 3. Evento botón verificar manual
btnVerificar.addEventListener("click", () => {
  const valorInput = codigoInput.value.trim();
  if (valorInput !== "") {
    verificarCodigo(valorInput);
  }
});

// 4. Permitir verificar con "Enter"
codigoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const valorInput = codigoInput.value.trim();
    if (valorInput !== "") {
      verificarCodigo(valorInput);
    }
  }
});

function configurarInvitacion(invitado) {
  guestName.textContent = invitado.Nombre;
  guestSeats.textContent = invitado.Cupos;

  const numeroWhatsApp = "573184374039";
  const mensaje = encodeURIComponent(
    `Hola Carlos, soy ${invitado.Nombre}. Confirmo mi asistencia a tu celebración de grado. Tengo ${invitado.Cupos} cupo(s) reservado(s). 🎓`
  );
  whatsappButton.href = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
}

function mostrarError() {
  cover.classList.add("hidden");
  errorScreen.classList.remove("hidden");
}

// Evento abrir invitación (Scroll)
openButton.addEventListener("click", () => {
  cover.classList.add("hidden");
  invitation.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
