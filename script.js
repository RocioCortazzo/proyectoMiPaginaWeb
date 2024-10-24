document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const registrationSuccessMessage = document.getElementById('registrationSuccessMessage');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const registerHeader = document.getElementById('registerHeader');
    const goToLoginBtn = document.getElementById('goToLoginBtn');
    const registerForm = document.getElementById('registerForm');
    const accountExistsMessage = document.getElementById('accountExistsMessage'); // Elemento del mensaje de cuenta existente

    // Manejar el registro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const genero = document.getElementById('genero').value;
            const emailRegistrado = localStorage.getItem('emailUsuario'); // Verificar si el email ya existe
            
            // Ocultar el mensaje de cuenta existente antes de hacer cualquier verificación
            accountExistsMessage.style.display = 'none';

            if (email === emailRegistrado) {
                accountExistsMessage.style.display = 'block'; // Mostrar el mensaje de cuenta existente
                return;
            }

            if (nombre && apellido && email && password && genero) {
                localStorage.setItem('nombreUsuario', nombre);
                localStorage.setItem('emailUsuario', email); // Guardar el email registrado
                if (registrationSuccessMessage) registrationSuccessMessage.style.display = 'block';
                registerForm.style.display = 'none'; 
                console.log(`Usuario registrado: ${nombre} ${apellido} (${email}) - Género: ${genero}`);
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

    // Manejar el inicio de sesión
    window.iniciarSesion = function() {
        const email = document.getElementById('existingEmail').value;
        const password = document.getElementById('existingPassword').value;

        if (email && password) {
            const nombre = localStorage.getItem('nombreUsuario');
            const mensajeBienvenida = `Bienvenid@, ${nombre || email}! es un placer tenerte en nuestra página!`;
            localStorage.setItem('mensajeBienvenida', mensajeBienvenida); // Guardar mensaje en localStorage
            window.location.href = "mitienda.html";  
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };

    // Cambiar a la vista de registro
    if (registerBtn) {
        registerBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (registerForm) registerForm.style.display = 'block'; 
            if (loginMessage) loginMessage.style.display = 'none'; 
            if (registerHeader) registerHeader.style.display = 'block'; 
            if (loginForm) loginForm.style.display = 'none'; 
        });
    }

    // Cambiar a la vista de inicio de sesión
    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (loginForm) loginForm.style.display = 'none'; 
            if (loginMessage) loginMessage.style.display = 'block'; 
            if (registerHeader) registerHeader.style.display = 'none';
        });
    }

    // Regresar al inicio de sesión
    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (registrationSuccessMessage) registrationSuccessMessage.style.display = 'none'; 
            if (loginMessage) loginMessage.style.display = 'block'; 
            if (registerHeader) registerHeader.style.display = 'none'; 
            if (registerForm) registerForm.style.display = 'none'; 
        });
    }

    // Carrito de compras
    let carrito = [];
    let totalCompra = 0;
    const carritoContainer = document.getElementById('carritoContainer');
    const toggleCarritoBtn = document.getElementById('toggleCarritoBtn');
    const carritoItems = document.getElementById('carritoItems');
    const totalElement = document.getElementById('total');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    if (toggleCarritoBtn) {
        toggleCarritoBtn.addEventListener('click', () => {
            carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Agregar productos al carrito
    window.agregarAlCarrito = function(producto, precio) {
        carrito.push({ producto, precio });
        totalCompra += precio;
        mostrarCarrito();
    };

    // Mostrar carrito
    function mostrarCarrito() {
        if (carritoItems) carritoItems.innerHTML = '';
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';

        if (carrito.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        } else {
            carrito.forEach((item, index) => {
                const div = document.createElement('div');
                div.innerHTML = `${item.producto} - $${item.precio} <button class="remove-button" onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
                carritoItems.appendChild(div);
            });
        }

        if (totalElement) totalElement.textContent = `Total: $${totalCompra}`;
    }

    // Eliminar producto del carrito
    window.eliminarDelCarrito = function(index) {
        totalCompra -= carrito[index].precio;
        carrito.splice(index, 1);
        mostrarCarrito();
    };

    // Finalizar compra
    window.finalizarCompra = function() {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío, no puedes finalizar la compra.");
        } else {
            let detallesCompra = 'Detalle de tu compra:\n';
            carrito.forEach(item => {
                detallesCompra += `${item.producto} - $${item.precio}\n`;
            });
            alert(`${detallesCompra}\n¡Gracias por tu compra! Has gastado $${totalCompra}.`);
            carrito = [];
            totalCompra = 0;
            mostrarCarrito();
        }
    };

    // Navegación
    const catalogoBtn = document.getElementById('catalogoBtn');
    const redesSocialesBtn = document.getElementById('redesSocialesBtn');

    if (catalogoBtn) {
        catalogoBtn.addEventListener('click', () => {
            window.location.href = "catalogo.html";
        });
    }

    if (redesSocialesBtn) {
        redesSocialesBtn.addEventListener('click', () => {
            window.location.href = "redes_sociales.html"; 
        });
    }

    // Mostrar mensaje de bienvenida
    const welcomeMessage = localStorage.getItem('mensajeBienvenida');
    const welcomeDiv = document.getElementById('welcomeMessage');

    if (welcomeMessage && welcomeDiv) {
        welcomeDiv.innerHTML = `<h2>${welcomeMessage}</h2>`;
        welcomeDiv.style.display = 'block';
        localStorage.removeItem('mensajeBienvenida');
    }
});
