export const postModel = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    return result.rows;
  },
};
