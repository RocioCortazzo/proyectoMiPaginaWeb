document.addEventListener('DOMContentLoaded', () => {
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const registerMessage = document.getElementById('registerMessage');
    const loginMessage = document.getElementById('loginMessage');

    // Mostrar el formulario correcto según el estado de isLoggedIn
    if (isLoggedIn) {
        loginForm.classList.add('active');
    } else {
        registerForm.classList.add('active');
    }

    // Registro
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;

        if (name && email) {
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', true);

            registerMessage.textContent = 'Registrado exitosamente. Redirigiendo a inicio de sesión..';
            setTimeout(() => {
                location.reload();  // Refrescar para mostrar el formulario de inicio de sesión
            }, 1000);
        } else {
            registerMessage.textContent = 'Por favor, complete todos los campos.';
        }
    });

    // Inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginName = document.getElementById('loginName').value;
        const loginEmail = document.getElementById('loginEmail').value;
        const storedName = localStorage.getItem('userName');
        const storedEmail = localStorage.getItem('userEmail');

        if (loginName === storedName && loginEmail === storedEmail) {
            loginMessage.textContent = 'Inicio de sesión exitoso. Redirigiendo..';
            setTimeout(() => {
                window.location.href = `tienda.html?name=${loginName}`;
            }, 1000);
        } else {
            loginMessage.textContent = 'Nombre o email incorrecto. Vuelve a intentarlo.';
        }
    });
});