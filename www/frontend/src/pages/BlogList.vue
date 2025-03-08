<template>
    <div class="blog-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h2>{{ post.title }}</h2>
        <p>{{ post.summary }}</p>
        <router-link :to="`/blog/${post.id}`">阅读全文</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { fetchPosts } from '../api/blog';
  
  const posts = ref([]);
  
  onMounted(async () => {
    posts.value = await fetchPosts();
  });
  </script>