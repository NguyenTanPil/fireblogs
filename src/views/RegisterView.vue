<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2>Create Your FireBlogs Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <img class="icon" :src="userImage" alt="" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <img class="icon" :src="userImage" alt="" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <img class="icon" :src="userImage" alt="" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <img class="icon" :src="emailImage" alt="" />
        </div>
        <div class="input">
          <input type="text" placeholder="Password" v-model="password" />
          <img class="icon" :src="passwordImage" alt="" />
        </div>
        <div v-show="isError" class="error">{{ errorMessage }}</div>
      </div>
      <button type="button" @click="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script setup>
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import emailImage from '../assets/Icons/envelope-regular.svg';
import passwordImage from '../assets/Icons/lock-alt-solid.svg';
import userImage from '../assets/Icons/user-alt-light.svg';
import db, { auth } from '../firebase/firebaseInit';

const firstName = ref(null);
const lastName = ref(null);
const username = ref(null);
const email = ref(null);
const password = ref(null);
const isError = ref(null);
const errorMessage = ref('');
const router = useRouter();

const register = async () => {
  if (
    firstName.value !== '' &&
    lastName.value !== '' &&
    username.value !== '' &&
    email.value !== '' &&
    password.value !== ''
  ) {
    isError.value = false;
    errorMessage.value = '';

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value
      });
      router.push({ name: 'Home' });
    } catch (error) {
      isError.value = true;
      errorMessage.value = error.message;
    }
    return;
  }

  isError.value = true;
  errorMessage.value = 'Please fill out all the fields';
};
</script>

<style scoped>
.register {
  h2 {
    max-width: 350px;
  }
}

.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
}

.login-register {
  margin-bottom: 32px;
  .router-link {
    color: #000;
  }
}

form {
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  @media (min-width: 900px) {
    padding: 0 50px;
  }

  h2 {
    text-align: center;
    font-size: 32px;
    color: #303030;
    margin-bottom: 40px;
    @media (min-width: 900px) {
      font-size: 40px;
    }
  }

  .inputs {
    width: 100%;
    max-width: 350px;

    .input {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;

      input {
        width: 100%;
        border: none;
        background-color: #f2f7f6;
        padding: 4px 4px 4px 38px;
        height: 50px;
        &:focus {
          outline: none;
        }
      }

      .icon {
        width: 12px;
        position: absolute;
        left: 12px;
      }
    }
  }

  .forgot-password {
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-size: 14px;
    margin: 16px 0 32px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;
    &:hover {
      border-color: #303030;
    }
  }

  .angle {
    display: none;
    position: absolute;
    background-color: #fff;
    transform: rotateZ(3deg);
    width: 60px;
    right: -30px;
    height: 101%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}

.background {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: url('../assets/background.png');
  width: 100%;
  height: 100%;

  @media (min-width: 900px) {
    display: inline;
  }
}
</style>
