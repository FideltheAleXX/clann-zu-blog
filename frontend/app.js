//ALBUMS-page

const albums = [
  {
    title: 'Clann Zú',
    year: '(2000)',
    img: './images/clann-zu-st.jpg',
    tracklist: [
      { id: '01', track: 'Of Course It Is', duration: '5:57' },
      { id: '02', track: '	An Bád Dubh', duration: '3:56' },
      { id: '03', track: 'Absence Makes The Heart Die', duration: '8:07' },
      { id: '04', track: 'Hi Fat Lo Fat', duration: '4:01' },
      {
        id: '05',
        track: 'The Sailor Who Fell From Grace With The Sea',
        duration: '2:55',
      },
    ],
  },
  {
    title: 'Rua',
    year: '(2002)',
    img: './images/rua.jpg',
    tracklist: [
      { id: '01', track: 'Words For Snow', duration: '4:37' },
      { id: '02', track: 'Five Thousand More', duration: '4:14' },
      { id: '03', track: 'Hope This Day', duration: '3:17' },
      { id: '04', track: "All That You've Ever Known", duration: '5:34' },
      { id: '05', track: 'Everyday', duration: '4:05' },
      { id: '06', track: 'All The People Now', duration: '6:31' },
      { id: '07', track: 'Rí Rá', duration: '3:22' },
      { id: '08', track: 'Lights Below', duration: '6:12' },
      { id: '09', track: 'Crashing To The Floor', duration: '2:44' },
      {
        id: '10',
        track: "You're Listening To A Dead Man Speak",
        duration: '6:53',
      },
    ],
  },
  {
    title: 'Black Coats & Bandages',
    year: '(2004)',
    img: './images/black-coats-and-bandages.jpg',
    tracklist: [
      { id: '01', track: 'Black Coats And Bandages', duration: '4:37' },
      { id: '02', track: 'There Will Be No Morning Copy', duration: '4:14' },
      { id: '03', track: 'So Complicated Was The Fall', duration: '3:17' },
      { id: '04', track: 'An T-éan Bán', duration: '5:34' },
      { id: '05', track: 'One Bedroom Apartment', duration: '4:05' },
      { id: '06', track: 'From An Unholy Height', duration: '6:31' },
      { id: '07', track: 'Án Deireadh Scéal', duration: '3:22' },
      { id: '08', track: 'From Bethlehem To Jenin', duration: '6:12' },
      { id: '09', track: "You'll Have To Swim", duration: '2:44' },
      { id: '10', track: 'A Sudden Intake Of Breath', duration: '6:53' },
    ],
  },
];

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
