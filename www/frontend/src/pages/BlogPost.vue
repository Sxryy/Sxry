<template>
    <div class="blog-post">
      <h1>{{ post.title }}</h1>
      <div v-html="post.content"></div> <!-- 假设后端返回HTML格式内容 -->
    </div>
    <form @submit.prevent="submitPost">
    <input v-model="form.title" placeholder="标题" required>
    <textarea v-model="form.content" placeholder="内容" required></textarea>
    <input type="file" @change="handleFileUpload">
    <button type="submit">发布</button>
  </form>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchPostById } from '../api/blog';
  import { createPost } from '@/api/blog.js';
  
  const form = ref({ title: '', content: '', image: null });
  const handleFileUpload = (e) => form.value.image = e.target.files[0];

  const submitPost = async () => {
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('content', form.value.content);
  formData.append('image', form.value.image);
  try {
    await createPost(formData);
    alert('发布成功！');
  } catch (error) {
    alert('发布失败：' + error.message);
  }
  };

  const route = useRoute();
  const post = ref({});
  
  onMounted(async () => {
    post.value = await fetchPostById(route.params.id);
  });
  </script>