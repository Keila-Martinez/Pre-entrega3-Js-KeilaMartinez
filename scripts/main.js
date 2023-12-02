//---------Eventos---------------------

var index= document.getElementById("index");
var botonRegistro = document.getElementById("btnRegistrarse");
var botonInicio = document.getElementById("btnIniciarSesion");

botonRegistro.addEventListener("click", function() {
  if (index) window.location.href = 'views/registro.html';
  else window.location.href = '../views/registro.html';
  
});

botonInicio.addEventListener("click", function() {
  if(index) window.location.href = 'views/inicioSesion.html';
  else window.location.href = '../views/inicioSesion.html';
});

  //--------------Funciones----------------
function registrarUsuario() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (nombre == '' || apellido == '' || email == '' || password == '') {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Todos los campos son obligatorios",
      });
  } else {
  var usuariosGuardados = localStorage.getItem('usuariosRegistrados');
  //Verifico que exista el JSON antes del parse
  var usuariosArray = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

  //Verico que no se haya registrado el mismo mail anteriormente
  var usuarioExistente = usuariosArray.find(function(usuario) {
  return usuario.email == email;
  });
  if (usuarioExistente) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El correo electrónico ya está registrado",
      });} 
  else {
      var usuario = {
          "nombre": nombre,
          "apellido": apellido,
          "email": email,
          "password": password
      };
      usuariosArray.push(usuario);
      var usuariosJSON = JSON.stringify(usuariosArray);
      localStorage.setItem('usuariosRegistrados', usuariosJSON);
      Swal.fire({
          icon: "success",
          title: "Registro exitoso, ¡bienvenid@!",
          showConfirmButton: true,
      });
    }
  }
  document.getElementById("registroForm").reset();
}

function iniciarSesion() {
  var emailIngresado = document.getElementById("emailLogin").value;
  var passwordIngresado = document.getElementById("passwordLogin").value;

  // Recupero los usuarios registrados del localStorage
  var usuariosRegistradosJSON = localStorage.getItem('usuariosRegistrados');

  // Si hay usuarios registrados, comparo las credenciales ingresadas
  if (usuariosRegistradosJSON) {
      var usuariosRegistrados = JSON.parse(usuariosRegistradosJSON);
      var usuarioRegistrado = usuariosRegistrados.find(function(usuario) {
          return emailIngresado === usuario.email && passwordIngresado === usuario.password;
      });

      if (usuarioRegistrado) {
          // Almacenar el usuario en el localStorage
          localStorage.setItem('usuarioSesion', JSON.stringify(usuarioRegistrado));

          Swal.fire({
              icon: "success",
              title: "¡Bienvenid@ " + usuarioRegistrado.nombre + " " + usuarioRegistrado.apellido + "!",
              showConfirmButton: true,
          });

          // Si el cliente inició sesión, actualizar la interfaz
          interfazSesionIniciada(usuarioRegistrado);
      } else {
          // Mostrar un mensaje de credenciales incorrectas
          mostrarMensajeError("Credenciales incorrectas, intente nuevamente");
      }
  } 
  else {
      mostrarMensajeError("No hay usuarios registrados");
    }

  document.getElementById("loginForm").reset();
}

function interfazSesionIniciada(usuario) {
  var divLogueo = document.getElementById("botonesLogueo");
  var nuevoParrafo = document.createElement("p");
  var turnosLink = document.getElementById("turnosLink");
  nuevoParrafo.textContent = "Cliente: " + usuario.nombre + " " + usuario.apellido;
  nuevoParrafo.style.color = "#940d6b";
  nuevoParrafo.style.fontWeight = "bold";
  nuevoParrafo.style.fontFamily = "Oswald, sans-serif";
  nuevoParrafo.style.marginLeft = "20px";
  divLogueo.innerHTML = '';
  divLogueo.appendChild(nuevoParrafo);
  // Obtiene el valor actual del atributo href
  var hrefValue = turnosLink.getAttribute("href");
  // Reemplaza la parte específica del valor del atributo href
  var nuevoHrefValue = hrefValue.replace("inicioSesion.html", "turnos.html");
  // Asigna el nuevo valor al atributo href
  turnosLink.setAttribute("href", nuevoHrefValue);
}

function mostrarMensajeError(mensaje) {
  var divMensaje = document.getElementById("mensaje");
  var mensajeError = document.createElement("p");
  mensajeError.style.color = "red";
  mensajeError.style.fontFamily = "Oswald, sans-serif";
  mensajeError.textContent = mensaje;
  divMensaje.innerHTML = '';
  divMensaje.appendChild(mensajeError);
}

function verificarSesion() {
  var usuarioSesionJSON = localStorage.getItem('usuarioSesion');
  return usuarioSesionJSON ? JSON.parse(usuarioSesionJSON) : null;
}

function inicio() {
  var usuarioSesion = verificarSesion();
  if (usuarioSesion) {
    interfazSesionIniciada(usuarioSesion);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  inicio();
});