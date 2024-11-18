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

    const camposCompletos = (campos) => {
        return campos.every(campo => campo.value.trim() !== '');
    };

    if (registerBtn) {
        registerBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleVisibility(loginForm, true);
            toggleVisibility(loginMessage, false);
            toggleVisibility(registerHeader, true);
            toggleVisibility(registrationSuccessMessage, false);
        });
    }

    if (loginRedirectBtn) {
        loginRedirectBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleVisibility(loginMessage, true);
            toggleVisibility(registrationSuccessMessage, false);
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleVisibility(loginForm, false);
            toggleVisibility(loginMessage, true);
            toggleVisibility(registerHeader, false);
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
                localStorage.setItem('passwordUsuario', password.value);
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
            const storedEmail = localStorage.getItem('emailUsuario');
            const storedPassword = localStorage.getItem('passwordUsuario');

            if (email === storedEmail && password === storedPassword) {
                const nombre = localStorage.getItem('nombreUsuario');
                const mensajeBienvenida = `Bienvenid@, ${nombre || email}! es un placer tenerte en nuestra página!`;
                localStorage.setItem('mensajeBienvenida', mensajeBienvenida);
                window.location.href = "mitienda.html";
            } else {
                mostrarAlerta("Correo o contraseña incorrectos.");
            }
        } else {
            mostrarAlerta("Por favor, completa todos los campos.");
        }
    };

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

    if (catalogoBtn) {
        catalogoBtn.addEventListener('click', () => {
            console.log('Botón Catálogo presionado');
            window.location.href = "catalogo.html";  
        });
    }

    if (redesSocialesBtn) {
        redesSocialesBtn.addEventListener('click', () => {
            console.log('Botón Redes Sociales presionado');
            window.location.href = "redes.Sociales.html";  
        });
    }

    let carrito = [];
    let totalCompra = 0;
    const carritoContainer = document.getElementById('carritoContainer');
    const toggleCarritoBtn = document.getElementById('toggleCarritoBtn');
    const carritoItems = document.getElementById('carritoItems');
    const totalElement = document.getElementById('total');
    const emptyCartMessage = document.getElementById('emptyCartMessage');


    if (toggleCarritoBtn && carritoContainer) {
        toggleCarritoBtn.addEventListener('click', () => {
            carritoContainer.style.display = carritoContainer.style.display === 'none' ? 'block' : 'none';
        });
    }

    
    if (carritoContainer) {
        carritoContainer.style.display = 'none';
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
        
        const mensajeCompraDiv = document.getElementById("mensajeCompra");

        const botonAceptar = document.createElement('button');
        botonAceptar.classList.add('aceptar-btn');
        botonAceptar.textContent = 'Aceptar';
      
        if (carrito.length === 0) {
           
            mensajeCompraDiv.innerHTML = `<p>Tu carrito está vacío, no puedes finalizar la compra.</p>`;
            mensajeCompraDiv.classList.add('error');
        } else {
            let detallesCompra = 'Detalle de tu compra:<br>';
            carrito.forEach(item => {
                detallesCompra += `${item.producto} - $${item.precio}<br>`;
            });
            const nombre = localStorage.getItem('nombreUsuario') || 'Cliente';
            mensajeCompraDiv.innerHTML = `${detallesCompra}<br><p>¡Gracias por tu compra, ${nombre}! Has gastado $${totalCompra}. ¡Has ayudado a muchas personas!</p>`;
            mensajeCompraDiv.classList.add('exito');
        }
        
        mensajeCompraDiv.appendChild(botonAceptar);

      
        document.body.appendChild(mensajeCompraDiv);

        mensajeCompraDiv.style.display = 'block';
    
        botonAceptar.addEventListener('click', function() {
            mensajeCompraDiv.style.display = 'none';
        });

        carrito = [];
        totalCompra = 0;
        mostrarCarrito();
    };

    const productos = [
        {
            titulo: "Totebag corazones",
            descripcion: "Cuando pienses en las personas por las que valen la pena luchar, no olvides incluirte",
            precio: 250,
            imagen: "bolsita1.1.jpg",
            comentarios: ["Me encanta comprar sabiendo que es por una buena causa. - Juan"]
        },
        {
            titulo: "Totebag flores",
            descripcion: "Donde sea que la vida te plante, florece",
            precio: 250,
            imagen: "bolsita2.2.jpg",
            comentarios: ["Gracias por ayudar a las personas, me encanta. - María"]
        },
        {
            titulo: "Totebag multicolor",
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

    const productGrid = document.getElementById('productGrid');
    productos.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
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

    window.agregarComentario = function(tituloProducto, comentario) {
        const producto = productos.find(p => p.titulo === tituloProducto);
        const emailUsuario = localStorage.getItem('emailUsuario');
        
        
        if (!comentario.trim()) {
            mostrarAlertaComentarioVacio(); 
            return; 
        }
    
        if (producto) {
          
            producto.comentarios.push(`${comentario} - <i>${emailUsuario}</i>`);
            actualizarComentarios(tituloProducto);
            
            
            mostrarAlertaComentario();
        } else {
            alert(`Producto "${tituloProducto}" no encontrado.`);
        }
    };
    
    function actualizarComentarios(tituloProducto) {
        const productDiv = Array.from(document.getElementsByClassName('product'))
            .find(div => div.querySelector('.product-info h3').textContent.includes(tituloProducto));
        
        if (productDiv) {
            const producto = productos.find(p => p.titulo === tituloProducto);
            const reviewDiv = productDiv.querySelector('.review');
            reviewDiv.innerHTML = producto.comentarios.map(c => `<p>${c}</p>`).join('');
        }
    }
    
   
    function mostrarAlertaComentarioVacio() {
        const alerta = document.createElement('div');
        alerta.classList.add('alerta-comentario-vacio');
        alerta.innerHTML = `
            <p>¡Por favor, escribe algo en el comentario!</p>
            <button class="cerrar-alerta">Aceptar</button>
        `;
        
        
        document.body.appendChild(alerta);
    
       
        const cerrarBtn = alerta.querySelector('.cerrar-alerta');
        cerrarBtn.addEventListener('click', () => {
            alerta.remove(); 
        });
    }
    
    function mostrarAlertaComentario() {
        const alerta = document.createElement('div');
        alerta.classList.add('alerta-comentario-agregado'); 
        alerta.innerHTML = `
            <p>¡Comentario agregado exitosamente!</p>
            <button class="cerrar-alerta">Aceptar</button>
        `;
        
       
        document.body.appendChild(alerta);
        
      
        alerta.style.display = 'block';
    

        const cerrarBtn = alerta.querySelector('.cerrar-alerta');
        cerrarBtn.addEventListener('click', () => {
            alerta.remove(); 
        });
        
       
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }

    function mostrarAlerta(mensaje) {
        const alerta = document.createElement('div');
        alerta.classList.add('custom-alert');
        alerta.textContent = mensaje;

        document.body.appendChild(alerta);

        setTimeout(() => {
            alerta.classList.add('show');
        }, 10);

        setTimeout(() => {
            alerta.classList.remove('show');
            setTimeout(() => {
                alerta.remove();
            }, 300);
        }, 3000);
    }

});













