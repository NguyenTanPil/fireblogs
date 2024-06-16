<template>
  <header>
    <nav class="container">
      <div class="branching">
        <router-link class="header" :to="{ name: 'Home' }">FireBlogs</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" to="#">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link class="link" to="#">Create Post</router-link>
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
            >Login/Register</router-link
          >
        </ul>

        <div v-if="user" class="profile" ref="profileRef" @click="toggleProfileMenu">
          <span>{{ profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ profileInitials }}</p>

              <div class="right">
                <p>{{ profileFirstName }} {{ profileLastName }}</p>
                <p>{{ profileUsername }}</p>
                <p>{{ profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <img class="icon" :src="userImage" alt="" />
                  <p>Profile</p>
                </router-link>
              </div>
              <div class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <img class="icon" :src="adminImage" alt="" />
                  <p>Admin</p>
                </router-link>
              </div>
              <div class="option" @click="signOutAccount">
                <img class="icon" :src="signOutImage" alt="" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <img
      :src="menuIcon"
      alt="menu icon"
      class="menu-icon"
      v-show="mobile"
      @click="toggleMobileNav"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" to="#">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link class="link" to="#">Create Post</router-link>
        <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
      </ul>
    </transition>
  </header>
</template>

<script setup>
import menuIcon from '@/assets/Icons/bars-regular.svg';
import userImage from '@/assets/Icons/user-alt-light.svg';
import adminImage from '@/assets/Icons/user-crown-light.svg';
import signOutImage from '@/assets/Icons/sign-out-alt-regular.svg';
import { useProfile } from '@/stores/profile';
import { onBeforeMount, ref } from 'vue';
import { auth } from '@/firebase/firebaseInit';
import { signOut } from 'firebase/auth';

const mobile = ref(null);
const mobileNav = ref(null);
const windowWidth = ref(null);
const profileMenu = ref(null);
const profileRef = ref(null);

const profileStore = useProfile();
const { profileInitials, profileFirstName, profileLastName, profileEmail, profileUsername, user } =
  profileStore.profile;

const checkScreen = () => {
  windowWidth.value = window.innerWidth;

  if (windowWidth.value <= 750) {
    mobile.value = true;
    return;
  }

  mobile.value = false;
  mobileNav.value = false;

  return;
};

const toggleProfileMenu = () => {
  profileMenu.value = !profileMenu.value;
};

const toggleMobileNav = (e) => {
  if (e.target === profileRef.value) {
    mobileNav.value = !mobileNav.value;
  }
};

const signOutAccount = () => {
  signOut(auth).then(() => {
    window.location.reload();
  });
};

onBeforeMount(() => {
  window.addEventListener('resize', checkScreen);
});
</script>

<style scoped>
.header {
  background-color: #fff;
  padding: 0 25px;
}

.link {
  font-weight: 500;
  padding: 0 8px;
  transition: 0.3s color ease;

  &:hover {
    color: #1eb8b8;
  }
}

nav {
  display: flex;
  padding: 25px 0;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .branching {
    display: flex;
    align-items: center;

    .header {
      font-weight: 600;
      font-size: 24px;
      color: #000;
      text-decoration: none;
    }
  }

  .nav-links {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    margin-right: 32px;

    ul {
      margin-right: 32px;

      .link {
        margin-right: 32px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .profile {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #fff;
      background-color: #303030;

      span {
        pointer-events: none;
      }

      .profile-menu {
        position: absolute;
        top: 60px;
        right: 0;
        width: 250px;
        background-color: #303030;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);

        .info {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #fff;

          .initials {
            position: inherit;
            width: 40px;
            height: 40px;
            background-color: #fff;
            color: #303030;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          .right {
            flex: 1;
            margin-left: 24px;

            p:nth-child(1) {
              font-size: 14px;
            }

            p:nth-child(2),
            p:nth-child(3) {
              font-size: 12px;
            }
          }
        }

        .options {
          padding: 15px;

          .option {
            text-decoration: none;
            color: #fff;
            display: flex;
            align-items: center;
            margin-bottom: 12px;

            .icon {
              width: 18px;
              height: auto;
            }

            p {
              font-size: 14px;
              margin-left: 12px;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}

.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 28px;
  right: 25px;
  height: 25px;
  width: auto;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  background-color: #303030;
  top: 0;
  left: 0;

  .link {
    padding: 15px 0;
    color: #fff;
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter-from {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
