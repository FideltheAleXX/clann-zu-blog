import bcrypt from 'bcrypt';
import { userModel } from '../models/user.model.js';

export const authController = {
  registration: async (req, res) => {
    try {
      let { email, nickname, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Email and password are required fields' });
      }

      email = email.toLowerCase().trim();

      // Если никнейм не введен, используем email в качестве никнейма
      if (!nickname || nickname.trim() === '') {
        nickname = email;
      } else {
        nickname = nickname.trim();
      }

      const existingUsers = await userModel.validateNickOrEmail(
        email,
        nickname,
      );

      if (existingUsers.length > 0) {
        const isEmailTaken = existingUsers.some(
          (user) => user.email.toLowerCase() === email,
        );
        const isNicknameTaken = existingUsers.some(
          (user) => user.nickname.toLowerCase() === nickname,
        );

        if (isEmailTaken) {
          return res
            .status(400)
            .json({ message: 'User with same password already exists' });
        }
        if (isNicknameTaken) {
          return res.status(400).json({ message: 'Nickname already exists' });
        }
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const newUser = await userModel.registrUser(
        email,
        nickname,
        passwordHash,
      );

      return res.status(201).json({
        message: 'User registred successfully.',
        user: newUser,
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  login: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel.getById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  },
};
