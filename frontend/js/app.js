import { heroAuth, navigation } from './navigation.js';

//NAVIGATION
const navigationSection = document.querySelector('.navbar-nav');

const navigationHtml = navigation
  .map(
    (nav) =>
      `<li class="nav-item">
          <a class="nav-link" href="${nav.link}">${nav.title}</a>
        </li>`,
  )
  .join('');

navigationSection.innerHTML = navigationHtml;

//AUTH
const authSection = document.querySelector('.hero-auth');

const authHtml = heroAuth
  .map(
    (item) =>
      `<div>
            <a href="${item.link}"><button class="hero-btn">${item.title}</button></a>
          </div>`,
  )
  .join('');

authSection.innerHTML = authHtml;
