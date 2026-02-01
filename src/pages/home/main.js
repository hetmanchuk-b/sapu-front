import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText)

const splitTitle = SplitText.create('.hero-title', {type: 'words, chars'})

gsap.from(splitTitle.chars, {
  duration: 1,
  x: 100,
  autoAlpha: 0,
  stagger: 0.01
})

const videos = document.querySelectorAll('.bg-video');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      if (video.paused) {
        video.play().catch(() => {});
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  });
}, {
  threshold: 0.3,
  rootMargin: "100px"
});

videos.forEach(video => observer.observe(video));