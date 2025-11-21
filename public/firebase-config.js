// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase
// Puedes encontrarlos en: Firebase Console > Project Settings > Your apps
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "cordero-consulting.firebaseapp.com",
    projectId: "cordero-consulting",
    storageBucket: "cordero-consulting.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();
