const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createPost } = require('../controllers/postController');
const upload = require('../utils/multer'); // 文件上传中间件

router.post('/', auth, upload.single('image'), createPost);
module.exports = router;