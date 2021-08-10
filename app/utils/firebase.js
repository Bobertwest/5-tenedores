import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDoiZfdc-XkkMoZPBrJjZqC6PqNItf6RmI",
  authDomain: "tenedores-6b736.firebaseapp.com",
  projectId: "tenedores-6b736",
  storageBucket: "tenedores-6b736.appspot.com",
  messagingSenderId: "366672606468",
  appId: "1:366672606468:web:26ed1872a8d921b573cc51",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
