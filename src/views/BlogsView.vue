<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing post</span>
        <input type="checkbox" v-model="editPost" />
      </div>

      <BlogCards :post="card" v-for="(card, idx) in sampleBlogCards" :key="idx" />
    </div>
  </div>
</template>

<script setup>
import BlogCards from '@/components/BlogCard.vue';
import { useBlogCardsStore } from '@/stores/blogCards';
import { storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';

const blogCardsStore = useBlogCardsStore();
const { sampleBlogCards, editPost } = storeToRefs(blogCardsStore);
const { resetEditPost } = blogCardsStore;

onUnmounted(() => {
  resetEditPost();
});
</script>

<style scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    input[type='checkbox'] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: ▪#fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    input[type='checkbox']:before {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    input:checked[type='checkbox']:before {
      background: #fff;
      left: 52px;
    }
  }

  span {
    margin-right: 16px;
  }
}
</style>
