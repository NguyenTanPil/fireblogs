<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview" />
    <Loading v-show="isLoading" />
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
        <vue-editor
          v-model="blogHTML"
          useCustomImageHandler
          :editorOptions="editorSettings"
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="publishBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
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
import { ref as storeRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import db, { storage } from '@/firebase/firebaseInit';
import { doc, setDoc } from 'firebase/firestore';
import { useProfile } from '@/stores/profile';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';

Quill.register('modules/imageResize', ImageResize);

const router = useRouter();

const postStore = usePost();
const { blogHTML, blogTitle, blogPhotoName, blogPhotoFileURL, blogPhotoPreview } =
  storeToRefs(postStore);
const { createFileURL, fileNameChange, togglePhotoPreview } = postStore;

const profileStore = useProfile();

const file = ref(null);
const blogPhotoRef = ref(null);
const error = ref(null);
const errorMsg = ref(null);
const isLoading = ref(null);
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

const imageHandler = (file, Editor, cursorLocation, resetUploader) => {
  const storageRef = storeRef(storage, `documents/blogPostPhotos/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.log({ error });
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        Editor.insertEmbed(cursorLocation, 'image', downloadURL);
        resetUploader();
      });
    }
  );
};

const resetError = () => {
  setTimeout(() => {
    error.value = false;
    errorMsg.value = '';
  }, 50000);
};

const publishBlog = () => {
  console.log({ blogHTML, blogTitle, blogPhotoName, blogPhotoFileURL, file });

  if (blogTitle.value.length > 0 && blogHTML.value.length > 0) {
    if (file.value) {
      isLoading.value = true;
      const storageRef = storeRef(storage, `documents/blogPostPhotos/${blogPhotoName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log({ snapshot });
        },
        (error) => {
          console.log({ error });
          isLoading.value = false;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const timestamp = Date.now();
            await setDoc(doc(db, 'blogPosts', uuidv4()), {
              blogHTML: blogHTML.value,
              blogTitle: blogTitle.value,
              blogId: uuidv4(),
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: blogPhotoName.value,
              profileId: profileStore.profile.profileId,
              date: timestamp
            });
            isLoading.value = false;
            router.push({ name: 'ViewBlog' });
          });
        }
      );
      return;
    }

    error.value = true;
    errorMsg.value = 'Please ensure updated a cover photo!';
    resetError();
    return;
  }

  error.value = true;
  errorMsg.value = 'Please ensure Blog Title and Blog Post has been filled!';

  resetError();
};
</script>

<style scoped>
.create-post {
  position: relative;
  height: 100%;

  .error-message {
    margin: 12px 0 24px;
  }

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
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
