// POSTS-page
const API_URL = 'http://localhost:3000/posts';

async function loadPosts() {
  const container = document.getElementById('posts-container');
  try {
    const response = await fetch(API_URL);

    const posts = await response.json();

    container.innerHTML = '';

    if (posts.length === 0) {
      container.innerHTML = '<p>Posts do not exist yet. Write first post!</p>';
      return;
    }

    posts.forEach((post) => {
      const postCard = document.createElement('article');
      postCard.className = 'post-card';

      postCard.innerHTML = `
                <h2>${post.title}</h2>
                <small>Author: ${post.author} | Date: ${new Date(post.created_at).toLocaleDateString()}</small>
                ${post.img ? `<br><img src="${post.img}" alt="${post.title}" style="max-width:300px; margin-top:10px;">` : ''}
                <p>${post.content}</p>
                <hr>
            `;

      container.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = '<p style="color: red;">Check server.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadPosts);

//CREATE POST
async function createPost(e) {
  e.preventDefault();

  const title = document.getElementById('post-title').value;
  const author = document.getElementById('post-author').value;
  const img = document.getElementById('post-img').value;
  const content = document.getElementById('post-content').value;

  const newPostData = { title, author, content, img };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPostData),
    });

    if (response.ok) {
      alert('Post published successfully!');

      document.getElementById('add-post-form').reset();

      loadPosts();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error when creating post:', error);
    alert('Error connection to server.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPosts();

  const form = document.getElementById('add-post-form');
  form.addEventListener('submit', createPost);
});
