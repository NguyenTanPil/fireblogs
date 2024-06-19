import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { collection, getDocs, orderBy } from 'firebase/firestore';
import db from '../firebase/firebaseInit';

export const useBlogPosts = defineStore('blogPosts', () => {
  const blogPost = ref([]);
  const postLoaded = ref(false);

  const blogPostsFeed = computed(() => blogPost.value.slice(0, 2));
  const blogPostsCards = computed(() => blogPost.value.slice(2, 6));

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'blogPosts'), orderBy('date', 'desc'));
    const blogList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      blogList.push({
        blogId: data.blogId,
        blogHTML: data.blogHTML,
        blogCoverPhoto: data.blogCoverPhoto,
        blogTitle: data.blogTitle,
        blogDate: data.date,
        blogCoverPhotoName: data.blogCoverPhotoName
      });
    });

    blogPost.value = blogList;
    postLoaded.value = true;
  };

  return { blogPost, postLoaded, getPosts, blogPostsFeed, blogPostsCards };
});
