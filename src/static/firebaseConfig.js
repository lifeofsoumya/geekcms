import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: "geekcms-c9635.firebaseapp.com",
    projectId: "geekcms-c9635",
    storageBucket: "geekcms-c9635.appspot.com",
    messagingSenderId: process.env.FB_MSG_SENDER_ID,
    appId: process.env.FB_APP_ID
  };
  
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { storage };