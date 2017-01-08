angular.module('oneStop.config', ['firebase'])

.config(function() {
  var config = {
    apiKey: "AIzaSyB1PE4qVbbm_M074r7NYEclphW_4hPG_X8",
    authDomain: "calico-doroad.firebaseapp.com",
    databaseURL: "https://calico-doroad.firebaseio.com",
    storageBucket: "calico-doroad.appspot.com",
    messagingSenderId: "552647789390"
  };
  firebase.initializeApp(config);
})