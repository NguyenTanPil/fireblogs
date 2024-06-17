<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <img class="icon" :src="closeImage" alt="" @click="togglePhotoPreview" />
      <img :src="blogPhotoFileURL" alt="" />
    </div>
  </div>
</template>

<script setup>
import closeImage from '@/assets/Icons/times-circle-light.svg';
import { usePost } from '@/stores/post';
import { storeToRefs } from 'pinia';

const postStore = usePost();
const { blogPhotoFileURL } = storeToRefs(postStore);
const { togglePhotoPreview } = postStore;
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 40px 30px 30px;
    background-color: #fff;
    position: relative;

    .icon {
      position: absolute;
      width: 24px;
      height: auto;
      cursor: pointer;
      top: 15px;
      right: 15px;
      color: #1eb8b8;
      margin-top: 0;
    }

    img {
      margin-top: 16px;
      display: block;
      height: 280px;
      width: 480px;
      object-fit: cover;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
