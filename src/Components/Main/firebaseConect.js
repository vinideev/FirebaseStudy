import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDQU3F-VVAK57gYWu5Kod35LaUqQ-U9cDw",
  authDomain: "appdocs-01.firebaseapp.com",
  projectId: "appdocs-01",
  storageBucket: "appdocs-01.appspot.com",
  messagingSenderId: "56063572529",
  appId: "1:56063572529:web:ba3783a28fe217673d7310",
  measurementId: "G-P94JKRWTJL"
};

  const fireApp = initializeApp(firebaseConfig); //inicializa o firebase

  const db = getFirestore(fireApp); // resgatar o datebase 

  const auth = getAuth(fireApp) // resgatar a autentificaçao


  export {db , auth } ; //exportar para poder ser utilizado nas paginas