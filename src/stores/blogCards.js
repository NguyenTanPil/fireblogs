import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBlogCardsStore = defineStore('blogCards', () => {
  const sampleBlogCards = ref([
    { blogTitle: 'Blog Card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021' },
    { blogTitle: 'Blog Card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021' },
    { blogTitle: 'Blog Card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021' },
    { blogTitle: 'Blog Card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021' }
  ]);
  const editPost = ref(null);

  const resetEditPost = () => {
    editPost.value = false;
  };

  return { sampleBlogCards, editPost, resetEditPost };
});
