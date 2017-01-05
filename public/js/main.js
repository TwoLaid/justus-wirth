
console.log('init')

var stickyNav = document.querySelector('nav.navigation-level-2');

window.onscroll = function() {
  var scrollY = window.scrollY;

  if (scrollY >= 600) {
    stickyNav.classList.add('sticky');
  } else {
    stickyNav.classList.remove('sticky');
  }
}

  // waypoints
  new Waypoint({
    element: document.getElementById('music'),
    handler: function(direction) {
      console.log('music', direction);
    }
  });

  new Waypoint({
    element: document.getElementById('gigs'),
    handler: function(direction) {
      console.log('gigs', direction);
    }
  });

  new Waypoint({
    element: document.getElementById('about'),
    handler: function(direction) {
      console.log('about', direction);
    }
  });
