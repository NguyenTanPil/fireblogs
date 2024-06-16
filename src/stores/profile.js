import db, { auth } from '@/firebase/firebaseInit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

  const updateFirstName = (firstName) => {
    profile.profileFirstName = firstName;
  };

  const updateLastName = (lastName) => {
    profile.profileLastName = lastName;
  };

  const updateUsername = (username) => {
    profile.profileUsername = username;
  };

  const updateEmail = (email) => {
    profile.profileEmail = email;
  };

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
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfileInfo(docSnap);
    }

    setProfileInitials();
  };

  const updateUserSettings = async () => {
    const userDocRef = doc(db, 'users', profile.profileId);
    await updateDoc(userDocRef, {
      firstName: profile.profileFirstName,
      lastName: profile.profileLastName,
      username: profile.profileUsername
    });
    setProfileInitials();
  };

  return {
    profile,
    getCurrentUser,
    updateUser,
    setProfileInfo,
    setProfileInitials,
    updateFirstName,
    updateLastName,
    updateUsername,
    updateEmail,
    updateUserSettings
  };
});
