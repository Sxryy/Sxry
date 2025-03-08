// src/api/blog.js
import axios from 'axios';

export const fetchPosts = async () => {
  const response = await axios.get('/api/posts');
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await axios.get(`/api/posts/${id}`);
  return response.data;
};