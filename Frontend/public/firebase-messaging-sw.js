importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
   apiKey: "AIzaSyCll4eHd9JHndHx1_rB6xyKfHpheHadPoo",
  authDomain: "clean-cycle-f5291.firebaseapp.com",
  projectId: "clean-cycle-f5291",
  storageBucket: "clean-cycle-f5291.firebasestorage.app",
  messagingSenderId: "834253919008",
  appId: "1:834253919008:web:0acde8c41abd9c3524bd45",
  measurementId: "G-BCNY685RRJ"
});
const messaging=firebase.messaging();
messaging.onBackgroundMessage(function(payload){
      console.log("Received background message ",payload);
const notificationTitle=payload.notification.title;
const notificationOptions={
    body:payload.notification.body,
    icon:payload.notification.image, 
}
self.registration.showNotification(notificationTitle,notificationOptions);
})