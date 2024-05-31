import Swiper from 'swiper';
import {Pagination, A11y } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {

    //menu
    const menuButton = document.querySelector('.js-menu-toggle');

    menuButton.onclick = function() {
        if(menuButton.classList.contains('menu__toggle--active')) {
            menuButton.classList.remove('menu__toggle--active');
            menuButton.setAttribute('aria-expanded', 'false');
        } else {
            menuButton.classList.add('menu__toggle--active');
            menuButton.setAttribute('aria-expanded', 'true');
        }
    }

    //video

const videoButton = document.querySelector('.js-video-play');
videoButton.onclick =function () {
    const video = videoButton.parentElement;
    const videoIframe = video.querySelector('iframe');
    videoIframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'playVideo'}), '*')
    video.classList.add('is-active');
}

//Testimonials
const swiper = new Swiper('.js-testimonials-slider', {
    // configure Swiper to use modules
    modules: [Pagination, A11y],
    loop: true,
    speed: 600,
    autoHeight: true,
    spaceBetween: 20,
    slidesPerView: 1,
    a11y: true,
      // If we need pagination
     pagination: {
         el: '.testimonials-slider__pagination',
         bulletElement: 'button',
         bulletClass: 'testimonials-slider__pagination-bullet',
         bulletActiveClass: 'testimonials-slider__pagination-bullet--active',
         clickable: true
     },
     breakpoints: {
        769: {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 0,
            slideToClickedSlide: true,  
        }
     }
  });
})
