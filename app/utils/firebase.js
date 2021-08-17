import app from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoiZfdc-XkkMoZPBrJjZqC6PqNItf6RmI",
  authDomain: "tenedores-6b736.firebaseapp.com",
  projectId: "tenedores-6b736",
  storageBucket: "tenedores-6b736.appspot.com",
  messagingSenderId: "366672606468",
  appId: "1:366672606468:web:26ed1872a8d921b573cc51",
};

app.initializeApp(firebaseConfig);

const auth = app.auth();
const storage = app.storage();

export { auth, app, storage };
