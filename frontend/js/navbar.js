const heroAuth = document.querySelector('.hero-auth');

function updateNavbar() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (token && user) {
    heroAuth.innerHTML = `
      <div>
        <button class="hero-btn" onclick="window.location.href='./posts.html'">Write post</button>
      </div>
      <div>
        <button class="hero-btn logout-btn" onclick="logout()">Log Out</button>
      </div>
      
    `;
  } else {
    heroAuth.innerHTML = `
      <div>
        <a href="./auth.html"><button class="hero-btn">Sign In</button></a>
      </div>
      <div>
        <a href="./auth.html"><button class="hero-btn">Sign Up</button></a>
      </div>
    `;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', updateNavbar);

window.addEventListener('storage', updateNavbar);
