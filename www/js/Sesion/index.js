var global_database;
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

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

    // Crear una tabla de usuario, si no existe
    global_database.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS demo_table (id integer primary key, nombre text, Email text, usuario text, contrasena text, telefono integer)');
    }, function(err) {
        console.error('Transaction ERROR: ' + err.message);
    }, function(data) {
        console.log('BD y tabla -demo_table- creada con éxito', data);
    });

    // Crear una tabla de notas
    global_database.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS notas (id_notas integer primary key, id_usuario integer, titulo text, body text, notificacion boolean, id_ubicacion int, FOREIGN KEY (id_usuario) REFERENCES demo_table(id))');
    }, function(err) {
        console.error('Transaction ERROR: ' + err.message);
    }, function(data) {
        console.log('BD y tabla -notas- creada con éxito', data);
    });
    
    global_database.transaction(function(tx) {
        tx.executeSql('INSERT INTO notas (titulo, body, notificacion) VALUES (?,?,?)', ['titulo1', 'body', true], function(tx, rs) {
            console.log('Registro en cargarNotas insertado con éxito');
        }, function(error) {
            console.log('INSERT error: ' + error.message);
        });
    });
    global_database.transaction(function(tx) {
        tx.executeSql('INSERT INTO notas (titulo, body, notificacion) VALUES (?,?,?)', ['titulo2', 'body2', true], function(tx, rs) {
            console.log('Registro en cargarNotas insertado con éxito');
        }, function(error) {
            console.log('INSERT error: ' + error.message);
        });
    });



    //Botón para validar login
    var botonLogin = document.querySelector('#sigIn');
    botonLogin.addEventListener('click', abrirIndex, false);
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

//Funcioones destinadas a los botones de la aplicación
//Función para abrir la ventana index.html
//La función de inicio de sesión se encuentra deshabilitada, por el momento
function abrirIndex(){
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    if (user.trim() === '' || pass.trim() === ''){
        //ons.notification.alert('Usuario o contraseña no ingresados');
        window.open('../Home-html/index.html', '_top');
        return; 
    }
    else{
        global_database.transaction(function(tx){
            tx.executeSql('SELECT usuario,contrasena FROM demo_table WHERE usuario = ? AND contrasena = ?', [user, pass], function(tx,rs){
                if(rs.rows.length > 0){
                    window.open('index.html', '_self');
                }
                else{
                    ons.notification.alert('Usuario o contraseña incorrectos');
                    return;
                }

            },function(tx,error){
                console.log('Error: '+ error.message);
            });
        });
    }
}