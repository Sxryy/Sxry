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


export const createPost = (formData) => {
  return axios.post('/api/posts', formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // 携带用户token
    }
  });
};