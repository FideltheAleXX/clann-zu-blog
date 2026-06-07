const API_URL = 'http://localhost:3000/posts';

async function loadSinglePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    alert('Post not found');
    window.location.href = './posts.html';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${postId}`);
    if (!response.ok) throw new Error('Server: Post not found');

    const post = await response.json();

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-meta').textContent =
      `Author: ${post.author} | Date: ${new Date(post.created_at).toLocaleDateString()}`;
    document.getElementById('post-content').textContent = post.content;

    const imgElement = document.getElementById('post-img');
    if (post.img) {
      imgElement.src = post.img;
      imgElement.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    document.getElementById('full-post-container').innerHTML =
      '<h2>Error: Post do not exist.</h2>';
  }
}

document.addEventListener('DOMContentLoaded', loadSinglePost);
