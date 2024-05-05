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

    global_database.transaction(function(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id integer primary key, nombre text, email text)')
    });
}
