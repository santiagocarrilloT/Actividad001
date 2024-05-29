document.addEventListener('DOMContentLoaded', function() {
    // Agrega el event listener al documento
    document.body.addEventListener('change', function(event) {
        // Verifica si el evento proviene del interruptor con ID 'miSwitch'
        var linkElement = document.getElementById('modoOC');
        var switchElement = document.getElementById('miSwitch');
        if (event.target.id === 'miSwitch') {
            if (event.target.checked) {
                console.log('El interruptor está encendido');
                // Cambia al tema oscuro
                linkElement.setAttribute('href', '../css/css-components-src/dark-theme.css');
            } else {
                console.log('El interruptor está apagado');
                // Cambia al tema claro
                linkElement.setAttribute('href', '../css/css-components-src/old-theme.css');
            }
        }
    });
});
