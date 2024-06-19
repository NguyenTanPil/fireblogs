import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBlogCardsStore = defineStore('blogCards', () => {
  const sampleBlogCards = ref([
    { id: 1, blogTitle: 'Blog Card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021' },
    { id: 2, blogTitle: 'Blog Card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021' },
    { id: 3, blogTitle: 'Blog Card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021' },
    { id: 4, blogTitle: 'Blog Card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021' }
  ]);
  const editPost = ref(null);

  const resetEditPost = () => {
    editPost.value = false;
  };

  const deletePost = (blogId) => {
    sampleBlogCards.value = sampleBlogCards.value.filter((post) => post.id !== blogId);
  };

  return { sampleBlogCards, editPost, resetEditPost, deletePost };
});
