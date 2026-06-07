import { loadPosts } from './posts.js';

//CREATE POST
const API_URL = 'http://localhost:3000/posts';

async function createPost(e) {
  e.preventDefault();

  const title = document.getElementById('post-title').value;
  const img = document.getElementById('post-img').value;
  const content = document.getElementById('post-content').value;

  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please, log in.');
    return;
  }

  const newPostData = { title, content, img };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPostData),
    });

    if (response.ok) {
      alert('Post published successfully!');

      document.getElementById('add-post-form').reset();

      window.location.href = './posts.html';
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
  const form = document.getElementById('add-post-form');
  if (form) {
    form.addEventListener('submit', createPost);
  }
});
