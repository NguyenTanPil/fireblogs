<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, idx) in sampleBlogPost" :key="idx" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCards :post="card" v-for="(card, idx) in sampleBlogCards" :key="idx" />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your account today!</h2>
        <router-link class="router-button"> Register for FireBlogs </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import BlogPost from '../components/BlogPost.vue';
import BlogCards from '../components/BlogCard.vue';
import { useBlogCardsStore } from '../stores/blogCards.js';
import { storeToRefs } from 'pinia';
import { useProfile } from '@/stores/profile';

const welcomeScreen = reactive({
  title: 'Welcome!',
  blogPost:
    'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post',
  isWelcomeScreen: true,
  photo: 'coding'
});

const sampleBlogPost = ref([
  {
    title: 'This is a Filter Title',
    blogHTML: 'This is a filter blog post title',
    blogCoverPhoto: 'beautiful-stories'
  },
  {
    title: 'This is a Filter Title 2',
    blogHTML: 'This is a filter blog post title',
    blogCoverPhoto: 'designed-for-everyone'
  }
]);

const profileStore = useProfile();
const { user } = profileStore.profile;

const blogCardsStore = useBlogCardsStore();
const { sampleBlogCards } = storeToRefs(blogCardsStore);
</script>

<style scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
  }

  .router-button {
    display: flex;
    font-size: 14px;
    text-decoration: none;

    @media (min-width: 800px) {
      margin-left: auto;
    }
  }

  h2 {
    font-weight: 300;
    font-size: 32px;
    max-width: 425px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;

    @media (min-width: 800px) {
      text-align: initial;
      font-size: 40px;
    }
  }
}
</style>
