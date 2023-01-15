const form = document.getElementById('form');
const incidenciasTable = document.getElementById('incidencias');
const incidencias = [];

function handleFormSubmit(event) {
    event.preventDefault();
    const fecha = document.getElementById('fecha').value;
    const usuario = document.getElementById('usuario').value.trim();
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const tipo = document.getElementById('tipo').value;
    const prioridad = document.querySelector('input[name="prioridad"]:checked').value;
    const observaciones = document.getElementById('observaciones').value;
    if (!fecha || !usuario || !telefono || !correo || !prioridad || !observaciones) {
        alert('Debes completar todos los campos del formulario');
        return;
    }
    if (/\d/.test(usuario)) {
        alert('El nombre del usuario no puede contener números');
        return;
    }
    if (!/^\d{9}$/.test(telefono)) {
        alert('El teléfono de contacto debe tener 9 dígitos');
        return;
    }
    incidencias.push({fecha,usuario,telefono,correo,tipo,prioridad,estado: 'tramitada',responsable: 'sin asignar',observaciones: [`Solicitud del usuario: ${observaciones}`],});
    renderTable();
    alert('Incidencia registrada con éxito');
}

function renderTable() {
    incidenciasTable.innerHTML = `
      <tr>
        <th>Fecha de creación</th>
        <th>Usuario</th>
        <th>Teléfono de contacto</th>
        <th>Correo electrónico de contacto</th>
        <th>Tipo de incidencia</th>
        <th>Prioridad</th>
        <th>Estado</th>
        <th>Observaciones</th>
      </tr>
`;
    incidenciasTable.setAttribute('border',1);
    incidencias.sort((a, b) => {
      if (a.prioridad === b.prioridad) {
        return new Date(a.fecha) - new Date(b.fecha);
      }
      if (a.prioridad === 'urgente') {
        return -1;
      }
      if (b.prioridad === 'urgente') {
        return 1;
      }
      return a.prioridad < b.prioridad ? -1 : 1;
    });
    for (const incidencia of incidencias) {
      let fechaLimiteResolucion;
      if (incidencia.prioridad === 'urgente') {
        fechaLimiteResolucion = new Date(incidencia.fecha);
        fechaLimiteResolucion.setDate(fechaLimiteResolucion.getDate() + 1);
      } else if (incidencia.prioridad === 'media') {
        fechaLimiteResolucion = new Date(incidencia.fecha);
        fechaLimiteResolucion.setDate(fechaLimiteResolucion.getDate() + 2);
      } else {
        fechaLimiteResolucion = new Date(incidencia.fecha);
        fechaLimiteResolucion.setDate(fechaLimiteResolucion.getDate() + 7);
      }
      const row = document.createElement('tr');
      let backgroundColor = 'inherit';
      if (incidencia.estado === 'resuelta') {
        backgroundColor = 'lightblue';
      } else if (incidencia.prioridad === 'baja') {
        backgroundColor = 'lightgreen';
      } else if (incidencia.prioridad === 'media') {
        backgroundColor = 'orange';
      } else {
      backgroundColor = 'red';
    }
    row.style.backgroundColor = backgroundColor;
    row.innerHTML = `
      <td>${incidencia.fecha}</td>
      <td>${incidencia.usuario}</td>
      <td>${incidencia.telefono}</td>
      <td>${incidencia.correo}</td>
      <td>${incidencia.tipo}</td>
      <td>${incidencia.prioridad}</td>
      <td>${incidencia.estado}</td>
      <td>${incidencia.observaciones.join('<br>')}</td>
    `;
    incidenciasTable.appendChild(row);
  }
}

form.addEventListener('submit', handleFormSubmit);

document.getElementById('form-login').addEventListener('submit', function(event) {
  event.preventDefault(); // Previene el envío del formulario

  // Obtén los valores de los campos de entrada
  let usuario = document.getElementById('user').value;
  let password = document.getElementById('pass').value;

  // Valida el usuario y la contraseña
  if (usuario === 'jorge' && password === '1234') {
    // Si el usuario y la contraseña son válidos, muestra la aplicación
    document.getElementById('form').style.display = 'block';
    document.getElementById('incidencias').style.display = 'block';
    document.getElementById('form-login').style.display = 'none';
  } else if(usuario === 'colaborador' && password === '1234') {
    // Si el usuario y la contraseña son válidos, muestra la aplicación
    document.getElementById('incidencias').style.display = 'block';
    document.getElementById('form-login').style.display = 'none';
  }else{
    // Si el usuario y la contraseña no son válidos, muestra un mensaje de error
    alert('Usuario o contraseña incorrectos');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('form').style.display = 'none';
  document.getElementById('incidencias').style.display = 'none';
});