<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ blogTitle }}</h2>
      <img :src="blogPhotoFileURL" alt="" />
      <div class="post-content ql-editor" v-html="blogHTML"></div>
    </div>
  </div>
</template>

<script setup>
import { usePost } from '@/stores/post';
import { storeToRefs } from 'pinia';

const postStore = usePost();
const { blogHTML, blogTitle, blogPhotoFileURL } = storeToRefs(postStore);
</script>

<style scoped>
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
