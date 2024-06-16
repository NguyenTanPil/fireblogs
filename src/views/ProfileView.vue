<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal" />

    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ profileInitials }}</div>

        <div class="admin-badge">
          <img :src="adminImage" class="icon" alt="" />
          <span>admin</span>
        </div>

        <div class="input">
          <label for="firstName">First Name: </label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>

        <div class="input">
          <label for="lastName">Last Name: </label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>

        <div class="input">
          <label for="username">Username: </label>
          <input type="text" id="username" v-model="username" />
        </div>

        <div class="input">
          <label for="email">Email: </label>
          <input type="text" id="email" v-model="email" readonly="true" />
        </div>
        <button @click="saveChange">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from '@/components/Modal.vue';
import adminImage from '@/assets/Icons/user-crown-light.svg';
import { computed, ref } from 'vue';
import { useProfile } from '@/stores/profile';

const modalActive = ref(false);
const modalMessage = ref('');

const profileStore = useProfile();
const { profileInitials, profileEmail, profileFirstName, profileLastName, profileUsername } =
  profileStore.profile;

const { updateFirstName, updateLastName, updateUsername, updateUserSettings } = profileStore;

const firstName = computed({
  get() {
    return profileFirstName;
  },
  set(newValue) {
    updateFirstName(newValue);
  }
});

const lastName = computed({
  get() {
    return profileLastName;
  },
  set(newValue) {
    updateLastName(newValue);
  }
});

const username = computed({
  get() {
    return profileUsername;
  },
  set(newValue) {
    updateUsername(newValue);
  }
});

const email = computed({
  get() {
    return profileEmail;
  }
});

const closeModal = () => {
  modalActive.value = false;
  modalMessage.value = '';
};

const saveChange = () => {
  updateUserSettings();
  modalActive.value = true;
  modalMessage.value = 'Changes were saved successfully';
};
</script>

<style scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: inherit;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        align-self: center;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
