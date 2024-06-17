<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview" />
    <div class="container">
      <div :class="{ invisible: !error }" class="error-message">
        <p><span>Error: </span> {{ errorMsg }}</p>
      </div>

      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />

        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhotoRef"
            id="blog-photo"
            accept=".png, .jpg, .jpeg"
            @change="uploadFile"
          />
          <button
            class="preview"
            :class="{ 'button-inactive': !blogPhotoFileURL }"
            @click="togglePhotoPreview"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ blogPhotoName }}</span>
        </div>
      </div>

      <div class="editor">
        <vue-editor v-model="blogHTML" useCustomImageHandler :editorOptions="editorSettings" />
      </div>
      <div class="blog-actions">
        <button>Publish Blog</button>
        <router-link class="router-button" to="#">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePost } from '@/stores/post';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { VueEditor } from 'vue3-editor';
import Quill from 'quill';
window.Quill = Quill;
import ImageResize from 'quill-image-resize-vue';
import BlogCoverPreview from '@/components/BlogCoverPreview.vue';
Quill.register('modules/imageResize', ImageResize);

const postStore = usePost();
const { blogHTML, blogTitle, blogPhotoName, blogPhotoFileURL, blogPhotoPreview } =
  storeToRefs(postStore);
const { createFileURL, fileNameChange, togglePhotoPreview } = postStore;

console.log({ blogHTML, blogTitle, blogPhotoName, blogPhotoFileURL });

const file = ref(null);
const blogPhotoRef = ref(null);
const error = ref(null);
const errorMsg = ref(null);
const editorSettings = ref({
  modules: {
    imageResize: {}
  }
});

const uploadFile = () => {
  file.value = blogPhotoRef.value.files[0];
  const fileName = file.value.name;
  fileNameChange(fileName);
  createFileURL(URL.createObjectURL(file.value));
};
</script>

<style scoped>
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    background-color: #303030;
    text-decoration: none;
    color: #fff;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      outline: none;

      &:focus {
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
