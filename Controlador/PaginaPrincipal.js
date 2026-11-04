document.addEventListener("DOMContentLoaded", () => {
    
    let contadorCarrito = 0;
    const cartCountElement = document.getElementById("cart-count");
    const botonesComprar = document.querySelectorAll(".btn-comprar");

    botonesComprar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            // Incrementar contador
            contadorCarrito++;
            cartCountElement.textContent = contadorCarrito;

            const tarjeta = e.target.parentElement;
            const nombreProducto = tarjeta.querySelector("h3").textContent;

            alert(`¡"${nombreProducto}" se ha añadido al carrito! 🌿`);
        });
    });

    const formulario = document.querySelector(".formulario");

    formulario.addEventListener("submit", (e) => {
        // Prevenir que la página se recargue al enviar el formulario
        e.preventDefault();

        // Capturar los valores de los inputs
        const inputs = formulario.querySelectorAll("input");
        const nombre = inputs[0].value.trim();
        const email = inputs[1].value.trim();

        if (nombre && email) {

            alert(`¡Gracias por unirte a Skiniverse, ${nombre}! 💖\nHemos enviado tu cupón del 10% de descuento a: ${email}`);
            
            formulario.reset();
        }
    });

});