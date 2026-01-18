/**
* Template Name: iPortfolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Animate Hero Section on Page Load
   */

  document.body.style.overflow = "hidden";
  window.scrollTo(0, 0);

  let progress = 0;
  let unlocked = false;   // ✅ IMPORTANT

  const circle = document.getElementById("progress-circle");
  const loader = document.getElementById("loader");
  const hero = document.getElementById("hero-wrapper");

  const maxOffset = 754;

  window.addEventListener("wheel", handleUnlock, { passive: false });
  window.addEventListener("touchmove", handleUnlock, { passive: false });

  anime({
    targets: '.warning',
    opacity: [0.2, 1],
    scale: [0.9, 1.1],
    delay: anime.stagger(100),
    direction: 'alternate',
    duration: 500,
    easing: 'easeInOutQuad',
    loop: true
  });

  anime({
    targets: '.orbit',
    rotate: function(el, i) {
      return [i * 120, 360 + i * 120];
    },
    duration: 14000,
    easing: 'linear',
    loop: true
  });

  anime({
    targets: '.warning-img',
    rotate: function(el, i) {
      return [-(i * 120), -(360 + i * 120)];
    },
    duration: 14000,
    easing: 'linear',
    loop: true
  });

  anime({
    targets: '#shield',
    scale: [1, 1.20],
    direction: 'alternate',
    duration: 800,
    easing: 'easeInOutSine',
    loop: true
  });

  anime({
    targets: '.scanner-ring',
    rotate: 360,
    duration: 4000,
    easing: 'linear',
    loop: true
  });

  anime({
    targets: '#scroll-text',
    opacity: [0.4, 1],
    duration: 900,
    direction: 'alternate',
    easing: 'easeInOutSine',
    loop: true
  });


  function handleUnlock(e) {

    if (!unlocked) e.preventDefault();

    if (unlocked) return;

    progress += 3.5; // sensitivity

    if (progress > 100) progress = 100;
    const offset = maxOffset - (progress / 100) * maxOffset;
    circle.style.strokeDashoffset = offset;

    if (progress === 100) {
      unlocked = true;
      finishUnlock();
    }
  }
  
  function finishUnlock() {

    anime({
      targets: '#loader',
      opacity: [1, 0],
      duration: 700,
      easing: 'easeInOutQuad',
      complete: () => {
        loader.style.display = "none";
        document.body.style.overflow = "auto";
        document.getElementById("footer").style.display = "block";
        document.getElementById("navbar").style.display = "block";
        showHero();
      }
    });
  }

  function showHero() {
    anime({
      targets: '#hero-wrapper',
      opacity: [0, 1],
      scale: [0.96, 1],
      duration: 900,
      easing: 'easeOutExpo'
    });
  }

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()