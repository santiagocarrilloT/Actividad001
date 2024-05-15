var global_database;
document.addEventListener('deviceready', conectarDB, false);

function conectarDB(){
    console.log('Conectando a la base de datos');
    global_database = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system',
        androidLockWorkaround: 1,
    }, function(db){
        console.log('Base de datos abierta');
    }, function(error){
        console.error('Error al abrir la base de datos', error);
    });

    global_database.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS notas (id_notas integer primary key, id_usuario integer, titulo text, body text, notificacion boolean, id_ubicacion int, FOREIGN KEY (id_usuario) REFERENCES demo_table(id))');
    }, function(err) {
        console.error('Transaction ERROR: ' + err.message);
    }, function(data) {
        console.log('BD y tabla -notas- creada con éxito', data);
    });
}
