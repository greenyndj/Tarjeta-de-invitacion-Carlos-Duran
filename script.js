// ==========================================
// INVITACIÓN DE GRADO - VERSIÓN DINÁMICA
// Conectada a CSV local en GitHub
// ==========================================

// Ruta del archivo CSV alojado en el mismo repositorio
const csvPath = "invitados.csv";

const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const errorScreen = document.getElementById("errorScreen");
const openButton = document.getElementById("openInvitation");
const guestName = document.getElementById("guestName");
const guestSeats = document.getElementById("guestSeats");
const whatsappButton = document.getElementById("whatsappButton");

// Obtener el código desde la URL (Ej: ?codigo=GRD001)
const params = new URLSearchParams(window.location.search);
const codigo = params.get("codigo");

// Cambiar estado del botón mientras carga la base de datos
openButton.style.opacity = "0.6";
openButton.style.pointerEvents = "none";

async function cargarBaseDeDatos() {
  if (!codigo) {
    mostrarError();
    return;
  }

  // Descargar y leer el CSV local usando PapaParse
  Papa.parse(csvPath, {
    download: true,
    header: true, // Usa la primera fila como nombres de columna
    complete: function(results) {
      const invitados = results.data;
      
      // Buscar el invitado que coincida con el código de la URL
      const invitadoEncontrado = invitados.find(
        fila => fila.Codigo && fila.Codigo.toUpperCase() === codigo.toUpperCase()
      );

      if (invitadoEncontrado) {
        configurarInvitacion(invitadoEncontrado);
      } else {
        mostrarError();
      }
    },
    error: function(err) {
      console.error("Error al cargar la base de datos:", err);
      mostrarError();
    }
  });
}

function configurarInvitacion(invitado) {
  // Rellenar los datos en el HTML
  guestName.textContent = invitado.Nombre;
  guestSeats.textContent = invitado.Cupos;

  // Preparar el mensaje de WhatsApp automático
  const numeroWhatsApp = "573184374039";
  const mensaje = encodeURIComponent(
    `Hola Carlos, soy ${invitado.Nombre}. Confirmo mi asistencia a tu celebración de grado. Tengo ${invitado.Cupos} cupo(s) reservado(s). 🎓`
  );
  whatsappButton.href = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

  // Habilitar el botón de la portada para que puedan entrar
  openButton.style.opacity = "1";
  openButton.style.pointerEvents = "auto";
  openButton.querySelector("span").textContent = "ABRIR INVITACIÓN";
}

function mostrarError() {
  cover.classList.add("hidden");
  errorScreen.classList.remove("hidden");
}

// Evento para abrir la invitación
openButton.addEventListener("click", () => {
  cover.classList.add("hidden");
  invitation.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Iniciar el proceso al cargar la página
cargarBaseDeDatos();
