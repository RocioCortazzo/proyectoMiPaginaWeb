document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('registerForm');
    const loginMessage = document.getElementById('loginMessage');
    const registrationSuccessMessage = document.getElementById('registrationSuccessMessage');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const registerHeader = document.getElementById('registerHeader');
    const loginRedirectBtn = document.getElementById('loginRedirectBtn');
    const catalogoBtn = document.getElementById('catalogoBtn');
    const redesSocialesBtn = document.getElementById('redesSocialesBtn');

    let carrito = [];
    let totalCompra = 0;
    const carritoContainer = document.getElementById('carritoContainer');
    const toggleCarritoBtn = document.getElementById('toggleCarritoBtn');
    const carritoItems = document.getElementById('carritoItems');
    const totalElement = document.getElementById('total');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    const camposCompletos = (campos) => campos.every(campo => campo.value.trim() !== '');

    loginBtn && loginBtn.addEventListener('click', (evento) => {
        evento.preventDefault();
        toggleVisibility(loginForm, false);
        toggleVisibility(loginMessage, true);
        toggleVisibility(registerHeader, false);
    });

    registerBtn && registerBtn.addEventListener('click', (evento) => {
        evento.preventDefault();
        toggleVisibility(loginForm, true);
        toggleVisibility(loginMessage, false);
        toggleVisibility(registerHeader, true);
        toggleVisibility(registrationSuccessMessage, false);
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre');
            const apellido = document.getElementById('apellido');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const genero = document.getElementById('genero');

            if (camposCompletos([nombre, apellido, email, password, genero])) {
                localStorage.setItem('nombreUsuario', nombre.value);
                localStorage.setItem('emailUsuario', email.value);
                toggleVisibility(registrationSuccessMessage, true);
                toggleVisibility(loginForm, false);
                toggleVisibility(loginMessage, false);
                toggleVisibility(registerHeader, false);
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

    window.iniciarSesion = function() {
        const email = document.getElementById('existingEmail').value;
        const password = document.getElementById('existingPassword').value;

        if (email && password) {
            const nombre = localStorage.getItem('nombreUsuario');
            const mensajeBienvenida = `Bienvenid@, ${nombre || email}! es un placer tenerte en nuestra página!`;
            localStorage.setItem('mensajeBienvenida', mensajeBienvenida);
            window.location.href = "mitienda.html";  
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };

    loginRedirectBtn && loginRedirectBtn.addEventListener('click', (event) => {
        event.preventDefault();
        toggleVisibility(loginMessage, true);
        toggleVisibility(registrationSuccessMessage, false);
    });

    toggleCarritoBtn && toggleCarritoBtn.addEventListener('click', () => {
        carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
    });

    window.agregarAlCarrito = function(producto, precio) {
        carrito.push({ producto, precio });
        totalCompra += precio;
        mostrarCarrito();
    };

    function mostrarCarrito() {
        carritoItems.innerHTML = '';
        emptyCartMessage.style.display = carrito.length === 0 ? 'block' : 'none';

        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.innerHTML = `${item.producto} - $${item.precio} <button class="remove-button" onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
            carritoItems.appendChild(div);
        });

        totalElement.textContent = `Total: $${totalCompra}`;
    }

    window.eliminarDelCarrito = function(index) {
        totalCompra -= carrito[index].precio;
        carrito.splice(index, 1);
        mostrarCarrito();
    };

    // Función para finalizar la compra con un mensaje personalizado
    window.finalizarCompra = function() {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío, no puedes finalizar la compra.");
        } else {
            let detallesCompra = 'Detalle de tu compra:\n';
            carrito.forEach(item => {
                detallesCompra += `${item.producto} - $${item.precio}\n`;
            });
            const nombre = localStorage.getItem('nombreUsuario') || 'Cliente'; 
            // Mensaje de agradecimiento modificado
            const mensajeGracias = `
                <h3>¡Gracias por tu compra, ${nombre}!</h3>
                <p>Tu apoyo es invaluable y has ayudado a muchas personas con tu compra.</p>
                <p><strong>Detalles de tu compra:</strong></p>
                <pre>${detallesCompra}</pre>
                <p><strong>Total: $${totalCompra}</strong></p>
                <p>¡Gracias por ser parte de esta causa tan especial!</p>
            `;

            // Mostrar el mensaje en una sección destacada
            const mensajeDiv = document.createElement('div');
            mensajeDiv.classList.add('mensaje-gracias');
            mensajeDiv.innerHTML = mensajeGracias;
            document.body.appendChild(mensajeDiv); // Agregarlo al body o una sección específica de tu página

            // Limpiar el carrito después de la compra
            carrito = [];
            totalCompra = 0;
            mostrarCarrito();
        }
    };

    catalogoBtn && catalogoBtn.addEventListener('click', () => {
        window.location.href = "catalogo.html";
    });

    redesSocialesBtn && redesSocialesBtn.addEventListener('click', () => {
        console.log('Redirigiendo a Redes Sociales...');
        window.location.href = "redes.Sociales.html";
    });

    const welcomeMessage = localStorage.getItem('mensajeBienvenida');
    const welcomeDiv = document.getElementById('welcomeMessage');

    if (welcomeMessage && welcomeDiv) {
        welcomeDiv.innerHTML = `<h2>${welcomeMessage}</h2>`;
        welcomeDiv.style.display = 'block';
        localStorage.removeItem('mensajeBienvenida');
    }

    function toggleVisibility(element, isVisible) {
        if (element) {
            element.style.display = isVisible ? 'block' : 'none';
        }
    }

    const productos = [
        {
            titulo: "Bolsita 1",
            descripcion: "Cuando pienses en las personas por las que valen la pena luchar, no olvides incluirte",
            precio: 250,
            imagen: "bolsita1.1.jpg",
            comentarios: ["Me encanta comprar sabiendo que es por una buena causa. - Juan"]
        },
        {
            titulo: "Bolsita 2",
            descripcion: "Donde sea que la vida te plante, florece",
            precio: 250,
            imagen: "bolsita2.2.jpg",
            comentarios: ["Gracias por ayudar a las personas, me encanta. - María"]
        },
        {
            titulo: "Bolsita 3",
            descripcion: "Brillas bien bonito cuando confías en tu potencial",
            precio: 250,
            imagen: "bolsita3.3.jpg",
            comentarios: ["¡Qué hermoso todo! - Marta"]
        },
        {
            titulo: "Llaveros con diseños",
            descripcion: "Llaveros artesanales solidarios",
            precio: 60,
            imagen: "llaveros.jpg",
            comentarios: ["Son maravillosos, ¡quiero! - Adrian"]
        },
        {
            titulo: "Tazas",
            descripcion: "Tazas con diseños personalizados",
            precio: 200,
            imagen: "tazas.1.jpg",
            comentarios: ["¡Qué divinos diseños! - Agustina"]
        },
    ];

    window.agregarComentario = function(tituloProducto, comentario) {
        const producto = productos.find(p => p.titulo === tituloProducto);
        const emailUsuario = localStorage.getItem('emailUsuario');
        if (producto && comentario.trim() !== "") {
            producto.comentarios.push(`${comentario} - <i>${emailUsuario}</i>`);
            actualizarComentarios(tituloProducto);
            alert(`Comentario agregado al producto ${tituloProducto}: "${comentario}"`);
        } else {
            alert(`Por favor ingresa un comentario válido.`);
        }
    };

    function actualizarComentarios(tituloProducto) {
        const productDiv = Array.from(document.getElementsByClassName('product'))
            .find(div => div.querySelector('.product-info span').textContent.includes(tituloProducto));
        
        if (productDiv) {
            const producto = productos.find(p => p.titulo === tituloProducto);
            const reviewDiv = productDiv.querySelector('.review');
            reviewDiv.innerHTML = producto.comentarios.join("<br>");
        }
    }

    const productGrid = document.getElementById('productGrid');
    productos.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="product-info">
                <h3>${producto.titulo}</h3>
                <p>${producto.descripcion}</p>
                <span>$${producto.precio}</span>
                <button onclick="agregarAlCarrito('${producto.titulo}', ${producto.precio})">Agregar al carrito</button>
                <div class="review">${producto.comentarios.join("<br>")}</div>
                <input type="text" placeholder="Escribe un comentario..." id="comentario_${producto.titulo}">
                <button onclick="agregarComentario('${producto.titulo}', document.getElementById('comentario_${producto.titulo}').value)">Comentar</button>
            </div>
        `;
        productGrid.appendChild(productDiv);
    });

});

