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

// Listen on authentication state change
firebase.auth().onAuthStateChanged(function(user) {
let sidenav = document.querySelector('#sidenav');
console.log(user);
if (user) { // if user exists and is authenticated
setDefaultPage();
sidenav.classList.remove("hide");
appendUserData(user);
} else { // if user is not logged in
showPage("login");
sidenav.classList.add("hide");
ui.start('#firebaseui-auth-container', uiConfig);
}
showLoader(false);
});








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

// sets active sidenav/ menu item
function setActiveTab(pageId) {
let pages = document.querySelectorAll(".sidenav a");
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

var container = $('#container');

$(document).on('click', '.list-view li', function(){
  $(this).addClass('active');
  container.addClass('details');
});

$('.back').click(function(){
  container.removeClass('details');
  $('.list-view li').removeClass('active');
});

// Profile page

$(document).ready(function() {
  var distX = 0 , distY = 0;
  var viewportX,viewportY;
  $(document).on('mousedown touchstart', '.touch-y', function(e) {
    var $ele = $(this);
    viewportY = (-1 * $ele.height()) + viewport($ele).height();
    var startY = e.pageY || e.originalEvent.touches[0].pageY;
    var currentY = parseFloat($ele.css('transform').split(',')[5]);
    $(document).on('mousemove touchmove', function(e) {
      e.preventDefault();
      var y = e.pageY || e.originalEvent.touches[0].pageY;
      distY = y - startY;
      if(currentY){
        distY += currentY;
      }
      if(distY > 3 || distY < (-3)){
        $(".messages-list > ul > li").off('click');
      }
      $ele.css('transform', 'translateY('+ distY +'px)');
      if(distY > 0 || distY < viewportY){
        if(viewport($ele).find('.viewportShadow').length == 0)
        viewport($ele).append('<span class="viewportShadow"></span>');
      }
      if(distY > 0){
        viewport($ele).find('.viewportShadow').css({
          'top': '-5px',
          'box-shadow': '0px 0px 140px ' + distY/5 + 'px rgba(255,183,0,0.8)'
        });
      }else if(distY < viewportY){
        viewport($ele).find('.viewportShadow').css({
          'bottom': '-5px',
          'box-shadow': '0px 0px 140px ' + ((-1*distY) + viewportY)/5 + 'px rgba(255,183,0,08)'
        });
      }
    });
    $(document).on('mouseup touchend', function() {
      $(document).off('mousemove touchmove mouseup touchend');
      if (!distY) return;
      if(distY > 0 ){
        $ele.css('transform', 'translateY(0)').addClass("reset");
        viewport($ele).find('.viewportShadow').css('box-shadow','0 0 0 rgba(255,183,0,.5)');
      }else if(distY < viewportY){
        if($ele.height() > viewport($ele).height()){
          $ele.css('transform', 'translateY(' + viewportY + 'px)').addClass("reset");
        }else{
          $ele.css('transform', 'translateY(0)').addClass("reset");
        }
        viewport($ele).find('.viewportShadow').css('box-shadow','0 0 0 rgba(255,183,0,.5)');
      }
      setTimeout(function(){
        $ele.removeClass("reset");
        viewport($ele).find('.viewportShadow').remove();
        $(".messages-list > ul > li").bind('click',showMessages);
      },400);
    });
  });

  // Get viewport
  function viewport(ele){
    return ele.closest('[data-viewport="true"]');
  }

  // nav control
  var $el, leftPos, newWidth,
  $mainNav = $("#master-nav ul");
  var $active_line = $("#active-line");
  $active_line.css("left", $("#master-nav ul .active").position().left);
  navItemPos($("#master-nav ul .active").index());
  $("#master-nav ul li").click(function() {
      $el = $(this);
      $("#master-nav ul li").removeClass('active');
      $el.addClass('active');
      navItemPos($el.index());
      leftPos = $el.position().left;
      newWidth = $el.parent().width();
      $active_line.stop().animate({
          left: leftPos
      });
  });
  function navItemPos(index){
    $("#master-nav-items > div").removeClass("active after before");
    $("#master-nav-items > div").eq(index).addClass("active");
    $("#master-nav-items > div").eq(index).nextAll().addClass("after");
    $("#master-nav-items > div").eq(index).prevAll().addClass("before");
  }
  $(".messages-list > ul > li").bind('click',showMessages);
  function showMessages(){
    $('.view-main').addClass("deactive");
    $('.view-message').addClass("active");
  }
  $(".back-arrow").click(function(){
    $('.view-main').removeClass("deactive");
    $('.view-message').removeClass("active");
  })

  $("#send-message").click(sendMassage);
  $(document).keyup(function(e){
    if(e.which==13 && $('.view-message').hasClass("active")){
      sendMassage();
    }
  })
  function sendMassage(){
    var date = new Date();
    var message = $("#message-text").val();
    $("#message-text").val("");
    var messageItem = "<li class='sent goto'><div>"+message+"<span>"+getTime(date)+"</span></div></li>";
    $(".messages-area > ul").append(messageItem);
    setTimeout(function(){
      $(document).find(".goto").removeClass("goto");
      systemMessage(date);
      messageScrollFix();
    },50);
  }
  function systemMessage(date){
    var messages=[
      "Hi my name is yousef sami",
      "سلام خوبی؟",
      "If you want contact with me please send email to this address <br/> 'yousef.sami19@gmail.com'",
      "Thank you for watching this pen"
    ]
    setTimeout(function(){
      var messageItem = "<li class='recive'><div>"+messages[parseInt(Math.random(1,4)*4)]+"<span>"+getTime(date)+"</span></div></li>";
      $(".messages-area > ul").append(messageItem);
      messageScrollFix();
    },1500);
  }
  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  function messageScrollFix(){
    setTimeout(function(){
      var mes_hieght=parseInt($(".messages-area > ul").height());
      var viewportHeight = parseInt($(".messages-area").height());
      if(mes_hieght > viewportHeight)
      $(".messages-area > ul").css("transform","translateY(" + ((viewportHeight - mes_hieght)-10) + "px)");
    },100);
  }
});


//Tips & Tricks

$('.slider').each(function() {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;

  function move(newIndex) {
    var animateLeft, slideLeft;

    advance();

    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }

    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');

    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }

    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    });
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      currentIndex = newIndex;
    });
  }

  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 4000);
  }

  $('.next_btn').on('click', function() {
    if (currentIndex < ($slides.length - 1)) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });

  $('.previous_btn').on('click', function() {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(3);
    }
  });

  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');

    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide_buttons');
    bulletArray.push($button);
  });

  advance();
});

//add data tab
let sheetId = "1XLv0wNtKVsBbKHPiGx1PLlbzc3RcxHmEPS6lmTvUwLA";
let sheetNumber = 1;
let sheetUrl = "https://spreadsheets.google.com/feeds/list/" + sheetId + "/" + sheetNumber + "/public/full?alt=json";
console.log(sheetUrl);

fetch(sheetUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    appendChart(json.feed.entry);
  });

function appendChart(data) {
  console.log(data);

  // prepare data
  let cows = [];
  let years = [];

  for (let object of data) {
    cows.push(object.gsx$cows.$t);
    years.push(object.gsx$year.$t);
  }

  // generate chart
  let chart = document.getElementById('chart');
  let myDoughnutChart = new Chart(chart, {
    type: 'line',
    data: {
      datasets: [{
        data: cows,
        label: 'Number of Cows',
        borderColor: "#F0AA00",

        backgroundColor: "#4bb131",
        pointBackgroundColor: "white",
        pointBorderColor: "green",
        pointHoverBackgroundColor: "green",
        pointHoverBorderColor: "#F0AA00",
      }],
      labels: years

    },
    options:{
      scales:{
        yAxes:[{
          ticks:{
            min:45,
            max: 55
          }
        }]


      }
    }
  });
}
// Progress Circles
var count = $(('#count'));
$({ Counter: 0 }).animate({ Counter: count.text() }, {
  duration: 5000,
  easing: 'linear',
  step: function () {
    count.text(Math.ceil(this.Counter)+ "%");
  }
});

var s = Snap('#animated');
var progress = s.select('#progress');

progress.attr({strokeDasharray: '0, 251.2'});
Snap.animate(0,251.2, function( value ) {
    progress.attr({ 'stroke-dasharray':value+',251.2'});
}, 5000);
