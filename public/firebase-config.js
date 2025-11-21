// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase
// Puedes encontrarlos en: Firebase Console > Project Settings > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyBFJstdemuOBUg6h_3cGbkb1HR-CWSwhZU",
  authDomain: "cordero-consulting.firebaseapp.com",
  projectId: "cordero-consulting",
  storageBucket: "cordero-consulting.firebasestorage.app",
  messagingSenderId: "635322299088",
  appId: "1:635322299088:web:7726b0db9aa31c981aa4d5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();
