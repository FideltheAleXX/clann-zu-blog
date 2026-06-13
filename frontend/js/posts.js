// POSTS-page
const API_URL = 'http://localhost:3000/posts';

export async function loadPosts() {
  const container = document.getElementById('posts-container');

  if (!container) {
    return;
  }
  try {
    const response = await axios.get(API_URL);

    const posts = response.data;

    container.innerHTML = '';

    if (posts.length === 0) {
      container.innerHTML = '<p>Posts do not exist yet. Write first post!</p>';
      return;
    }

    posts.forEach((post) => {
      const postCard = document.createElement('article');
      postCard.className = 'post-card';

      postCard.innerHTML = `
                <a href="post.html?id=${post.id}"><h2>${post.title}</h2></a>
                <small>Author: ${post.author} | Date: ${new Date(post.created_at).toLocaleDateString()}</small><hr><br>
                ${post.img ? `<div class="post__img-block"><img class="post-img" src="${post.img}" alt="${post.title}"></div>` : ''}
                <p class="post-content">${post.content}</p>
                
            `;

      container.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = '<p style="color: red;">Check server.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadPosts);
