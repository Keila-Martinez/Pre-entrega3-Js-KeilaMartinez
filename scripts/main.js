//#region Código viejo

// creo tipo de objeto usuario
class Usuario {
  constructor(nombreUsuario, contraseña) {
    this.nombreUsuario = nombreUsuario;
    this.contraseña = contraseña;
  }
}

let keila = new Usuario('keila',1234)

//lista de usuarios
let listaDeUsuarios = [keila];

class Dia {
  constructor(nombre) {
    this.nombre = nombre;
    this.horariosDisponibles = ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'];
  }

  eliminarHorario(horario) {
    const indice = this.horariosDisponibles.indexOf(horario);
    if (indice !== -1) {
      this.horariosDisponibles.splice(indice, 1);
    }
  }
}

// Crear objetos "Dia" para representar los días de la semana
const lunes = new Dia('Lunes');
const martes = new Dia('Martes');
const miercoles = new Dia('Miércoles');
const jueves = new Dia('Jueves');
const viernes = new Dia('Viernes');

// Agregar los objetos "Dia" a un array
const diasDeLaSemana = [lunes, martes, miercoles, jueves, viernes];

// Función para nuevo usuario
function crearUsuario() {
  let nombreUsuario = prompt("Ingrese un nombre de usuario:");
  let contraseña = prompt("Ingrese una contraseña:");
  let nuevoUsuario = new Usuario(nombreUsuario, contraseña);
  listaDeUsuarios.push(nuevoUsuario);
  alert("Usuario creado exitosamente.");
  return true;
}

function iniciarSesionViejo (){
  let intentosPosibles= 3;
  let intentos= 0;
  let usuario= prompt ("Ingrese su usuario:");
  let nombresUsuario = listaDeUsuarios.map(function(usuario){
    return usuario.nombreUsuario;
  })
  var contraseñas = listaDeUsuarios.map(function(usuario){
    return usuario.contraseña;
  })
  let indiceUsuario = nombresUsuario.indexOf(usuario);
  while(indiceUsuario == -1){
    usuario = prompt("Usuario inexistente, intente nuevamente:");
    indiceUsuario = nombresUsuario.indexOf(usuario);
  }
  let contraseñaIngresada= prompt ("Ingrese su contraseña:");
  while(contraseñaIngresada != contraseñas[indiceUsuario] && intentos < intentosPosibles ){
    intentos= intentos+1;
    contraseñaIngresada=  prompt ("Contraseña incorrecta, intente nuevamente:");
  }
  if(contraseñaIngresada == contraseñas[indiceUsuario]){
    alert('Bienvenido. \n\nA continuación, le mostraremos la agenda disponible');
    return true;
  }
  else {
    alert("Se han superado los intentos posibles");
    return false;
  }

 
} 

function seleccionTurno(){
  // Pido que el usuario elija un dia
  let seleccionDia = prompt("Días con horarios disponibles:\n\n" +
    diasDeLaSemana.map((dia, indice) => (indice + 1) + ". " + dia.nombre).join("\n") +
    "\n\nSeleccione un día (ingrese el número):");

  seleccionDia = Number(seleccionDia) - 1;

  if (seleccionDia >= 0 && seleccionDia < diasDeLaSemana.length) {
    let diaSeleccionado = diasDeLaSemana[seleccionDia];

    let seleccionHorario = prompt("Horarios disponibles para " + diaSeleccionado.nombre + ":\n\n" +
      diaSeleccionado.horariosDisponibles.map((horario, indice) => (indice + 1) + ". " + horario).join("\n") +
      "\n\nSeleccione un horario (ingrese el número):");

    seleccionHorario = Number(seleccionHorario) - 1;

    if (seleccionHorario >= 0 && seleccionHorario < diaSeleccionado.horariosDisponibles.length) {
      let horarioSeleccionado = diaSeleccionado.horariosDisponibles[seleccionHorario];
      diaSeleccionado.eliminarHorario(horarioSeleccionado);
      alert("Su turno ha sido agendado el dia " + diaSeleccionado.nombre + " a las: " + horarioSeleccionado + "\n\n ¡Muchas gracias, te esperamos!");
      menu();
    } else {
      alert("Selección de horario no válida.");
    }
  } else {
    alert("Selección de día no válida.");
  }
}

function menu(){
  let respuesta= Number(prompt("Bienvenidos a nuestro sistema de turnos. \n\n Para reservar un turno debe iniciar sesión.  \n 1- Iniciar sesion \n 2- Crear usuario \n 3- Salir"));
 switch (respuesta){
  case 1:
    if(iniciarSesionViejo()){seleccionTurno();}
    else{menu();}
    break;

    case 2:
      if(crearUsuario()){
        if(iniciarSesionViejo()){
          seleccionTurno();
          menu();
        }
      }
        break;

    case 3:
      alert("Gracias por visitarnos");
      break;
        
    default: 
      alert ("Opción invalida, intente nuevamente");
      menu();
  }
}

//#endregion

//#region Pre-Entrega3

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
      });
  } else {
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
          // Almacenar el usuario en el sessionStorage
          sessionStorage.setItem('usuarioSesion', JSON.stringify(usuarioRegistrado));

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
  } else {
      mostrarMensajeError("No hay usuarios registrados");
  }

  document.getElementById("loginForm").reset();
}

function interfazSesionIniciada(usuario) {
  var divLogueo = document.getElementById("botonesLogueo");
  var nuevoParrafo = document.createElement("p");
  nuevoParrafo.textContent = "Cliente: " + usuario.nombre + " " + usuario.apellido;
  nuevoParrafo.style.color = "#940d6b";
  nuevoParrafo.style.fontWeight = "bold";
  nuevoParrafo.style.fontFamily = "Oswald, sans-serif";
  nuevoParrafo.style.marginLeft = "20px";
  divLogueo.innerHTML = '';
  divLogueo.appendChild(nuevoParrafo);
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
  var usuarioSesionJSON = sessionStorage.getItem('usuarioSesion');
  return usuarioSesionJSON ? JSON.parse(usuarioSesionJSON) : null;
}

function inicio(){
  var usuarioSesion = verificarSesion();
  if (usuarioSesion) {
    interfazSesionIniciada(usuarioSesion);
  } 
}

//#endregion
inicio();







