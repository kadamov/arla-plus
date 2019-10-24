"use strict";

// ========== Firebase sign in functionality ========== //

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKJFPsUFKA0rYxNChrcp6-kxff7WaSCVQ",
  authDomain: "arla-676ac.firebaseapp.com",
  databaseURL: "https://arla-676ac.firebaseio.com",
  projectId: "arla-676ac",
  storageBucket: "arla-676ac.appspot.com",
  messagingSenderId: "133216447180",
  appId: "1:133216447180:web:257071c58e52dc41fb7069",
  measurementId: "G-02TMREPS40"
};
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);




// Firebase UI configuration
const uiConfig = {
credentialHelper: firebaseui.auth.CredentialHelper.NONE,
signInOptions: [
firebase.auth.EmailAuthProvider.PROVIDER_ID
],
signInSuccessUrl: '#home',
};

// Init Firebase UI Authentication
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Listen on authentication state change
firebase.auth().onAuthStateChanged(function(user) {
let tabbar = document.querySelector('#tabbar');
console.log(user);
if (user) { // if user exists and is authenticated
setDefaultPage();
tabbar.classList.remove("hide");
appendUserData(user);
} else { // if user is not logged in
showPage("login");
tabbar.classList.add("hide");
ui.start('#firebaseui-auth-container', uiConfig);
}
showLoader(false);
});

// sign out user
function logout() {
firebase.auth().signOut();
}









// hide all pages
function hideAllPages() {
let pages = document.querySelectorAll(".page");
for (let page of pages) {
page.style.display = "none";
}
}

// show page or tab
function showPage(pageId) {
hideAllPages();
document.querySelector(`#${pageId}`).style.display = "block";
location.href = `#${pageId}`;
setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
let pages = document.querySelectorAll(".tabbar a");
for (let page of pages) {
if (`#${pageId}` === page.getAttribute("href")) {
page.classList.add("active");
} else {
page.classList.remove("active");
}

}
}

// set default page
function setDefaultPage() {
let page = "home";
if (location.hash) {
page = location.hash.slice(1);
}
showPage(page);
}

setDefaultPage();

function showLoader(show) {
let loader = document.querySelector('#loader');
if (show) {
loader.classList.remove("hide");
} else {
loader.classList.add("hide");
}
}
