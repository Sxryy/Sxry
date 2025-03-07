const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(bodyParser.urlencoded({ extended: true }));

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



app.post('/submit', (req, res) => {
  // 从请求体中获取表单数据
  const { name, email, message } = req.body;

  // 简单验证（必填字段）
  if (!name || !email || !message) {
    return res.status(400).send('所有字段均为必填');
  }

  // 此处可添加邮件发送或数据库存储逻辑
  res.send('表单提交成功！');
});


const nodemailer = require('nodemailer');

// 创建邮件传输器（需替换为你的邮箱和密码）
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-gmail-password', // 或应用专用密码（推荐）
  },
});

app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;








const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 处理表单提交
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  // 输入验证
  if (!name || !email || !message) {
    return res.status(400).send('所有字段均为必填');
  }

  try {
    // 将留言插入数据库
    const [result] = await pool.query(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    res.send('留言成功！');
  } catch (error) {
    console.error('数据库错误:', error);
    res.status(500).send('服务器错误，请稍后重试');
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








  // 配置邮件内容
  const mailOptions = {
    from: email,        // 发件人（用户填写的邮箱）
    to: 'your-email@gmail.com', // 收件人（你的邮箱）
    subject: `新留言来自 ${name}`, // 邮件主题
    text: `姓名: ${name}\n邮箱: ${email}\n留言内容:\n${message}`, // 纯文本内容
  };

  try {
    // 发送邮件
    await transporter.sendMail(mailOptions);
    res.send('留言成功！我们已收到您的信息。');
  } catch (error) {
    console.error('邮件发送失败:', error);
    res.status(500).send('留言提交失败，请稍后重试。');
  }
});


// 获取所有留言
app.get('/messages', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).send('查询失败');
  }
});


// 过滤 HTML 标签防止 XSS
const sanitizeInput = (input) => {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

// 在插入数据库前处理字段
const sanitizedName = sanitizeInput(name);
const sanitizedEmail = sanitizeInput(email);
const sanitizedMessage = sanitizeInput(message);


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).send('邮箱格式无效');
}