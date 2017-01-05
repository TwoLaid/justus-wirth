
console.log('init')

function scrollTo(element) {
  console.log('target:', element.offsetTop);
  var targetY = element.offsetTop - 80;
  var startTime = Date.now();
  var duration = 300;
  const start = document.body.scrollTop;


  function animatedScroll() {
    var now = Date.now();
    var time = Math.min(1, ((now - startTime) / duration));
    // var timeFunction = easings[easing](time);
    document.body.scrollTop = (time * (targetY - start)) + start;

    if (document.body.scrollTop === targetY) {
      return;
    }
    requestAnimationFrame(animatedScroll);
  }

  animatedScroll();
}

var stickyNav = document.querySelector('nav.navigation-level-2');
var navElements = document.querySelectorAll('nav.navigation-level-2 .nav-item a');

for (var i = 0; i < navElements.length; i++) {
  navElements[i].addEventListener('click', function(e) {
    e.preventDefault();
    scrollTo(document.querySelector(this.hash));
  });
}


window.onscroll = function() {
  var scrollY = window.scrollY;

  if (scrollY >= 600) {
    stickyNav.classList.add('sticky');
  } else {
    stickyNav.classList.remove('sticky');
  }

  var maxOnScreen = 0;
  var maxOnScreenTarget = navElements[0];

  // focus on top half of screen
  var windowHeight = window.outerHeight/2;

  for (var i = 0; i < navElements.length; i++) {
    var target = navElements[i].hash;
    var rect = document.querySelector(target).getBoundingClientRect();
    var onScreen = (Math.min(rect.bottom, windowHeight) - Math.max(0, rect.top)) / windowHeight;
    if (onScreen > maxOnScreen) {
      maxOnScreen = onScreen;
      maxOnScreenTarget = navElements[i];
    }
  }

  for (var i = 0; i < navElements.length; i++) {
    var e = navElements[i];
    if (e == maxOnScreenTarget) {
      e.parentElement.classList.add('active');
    } else {
      e.parentElement.classList.remove('active');
    }
  }
}
