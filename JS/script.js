// Espera a que el documento esté completamente cargado
$(document).ready(function() {
    // Selecciona el botón por su ID
    let btnRedireccion = document.querySelectorAll(".boton");
    const randomBtn = document.getElementById("randomBtn");
    let popUp = document.getElementById("popUp");
    let overlay = document.getElementById("overlay");
    let tituloPopUp = document.getElementById("tituloPopUp");
    let cerrarPopUp = document.getElementById("cerrarPopUp");

    var textoURL= document.getElementById("textoURL");
    var textoValor= document.getElementById("textoValor");
    var textoCreado= document.getElementById("textoFC");
    var textoActualizado= document.getElementById("textoFA");

    // Recorrer el arreglo con un bucle
    btnRedireccion.forEach(function(boton) {
        // Añadir a cada boton el evento onClick
        boton.addEventListener('click', function() {
            const categoria = boton.textContent.trim().toLowerCase();
            // Obtiene la categoría del texto del botón
            
            // Si se proporciona una categoría, hace la solicitud a la API
            if (categoria) {
                obtenerData(categoria);
                randomBtn.addEventListener('click',()=>obtenerData(categoria));
            }
        });
    });

    const obtenerData = (categoria) =>{
        fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        // Configura el contenido del pop-up
                        tituloPopUp.innerHTML = "<strong>Category:</strong> " + categoria.toUpperCase();
                        textoValor.innerHTML = `<p class="joke">"${data.value}"</p> `;
                        textoCreado.innerHTML = "<strong>Created at:</strong> " + data.created_at.substr(0,19);
                        textoActualizado.innerHTML = "<strong>Updated at:</strong> " + data.updated_at.substr(0,19); // Agregar el valor al Pop-Up
                        textoURL.innerHTML = `<a href=${data.url} target="_blank">See more...</a> `;
                        
                        // Muestra el pop-up
                        popUp.style.display = "block";
                        overlay.style.display = "block";
                    })
                    .catch(error => console.log(error));
        textoValor.innerHTML = '<p class="text-center">...</p>'
    }

    cerrarPopUp.addEventListener('click', function() {
        // Oculta el pop-up al hacer clic en el botón de cerrar
        popUp.style.display = "none";
        overlay.style.display = "none";
    });
});