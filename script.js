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

    const camposCompletos = (campos) => {
        return campos.every(campo => campo.value.trim() !== '');
    };

    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleVisibility(loginForm, false);
            toggleVisibility(loginMessage, true);
            toggleVisibility(registerHeader, false);
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleVisibility(loginForm, true);
            toggleVisibility(loginMessage, false);
            toggleVisibility(registerHeader, true);
            toggleVisibility(registrationSuccessMessage, false);
        });
    }

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

    if (loginRedirectBtn) {
        loginRedirectBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleVisibility(loginMessage, true);
            toggleVisibility(registrationSuccessMessage, false);
        });
    }

    if (toggleCarritoBtn) {
        toggleCarritoBtn.addEventListener('click', () => {
            carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
        });
    }

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

    window.finalizarCompra = function() {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío, no puedes finalizar la compra.");
        } else {
            let detallesCompra = 'Detalle de tu compra:\n';
            carrito.forEach(item => {
                detallesCompra += `${item.producto} - $${item.precio}\n`;
            });
            const nombre = localStorage.getItem('nombreUsuario') || 'Cliente'; 
            alert(`${detallesCompra}\n¡Gracias por tu compra! ${nombre}, has ayudado a muchas personas! Has gastado $${totalCompra}.`);
            carrito = [];
            totalCompra = 0;
            mostrarCarrito();
        }
    };

    if (catalogoBtn) {
        catalogoBtn.addEventListener('click', () => {
            window.location.href = "catalogo.html";
        });
    }

    if (redesSocialesBtn) {
        redesSocialesBtn.addEventListener('click', () => {
            console.log('Redirigiendo a Redes Sociales...');
            window.location.href = "redes.Sociales.html";
        });
    }

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
});
