import { initializeApp } from "firebase/app";

export function GetfirebaseConfig() {
    const firebaseConfig = {
        apiKey: "AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY",
        authDomain: "rail-nuxt.firebaseapp.com",
        databaseURL: "https://rail-nuxt-default-rtdb.firebaseio.com",
        projectId: "rail-nuxt",
        storageBucket: "rail-nuxt.appspot.com",
        messagingSenderId: "85380246039",
        appId: "1:85380246039:web:82e4bcb2bdc6ed35f5ca52",
        measurementId: "G-4HSRY9S9HE"
      };

      const app = initializeApp(firebaseConfig);

    return app ;
}