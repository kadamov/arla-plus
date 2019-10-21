"use strict";

// user crud functionality

// Your web app's Firebase configuration

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyAuFXEnggk49gbY4MDrt-XLSOD-CtTsxg8",
authDomain: "learn-coding-24030.firebaseapp.com",
databaseURL: "https://learn-coding-24030.firebaseio.com",
projectId: "learn-coding-24030",
storageBucket: "learn-coding-24030.appspot.com",
messagingSenderId: "87373107923",
appId: "1:87373107923:web:7fe83fa7700353c6423a26"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const userRef = db.collection("user");

let selectedUserId = "";


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
