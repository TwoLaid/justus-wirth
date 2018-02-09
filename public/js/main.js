
(function() {
  function scrollTo(element) {
    var targetY = element.offsetTop - 80;
    var startTime = Date.now();
    var duration = 300;
    const start = document.scrollingElement.scrollTop;

    function animatedScroll() {
      var now = Date.now();
      var time = Math.min(1, ((now - startTime) / duration));
      // var timeFunction = easings[easing](time);
      document.scrollingElement.scrollTop = (time * (targetY - start)) + start;

      if (document.scrollingElement.scrollTop === targetY) {
        return;
      }

      if (document.scrollingElement.scrollTop + window.innerHeight >= document.body.scrollHeight - 1  && document.scrollingElement.scrollTop <= targetY) {
        // reached the bottom
        return;
      }

      requestAnimationFrame(animatedScroll);
    }

    animatedScroll();
  }

  var stickyNav = document.querySelector('nav.navigation-level-2');
  var navElements = document.querySelectorAll('nav.navigation-level-2 .nav-item a');

  if (stickyNav) {
    for (var i = 0; i < navElements.length; i++) {
      navElements[i].addEventListener('click', function (e) {
        e.preventDefault();
        scrollTo(document.querySelector(this.hash));
      });
    }

    window.onscroll = function () {
      var scrollY = window.scrollY;

      if (scrollY >= 600) {
        stickyNav.classList.add('sticky');
      } else {
        stickyNav.classList.remove('sticky');
      }
    }
  }

  // Google Tags
  window.addEventListener("click", function(e) {
    var target = e.target;

    if (target.dataset.gtagVendor) {
      gtag("event", "check_out_music", {
        "event_category": "engagement",
        "album": target.dataset.gtagAlbum,
        "vendor": target.dataset.gtagVendor
      });
    }
  });
})();

var player;
var playerWrapper = document.querySelector('.video-gallery .video-player');

function onYouTubeIframeAPIReady() {
  var rect = playerWrapper.getBoundingClientRect();

  if (window.innerWidth > 800) {
    // load first video for desktop
    player = new YT.Player(playerWrapper, {
      height: rect.height,
      width: rect.width,
      videoId: document.querySelector('.video-gallery .video-selection .video:first-child').dataset.videoId,
      events: {}
    });
  } else {
    // cue all uploads for mobile
    player = new YT.Player(playerWrapper, {
      height: rect.height,
      width: rect.width,
      events: {
        'onReady': function() {
          player.cuePlaylist({
            listType: 'user_uploads',
            list: 'altessockenfach'
          });
        }
      }
    });
  }

  document
    .querySelector('.video-gallery .video-selection')
    .addEventListener('click', function (e) {
      if (e.target.dataset.videoId) {
        var active = document.querySelector('.video-gallery .video-selection .video.active');
        if (active) {
          active.classList.remove('active');
        }
        e.target.classList.add('active');

        player.loadVideoById(e.target.dataset.videoId);
      }
    });
}
