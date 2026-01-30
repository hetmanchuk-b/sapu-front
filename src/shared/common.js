import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll();
gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger)

const headerTrigger = document.getElementById('headerTrigger');
const header = document.getElementById('header');

headerTrigger.addEventListener('click', () => {
  if (header.classList.contains('mob-open')) {
    header.classList.remove('mob-open');
  } else {
    header.classList.add('mob-open');
  }
});

// ================================================
//   CAROUSEL CLASS
// ================================================

class SapCarousel {
  constructor(container) {
    this.container = container;
    this.track      = container.querySelector('.carousel-track');
    this.slides     = [...this.track.children];
    this.btnPrev    = container.querySelector('.carousel-btn-prev');
    this.btnNext    = container.querySelector('.carousel-btn-next');

    this.currentIndex   = 0;
    this.slidesPerView  = 1;
    this.gap            = 16;
    this.cellWidth      = 0;       // updated on resize

    this.updateLayout = this.updateLayout.bind(this);
    this.snap         = this.snap.bind(this);

    this.updateLayout();
    this.initDraggable();
    this.bindButtons();
    window.addEventListener('resize', this.debounce(this.updateLayout, 180));
  }

  debounce(fn, delay) {
    let t;
    return () => { clearTimeout(t); t = setTimeout(fn, delay); };
  }

  updateLayout() {
    const ww = window.innerWidth;
    this.slidesPerView = ww >= 1024 ? 3 : ww >= 640 ? 2 : 1;
    this.gap = ww >= 1024 ? 24 : ww >= 640 ? 20 : 16;

    this.track.style.gap = `${this.gap}px`;

    // Measure real slide width + gap
    if (this.slides.length > 0) {
      this.cellWidth = this.slides[0].offsetWidth + this.gap;
    }

    // Re-apply current position after resize
    this.goTo(this.currentIndex, false);
  }

  snap(value) {
    // value = current x position of track
    const rawIndex = -value / this.cellWidth;
    let target = Math.round(rawIndex);

    // clamp
    target = Math.max(0, Math.min(this.slides.length - this.slidesPerView, target));

    return -target * this.cellWidth;
  }

  goTo(index, animate = true) {
    if (index < 0 || index > this.slides.length - this.slidesPerView) return;
    this.currentIndex = index;

    const x = -index * this.cellWidth;

    if (animate) {
      gsap.to(this.track, {
        x,
        duration: 0.6,
        ease: "power3.out"
      });
    } else {
      gsap.set(this.track, { x });
    }

    this.updateButtons();
  }

  updateButtons() {
    if (this.btnPrev) this.btnPrev.disabled = this.currentIndex <= 0;
    if (this.btnNext) this.btnNext.disabled = this.currentIndex >= this.slides.length - this.slidesPerView;
  }

  initDraggable() {
    const maxDrag = () => -(this.slides.length - this.slidesPerView) * this.cellWidth;

    Draggable.create(this.track, {
      type: "x",
      inertia: true,
      bounds: { minX: maxDrag(), maxX: 0 },
      edgeResistance: 0.85,
      throwResistance: 5000,       // controls how fast it slows down
      snap: {
        x: this.snap
      },
      onThrowComplete: () => {
        // After inertia + snap → find current index
        const x = gsap.getProperty(this.track, "x");
        this.currentIndex = Math.round(-x / this.cellWidth);
        this.updateButtons();
      },
      onDragStart: () => {
        gsap.killTweensOf(this.track); // stop any ongoing animation
      }
    });
  }

  bindButtons() {
    if (this.btnNext) {
      this.btnNext.onclick = () => this.goTo(this.currentIndex + 1);
    }
    if (this.btnPrev) {
      this.btnPrev.onclick = () => this.goTo(this.currentIndex - 1);
    }
  }
}

document.querySelectorAll('[data-carousel]').forEach((el) => {
  new SapCarousel(el)
})