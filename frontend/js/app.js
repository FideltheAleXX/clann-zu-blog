import { albums } from './lyrics.js';

//ALBUMS-page
const albumsList = document.querySelector('.albums');

const albumsHtml = albums
  .map(
    (album) => `
  <div class="album">
  <h2>${album.title}</h2> <h3>${album.year}</h3>
   <img
        class="album-cover"
        src="${album.img}"
        alt="album cover of clann zu band"
      />
      <div> <p>Tracklist</p>
      
      <ul> ${album.tracklist
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
    </div>`,
  )
  .join('');

albumsList.innerHTML = albumsHtml;
