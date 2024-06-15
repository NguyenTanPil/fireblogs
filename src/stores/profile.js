import db, { auth } from '@/firebase/firebaseInit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useProfile = defineStore('profile', () => {
  const profile = reactive({
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileId: null,
    profileInitials: null,
    profileUsername: null
  });

  const updateUser = (user) => {
    profile.user = user;
  };

  const setProfileInfo = (doc) => {
    profile.profileId = doc.id;
    profile.profileEmail = doc.data().email;
    profile.profileFirstName = doc.data().firstName;
    profile.profileLastName = doc.data().lastName;
    profile.profileUsername = doc.data().username;
  };

  const setProfileInitials = () => {
    profile.profileInitials =
      profile.profileFirstName.match(/\b\S?/g).join('') +
      profile.profileLastName.match(/\b\S?/g).join('');
  };

  const getCurrentUser = async () => {
    const currentUser = auth.currentUser;
    const q = query(collection(db, 'users'), where('id', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setProfileInfo(doc);
    });
    setProfileInitials();
  };

  return { profile, getCurrentUser, updateUser, setProfileInfo, setProfileInitials };
});
