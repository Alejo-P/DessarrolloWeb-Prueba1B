// Espera a que el documento esté completamente cargado
$(document).ready(function() {
    // Selecciona el botón por su ID
    var btnRedireccion = document.querySelectorAll(".boton");
    var popUp = document.getElementById("popUp");
    var overlay = document.getElementById("overlay");
    var tituloPopUp = document.getElementById("tituloPopUp");
    var textoPopUp = document.getElementById("textoPopUp");
    var cerrarPopUp = document.getElementById("cerrarPopUp");

    var textoID= document.getElementById("textoID");
    var textoURL= document.getElementById("textoURL");
    var textoValor= document.getElementById("textoValor");
    var textoImagen= document.getElementById("textoImagen");
    var textoCreado= document.getElementById("textoFC");
    var textoActualizado= document.getElementById("textoFA");

    // Recorrer el arreglo con un bucle
    btnRedireccion.forEach(function(boton) {
        // Añadir a cada boton el evento onClick
        boton.addEventListener('click', function() {
            // Obtiene la categoría del texto del botón
            var categoria = boton.textContent.trim();
            
            // // Redirecciona a la página "/pags/request.html" con la categoría como parámetro en la URL
            // window.location.href = "./pags/request.html?categoria=" + encodeURIComponent(categoria);
            // Si se proporciona una categoría, hace la solicitud a la API
            if (categoria) {
                fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // Configura el contenido del pop-up
                    tituloPopUp.innerHTML = "<strong>Categoria:</strong> " + categoria;
                    textoID.innerHTML = "<strong>ID:</strong> " + data.id;
                    textoURL.innerHTML = "<strong>URL:</strong> " + data.url;
                    textoValor.innerHTML = "<strong>Valor:</strong> " + data.value;
                    textoImagen.innerHTML = "<strong>Imagen:</strong> " + data.icon_url;
                    textoCreado.innerHTML = "<strong>Creado en:</strong> " + data.created_at;
                    textoActualizado.innerHTML = "<strong>Actualizado en:</strong> " + data.updated_at; // Agregar el valor al Pop-Up
                    
                    // Muestra el pop-up
                    popUp.style.display = "block";
                    overlay.style.display = "block";
                })
                .catch(error => console.log(error));
            }
        });
    });

    cerrarPopUp.addEventListener('click', function() {
        // Oculta el pop-up al hacer clic en el botón de cerrar
        popUp.style.display = "none";
        overlay.style.display = "none";
    });
});