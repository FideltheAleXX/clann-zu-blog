import { albums } from './lyrics.js';

//ALBUMS-page
const albumsList = document.querySelector('.albums');

const albumsHtml = albums
  .map(
    (album) => `
  <article class="album">
  <h2 class="album-title">${album.title}</h2> <h4>${album.year}</h4>
   <img
        class="album-cover"
        src="${album.img}"
        alt="album cover of clann zu band"
      />
      <div class="album-tracklist"><p class="album-tracklist__title">Tracklist</p>
      
      <ul class="album-tracklist__list"> ${album.tracklist
        .map(
          (item) => `<li><details>
      <summary class="track-summary">
      <span class="material-symbols-outlined close">add</span>
<span class="material-symbols-outlined open">
remove
</span>
${item.id} ${item.track} ${item.duration}
          </summary>
          <div class="track-lyrics">${item.lyrics}</div>
  </details></li>`,
        )
        .join('')} </ul></div>
    </article>`,
  )
  .join('');

albumsList.innerHTML = albumsHtml;
