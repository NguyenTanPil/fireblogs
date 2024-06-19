import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePost = defineStore('post', () => {
  const blogHTML = ref('Write your blog title here...');
  const blogTitle = ref('');
  const blogPhotoName = ref('');
  const blogPhotoFileURL = ref(null);
  const blogPhotoPreview = ref(null);

  const fileNameChange = (fileName) => {
    blogPhotoName.value = fileName;
  };

  const createFileURL = (fileUrl) => {
    blogPhotoFileURL.value = fileUrl;
  };

  const togglePhotoPreview = () => {
    blogPhotoPreview.value = !blogPhotoPreview.value;
  };

  const updatePost = (data) => {
    blogTitle.value = data.blogTitle;
    blogHTML.value = data.blogHTML;
    blogPhotoFileURL.value = data.blogCoverPhoto;
    blogPhotoName.value = data.blogCoverPhotoName;
  };

  return {
    blogHTML,
    blogTitle,
    blogPhotoName,
    blogPhotoFileURL,
    blogPhotoPreview,
    fileNameChange,
    createFileURL,
    togglePhotoPreview,
    updatePost
  };
});
