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
    console.log({ fileUrl });
    blogPhotoFileURL.value = fileUrl;
  };

  const togglePhotoPreview = () => {
    blogPhotoPreview.value = !blogPhotoPreview.value;
  };

  return {
    blogHTML,
    blogTitle,
    blogPhotoName,
    blogPhotoFileURL,
    blogPhotoPreview,
    fileNameChange,
    createFileURL,
    togglePhotoPreview
  };
});
