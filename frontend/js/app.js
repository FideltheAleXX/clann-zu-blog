import { albums } from './lyrics';

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
      <div> <p>Tracklist</p> <ul> ${album.tracklist.map((item) => `<li>${item.id} ${item.track} ${item.duration}</li>`).join('')} </ul></div>
    </div>`,
  )
  .join('');

albumsList.innerHTML = albumsHtml;
