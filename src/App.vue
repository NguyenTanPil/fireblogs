<template>
  <div class="app" v-if="postLoaded">
    <Navigation v-if="!navigation" />
    <RouterView />
    <Footer v-if="!navigation" />
  </div>
</template>

<script setup>
import Navigation from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { auth } from './firebase/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';
import { useProfile } from './stores/profile';
import { useBlogPosts } from './stores/blogPosts';
import { storeToRefs } from 'pinia';

const route = useRoute();
const navigation = ref(true);

const profileStore = useProfile();
const { getCurrentUser, updateUser } = profileStore;
const blogPostsStore = useBlogPosts();
const { postLoaded } = storeToRefs(blogPostsStore);
const { getPosts } = blogPostsStore;

const checkRoute = () => {
  if (['Login', 'Register', 'ForgotPassword'].includes(route.name)) {
    navigation.value = true;
    return;
  }

  navigation.value = false;
};

onBeforeMount(() => {
  checkRoute();
  getPosts();
  onAuthStateChanged(auth, (user) => {
    updateUser(user);
    if (user) {
      getCurrentUser();
    }
  });
});

watch(
  () => route.name,
  () => {
    checkRoute();
  }
);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;

  path {
    fill: #000;
  }
}

.arrow-light {
  path {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: pointer !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;

  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.error-message {
  text-align: center;
  font-size: 12px;
  color: red;
}

.editor {
  .ql-container {
    display: flex;
    flex-direction: column;
    height: calc(100% - 72px);
    overflow: auto;
  }

  .ql-editor {
    padding: 20px 16px 30px;
  }
}
</style>
