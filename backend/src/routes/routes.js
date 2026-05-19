import express from 'express';
import { posts } from '../posts.js';
import { postController } from '../controllers/post.controller.js';

export const postRouter = express.Router();

// 1. GET all posts
postRouter.get('/posts', postController.getAllPosts);

// 2. POST
postRouter.post('/', (req, res) => {
  const { title, content, author, img } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    img,
    content,
    author,
    createdAt: new Date().toISOString().split('T')[0],
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// 3. GET one post
postRouter.get('/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === postId);
  if (foundPost) {
    res.json(foundPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// 4. PATCH
postRouter.patch('/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content, img } = req.body;
  const foundPost = posts.find((post) => post.id === postId);

  if (!foundPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (img !== undefined) post.img = img;

  res.json(post);
});

// 5. DELETE
postRouter.delete('/:id', async (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts.splice(postIndex, 1);

  res.json({ message: 'Post succefully deleted' });
});
