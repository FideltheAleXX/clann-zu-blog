import { postModel } from '../models/post.model.js';

export const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await postModel.getAll();

      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },
  getOnePost: async (req, res) => {
    const postId = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === postId);
    if (foundPost) {
      res.json(foundPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  },
};
