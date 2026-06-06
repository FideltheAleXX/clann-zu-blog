//CREATE POST
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
