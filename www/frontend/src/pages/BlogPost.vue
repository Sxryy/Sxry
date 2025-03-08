<template>
    <div class="blog-post">
      <h1>{{ post.title }}</h1>
      <div v-html="post.content"></div> <!-- 假设后端返回HTML格式内容 -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchPostById } from '../api/blog';
  
  const route = useRoute();
  const post = ref({});
  
  onMounted(async () => {
    post.value = await fetchPostById(route.params.id);
  });
  </script>