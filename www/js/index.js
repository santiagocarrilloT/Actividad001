var global_database;
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    //Abrir la base de datos
    global_database = window.sqlitePlugin.openDatabase(
    {
        name: 'my.db', 
        location: 'default',
        androidDatabaseProvider: 'system',
        androidLockWorkaround: 1,
    },
    function(db) {
        console.log("Base de datos SQLite abierta", db);
    },
    function(err) {
        console.error("Error al abrir la base de datos", err);
    });

    // Crear una tabla, si no existe
    global_database.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS demo_table (id integer primary key, nombre text, Email text, usuario text, contrasena text, telefono integer)');
    }, function(err) {
        console.error('Transaction ERROR: ' + err.message);
    }, function(data) {
        console.log('Base de datos y tabla creada con éxito', data);
    });

    
    // Botón para mostrar la tabla completa
    var botonMostrarTable = document.querySelector('#show' );
    botonMostrarTable.addEventListener('click', mostrarTabla, false);

    //Botón para insertar datos en la tabla
    var botonInsertar = document.querySelector('#create' );
    botonInsertar.addEventListener('click', insertarDatos, false);

    //Botón para actualizar datos en la tabla
    var botonActualizar = document.querySelector('#update' );
    botonActualizar.addEventListener('click', actualizarDatos, false);

    //Botón para econsultar por Email
    var botonConsultar = document.querySelector('#showForEmail' );
    botonConsultar.addEventListener('click', consultarDatos, false);

    //Botón para eliminar datos en la tabla por Email
    var botonEliminar = document.querySelector('#deleteForEmail' );
    botonEliminar.addEventListener('click', eliminarDatos, false);

    var botonGuardarCamb = document.querySelector('#guardarCambios');
    botonGuardarCamb.addEventListener('click', guardarCambios, false);

    var botonCancelarCamb = document.querySelector('#cancelarCambios');
    botonCancelarCamb.addEventListener('click', cancelarEdicion, false);
}
// Consultas a la base de datos sqlite
function sqltx(sql){
    global_database.transaction(function(tx) {
        tx.executeSql(""+sql+"", [], function(tx, resultSet) {
            console.log(resultSet);
            for(var i=0; i<resultSet.rows.length; i++)
            {
                console.log(resultSet.rows.item(i));
            }
        });
    }, function(error) {
        console.log(error);
    });
}

// Consultar todos los datos de la tabla
var mostrarTabla = function() {
    var resultadosTextarea = document.getElementById('resultados');

    global_database.transaction(function(tx) {
        tx.executeSql('SELECT * FROM demo_table', [], function(tx, rs) {
            var resultados = '';
            for(var i = 0; i < rs.rows.length; i++) {
                resultados += 'Nombre: ' + rs.rows.item(i).nombre + ', Email: ' + rs.rows.item(i).Email + ', Usuario: ' + rs.rows.item(i).usuario + ', Contraseña: ' + rs.rows.item(i).contrasena + ', Teléfono: ' + rs.rows.item(i).telefono + '\n';
            }
            // Agrega los resultados al área de texto
            resultadosTextarea.value = resultados;
        }, function(tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    });
};

// Crear nuevo usuario
var insertarDatos = function() {
    var nombre = document.getElementById('name').value;
    var Email = document.getElementById('email').value;
    var usuario = document.getElementById('username').value;
    var contrasena = document.getElementById('password').value;
    var telefono = document.getElementById('phone').value;

    global_database.transaction(function(tx) {
        tx.executeSql('INSERT INTO demo_table (nombre, Email, usuario, contrasena, telefono) VALUES (?,?,?,?,?)', [nombre, Email, usuario, contrasena, telefono], function(tx, rs) {
            console.log('Registro insertado con éxito');
        }, function(tx, error) {
            console.log('INSERT error: ' + error.message);
        });
    });

    // Limpiar los campos de texto
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('phone').value = '';

}


//Funcion para verificar por medio de el usuario y contraseña que existe y asi poder actualizar los datos
var actualizarDatos = function() {
  var usuario = document.getElementById('username').value;
  var contrasena = document.getElementById('password').value;

  if (usuario.trim() === '' || contrasena.trim() === '') {
      alert('Por favor ingresa un usuario y contraseña antes de consultar.');
      return;
  }

  // Verificar si el usuario y la contraseña existen en la base de datos
  global_database.transaction(function(tx) {
      tx.executeSql('SELECT * FROM demo_table WHERE usuario = ? AND contrasena = ?', [usuario, contrasena], function(tx, rs) {
          // Si se encuentra el usuario y la contraseña, muestra el modal para editar los datos
          if (rs.rows.length > 0) {
              // Obtener los datos del usuario
              var userData = rs.rows.item(0);

              // Mostrar el modal con los datos del usuario
              mostrarModalEdicion(userData);
          } else {
              alert('Usuario o contraseña incorrectos.');
          }
      }, function(tx, error) {
          console.log('SELECT error: ' + error.message);
      });
  });
}

function mostrarModalEdicion(userData) {
  var dialog = document.getElementById('editDialog');
  dialog.show();

  // Rellena los campos del modal con los datos del usuario
  document.getElementById('editName').value = userData.nombre;
  document.getElementById('editEmail').value = userData.Email;
  document.getElementById('editPhone').value = userData.telefono;
  document.getElementById('editUsername').value = userData.usuario;
  document.getElementById('editPassword').value = userData.contrasena;
}


function consultarDatos() {
    var resultadosTextarea = document.getElementById('resultados');
    var email = document.getElementById('email').value;
    global_database.transaction(function(tx) {
        tx.executeSql('SELECT * FROM demo_table WHERE Email = ?', [email], function(tx, rs) {
            if (rs.rows.length > 0) {
                var usuario = rs.rows.item(0);
                resultadosTextarea.value = 'Nombre: ' + usuario.nombre + ', Email: ' + usuario.Email + ', Usuario: ' + usuario.usuario + ', Contraseña: ' + usuario.contrasena + ', Teléfono: ' + usuario.telefono;
            } else {
                console.log('No se encontraron registros con el Email: ' + email);
            }
        }, function(tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    });
}

//Funcion para eliminar datos de la base de datos
//Funcion para borrar usuario por medio del email
var eliminarDatos = function() {
  var Email = document.getElementById('email').value;

  // Validar si el campo de correo electrónico está vacío
  if (Email.trim() === '') {
      alert('Por favor ingresa un correo electrónico antes de eliminar.');
      return;
  }

  global_database.transaction(function(tx) {
      tx.executeSql('DELETE FROM demo_table WHERE Email = ?', [Email], function(tx, rs) {
          console.log('Registro eliminado con éxito');
      }, function(tx, error) {
          console.log('DELETE error: ' + error.message);
      });
  });

  // Limpiar el campo de texto
  document.getElementById('email').value = '';
}

//Funcion para guardar los cambios en la base de datos
function guardarCambios() {
  // se obtiene los valores de los campos de entrada del modal y guardarlos en la base de datos
  var newName = document.getElementById('editName').value;
  var newEmail = document.getElementById('editEmail').value;
  var newPhone = document.getElementById('editPhone').value;
  var newUsername = document.getElementById('editUsername').value;
  var newPassword = document.getElementById('editPassword').value;

  //Actualizar los datos del usuario en la base de datos
  global_database.transaction(function(tx) {
      tx.executeSql('UPDATE demo_table SET nombre = ?, Email = ?, usuario = ?, contrasena = ?, telefono = ? WHERE Email = ?', [newName, newEmail, newUsername, newPassword, newPhone, newEmail], function(tx, rs) {
          console.log('Registro actualizado con éxito');
      }, function(tx, error) {
          console.log('UPDATE error: ' + error.message);
      });
  });

  var dialog = document.getElementById('editDialog');
  dialog.hide();

  // Limpiar los campos de texto
  document.getElementById('name').value = '';
  document.getElementById('password').value = '';
}

//Funcion para cancelar la edicion en la BD
function cancelarEdicion() {
  var dialog = document.getElementById('editDialog');
  dialog.hide();
}