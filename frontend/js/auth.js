const API_URL = 'http://localhost:3000';

function switchAuthMode(mode) {
  const loginForm = document.querySelector('.login-form');
  const registerForm = document.querySelector('.register-form');

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
const loginFormElement = document.querySelector('.login-form form');
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

      window.location.href = './index.html';
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
const registerFormElement = document.querySelector('.register-form form');
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
      toggleButtons[0].click();
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
