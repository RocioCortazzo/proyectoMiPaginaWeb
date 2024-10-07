document.addEventListener('DOMContentLoaded', () => {
    const toggleFormBtn = document.getElementById('toggleFormBtn');  
    const registerForm = document.getElementById('registerForm');    
    const loginForm = document.getElementById('loginForm');          
    const registerMessage = document.getElementById('registerMessage');  
    const loginMessage = document.getElementById('loginMessage');   

   
    let isRegisterFormActive = true;  

    
    toggleFormBtn.addEventListener('click', () => {
        if (isRegisterFormActive) {
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
            toggleFormBtn.textContent = 'Registrarse'; 
            isRegisterFormActive = false;  
        } else {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
            toggleFormBtn.textContent = 'Iniciar sesión';  
            isRegisterFormActive = true;  
        }
    });

    
    const registerFormElement = document.getElementById('registerFormElement');
const RegisterMessage = document.getElementById('registerMessage'); 

registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;

    if (name && email) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', true);

        registerMessage.textContent = 'Usuario Registrado exitosamente. Redirigiendo a inicio de sesión...';
        
        setTimeout(() => {
            location.reload(); 
        }, 2000);  
    } else {
        registerMessage.textContent = 'Por favor, complete todos los campos.';
    }
});


  
    const loginFormElement = document.getElementById('loginFormElement');
    loginFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginName = document.getElementById('loginName').value;
        const loginEmail = document.getElementById('loginEmail').value;
        const storedName = localStorage.getItem('userName');
        const storedEmail = localStorage.getItem('userEmail');

        if (loginName === storedName && loginEmail === storedEmail) {
            loginMessage.textContent = 'Inicio de sesión exitoso. Redirigiendo..';
            setTimeout(() => {
                window.location.href = `mitienda.html?name=${loginName}`; 
            }, 1000);
        } else {
            loginMessage.textContent = 'Nombre o email incorrecto. Vuelve a intentarlo.';
        }
    });
});
