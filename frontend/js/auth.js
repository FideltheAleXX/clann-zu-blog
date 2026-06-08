const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  if (token) {
    window.location.href = './index.html';
  }
});

function switchAuthMode(mode) {
  const loginForm = document.getElementById('login-form-block');
  const registerForm = document.getElementById('register-form-block');

  if (mode === 'register') {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  } else {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const currentHash = window.location.hash.replace('#', '');

  if (currentHash) {
    switchAuthMode(currentHash);
  }
});

window.addEventListener('hashchange', () => {
  const currentHash = window.location.hash.replace('#', '');
  switchAuthMode(currentHash);
});

//LOGIN
const loginFormElement = document.querySelector('form.loggin-form');
loginFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const loginIdentifier = loginFormElement.querySelector('.email-input').value;
  const password = loginFormElement.querySelector('.password-input').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginIdentifier,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      showSuccessLogin();
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Server error. Please, try again later.');
  }

  loginFormElement.reset();
});

//REGISTRATION
const registerFormElement = document.querySelector('form.register-form');
registerFormElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = registerFormElement.querySelectorAll('input')[0].value;
  const nickname = registerFormElement.querySelectorAll('input')[1].value;
  const password = registerFormElement.querySelectorAll('input')[2].value;

  try {
    const response = await fetch(`${API_URL}/auth/reg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        nickname,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('You`re registred! Please, log in.');
      switchAuthMode('login');
      registerFormElement.reset();
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('Server error. Please, try again later.');
  }

  registerFormElement.reset();
});

const loginModal = document.getElementById('login-success-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

function showSuccessLogin() {
  loginModal.showModal();
}

closeModalBtn.addEventListener('click', () => {
  loginModal.close();

  window.location.href = './index.html';
});
