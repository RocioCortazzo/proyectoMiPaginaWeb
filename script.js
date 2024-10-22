document.addEventListener('DOMContentLoaded', () => {
   
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const registrationSuccessMessage = document.getElementById('registrationSuccessMessage');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const registerHeader = document.getElementById('registerHeader');
    const goToLoginBtn = document.getElementById('goToLoginBtn');

    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (loginForm) loginForm.style.display = 'none'; 
            if (loginMessage) loginMessage.style.display = 'block'; 
            if (registerHeader) registerHeader.style.display = 'none';
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (loginForm) loginForm.style.display = 'block';
            if (loginMessage) loginMessage.style.display = 'none'; 
            if (registerHeader) registerHeader.style.display = 'block'; 
        });
    }

   
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (nombre && apellido && email && password) {
                if (registrationSuccessMessage) registrationSuccessMessage.style.display = 'block';
                loginForm.style.display = 'none'; 
                console.log(`Usuario registrado: ${nombre} ${apellido} (${email})`);
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }

  
    window.iniciarSesion = function() {
        const email = document.getElementById('existingEmail').value;
        const password = document.getElementById('existingPassword').value;

        if (email && password) {
            alert(`Bienvenido de nuevo, ${email}!`);
            window.location.href = "mitienda.html";  
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };

   
    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', function(event) {
            event.preventDefault();
            if (registrationSuccessMessage) registrationSuccessMessage.style.display = 'none'; 
            if (loginMessage) loginMessage.style.display = 'block'; 
            if (registerHeader) registerHeader.style.display = 'none'; 
        });
    }

   
    let carrito = [];
    let totalCompra = 0;

    const carritoContainer = document.getElementById('carritoContainer');
    const toggleCarritoBtn = document.getElementById('toggleCarritoBtn');
    const carritoItems = document.getElementById('carritoItems');
    const totalElement = document.getElementById('total');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    if (toggleCarritoBtn) {
    
        toggleCarritoBtn.addEventListener('click', () => {
            if (carritoContainer.style.display === 'none') {
                carritoContainer.style.display = 'block';
            } else {
                carritoContainer.style.display = 'none';
            }
        });
    }

    
    window.agregarAlCarrito = function(producto, precio) {
        carrito.push({ producto, precio });
        totalCompra += precio;
        mostrarCarrito();
    };

    
    function mostrarCarrito() {
        if (carritoItems) {
            carritoItems.innerHTML = '';  
        }
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'none';  
        }

        if (carrito.length === 0) {
            if (emptyCartMessage) {
              
                emptyCartMessage.style.display = 'block';
            }
        } else {
           
            carrito.forEach((item, index) => {
                const div = document.createElement('div');
                div.innerHTML = `${item.producto} - $${item.precio} 
                    <button class="remove-button" onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
                carritoItems.appendChild(div);
            });
        }

       
        if (totalElement) {
            totalElement.textContent = `Total: $${totalCompra}`;
        }
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

            alert(`${detallesCompra}\n¡Gracias por tu compra! Has gastado $${totalCompra}.`);
            carrito = [];  
            totalCompra = 0;
            mostrarCarrito();
        }
    };
    window.Catalogo = function() {
        window.location.href = "catalogo.html";
    };

   
    window.RedesSociales = function() {
        window.location.href = "redes_sociales.html"; 
    };
});