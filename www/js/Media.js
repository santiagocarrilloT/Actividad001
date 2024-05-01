document.addEventListener('init', function(event) {
    var page = event.target;

    if (page.matches('#Tab1')){
        var btnMedia = page.querySelector('#mediaBtn');
        btnMedia.addEventListener('click', () => {
            console.log(Media);
        });
    }
});