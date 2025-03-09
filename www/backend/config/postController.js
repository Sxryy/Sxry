exports.createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
      const post = new Post({
        title,
        content,
        image: imagePath,
        author: req.user.id // 从认证中间件获取用户ID
      });
  
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };