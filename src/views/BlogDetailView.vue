<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ currentBlog.blogTitle }}</h2>
      <h4>
        Posted on:
        {{ new Date(currentBlog.blogDate).toLocaleString('en-us', { dateStyle: 'long' }) }}
      </h4>
      <img :src="currentBlog.blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="currentBlog.blogHTML"></div>
    </div>
  </div>
</template>

<script setup>
import { useBlogPosts } from '@/stores/blogPosts';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const blogPostsStore = useBlogPosts();
const { blogPost } = storeToRefs(blogPostsStore);

const currentBlog = ref({});

onMounted(() => {
  currentBlog.value = blogPost.value.find((post) => post.blogId === route.params.blogId);
});
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

  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
