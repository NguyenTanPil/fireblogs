<template>
  <div class="blog-card">
    <div v-show="editPost" class="icons">
      <div class="icon" @click="editPostDetails">
        <img class="edit" :src="editImage" alt="" />
      </div>
      <div class="icon" @click="deletePost(post.id)">
        <img class="delete" :src="deleteImage" alt="" />
      </div>
    </div>
    <img class="cardImage" :src="getBlogCardUrl(post.blogCoverPhoto)" alt="" />

    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Posted on: {{ post.blogDate }}</h6>
      <router-link
        class="link"
        :to="{ name: 'ViewBlog', params: { blogId: 'c2c281c6-a448-4c7c-8eb6-c173d55fcfd4' } }"
      >
        View The Post <img class="arrow" :src="arrowImage" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import arrowImage from '../assets/Icons/arrow-right-light.svg';
import editImage from '../assets/Icons/edit-regular.svg';
import deleteImage from '../assets/Icons/trash-regular.svg';
import { useBlogCardsStore } from '@/stores/blogCards';
import { storeToRefs } from 'pinia';

defineProps({
  post: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const blogCardsStore = useBlogCardsStore();
const { editPost } = storeToRefs(blogCardsStore);
const { deletePost } = blogCardsStore;

const getBlogCardUrl = (imageString) => {
  return new URL(`../assets/blogCards/${imageString}.jpg`, import.meta.url).href;
};

const editPostDetails = () => {
  router.push({ name: 'EditBlog', params: { blogId: '1' } });
};
</script>

<style scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  .cardImage {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }
  .info {
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: 100%;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }
    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;
      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }
      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
