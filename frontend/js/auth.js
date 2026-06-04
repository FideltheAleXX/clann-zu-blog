const API_URL = 'http://localhost:3000';

const toggleButtons = document.querySelectorAll('.toggle-btn');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');

toggleButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const formType = btn.dataset.form;

    toggleButtons.forEach((b) => b.classList.remove('active'));

    btn.classList.add('active');

    loginForm.classList.remove('active');
    registerForm.classList.remove('active');

    if (formType === 'login') {
      loginForm.classList.add('active');
    } else if (formType === 'register') {
      registerForm.classList.add('active');
    }
  });
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
