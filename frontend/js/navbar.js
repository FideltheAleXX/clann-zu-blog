const heroAuth = document.querySelector('.hero-auth');

function updateNavbar() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (token && user) {
    heroAuth.innerHTML = `
      <div>
        <button class="hero-btn" onclick="window.location.href='./create-post.html'">Write post</button>
      </div>
      <div>
        <button class="hero-btn logout-btn">Log Out</button>
      </div>
      
    `;

    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = './index.html';
      });
    }
  } else {
    heroAuth.innerHTML = `
      <div>
        <a href="./auth.html#login"><button class="hero-btn">Sign In</button></a>
      </div>
      <div>
        <a href="./auth.html#register"><button class="hero-btn">Sign Up</button></a>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', updateNavbar);

window.addEventListener('storage', updateNavbar);
