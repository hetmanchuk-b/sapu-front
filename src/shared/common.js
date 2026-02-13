import {gsap} from "gsap";
import {Draggable} from "gsap/Draggable";
import {SplitText} from "gsap/SplitText";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {InertiaPlugin} from "gsap/InertiaPlugin";
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
});
gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, SplitText)

const vetModal = document.getElementById('vet-modal')
if (vetModal) {
  const vetOpenBtn = [...document.querySelectorAll('.vet-btn')]
  const vetCloseBts = [...vetModal.querySelectorAll('.vet-close')]

  vetOpenBtn.forEach((button) => {
    button.addEventListener('click', () => {
      if (vetModal.classList.contains('hidden')) {
        vetModal.classList.remove('hidden')
        scroll.stop()
      } else {
        vetModal.classList.add('hidden')
        scroll.start()
      }
    })
  })

  vetCloseBts.forEach((button) => {
    button.addEventListener('click', () => {
      vetModal.classList.add('hidden')
      scroll.start()
    })
  })
}


const mentorModal = document.getElementById('mentor-modal')
if (mentorModal) {
  const mentorOpenBtn = [...document.querySelectorAll('.mentor-btn')]
  const mentorCloseBts = [...mentorModal.querySelectorAll('.mentor-close')]

  mentorOpenBtn.forEach((button) => {
    button.addEventListener('click', () => {
      if (mentorModal.classList.contains('hidden')) {
        scroll.stop()
        mentorModal.classList.remove('hidden')
      } else {
        scroll.start()
        mentorModal.classList.add('hidden')
      }
    })
  })

  mentorCloseBts.forEach((button) => {
    button.addEventListener('click', () => {
      scroll.start()
      mentorModal.classList.add('hidden')
    })
  })
}

// ================================================
//   Header
// ================================================
const headerTrigger = document.getElementById('headerTrigger');
const header = document.getElementById('header');

headerTrigger.addEventListener('click', () => {
  if (header.classList.contains('mob-open')) {
    scroll.start()
    header.classList.remove('mob-open');
  } else {
    scroll.stop()
    header.classList.add('mob-open');
  }
});

const navLinks = document.querySelectorAll('.nav-link')
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    scroll.start()
    header.classList.remove('mob-open');
  })
})

const fixedHeaderTween = gsap.from('#header', {
  yPercent: -100,
  paused: true,
  duration: 0.2,
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: "max",
  // markers: true,
  onUpdate: (self) => {
    self.direction === -1 ? fixedHeaderTween.play() : fixedHeaderTween.reverse()
  }
});

gsap.from(header, {
  duration: 1,
  opacity: 0,
  yPercent: -110,
})

// ================================================
//   SplitText
// ================================================

gsap.set('.line-split', {opacity: 1})
document.fonts.ready.then(() => {
  const containers = gsap.utils.toArray('.line-split-container')
  containers.forEach((container) => {
    const splitElements = container.querySelectorAll('.line-split')

    splitElements.forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line',
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.lines, {
            yPercent: 120,
            opacity: 0,
            stagger: 0.12,
            ease: 'power3.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: container,
              scrub: true,
              start: 'clamp(top bottom)',
              end: 'clamp(bottom 80%)',
            }
          })
        }
      })
    })
  })

  ScrollTrigger.refresh()
})

// ================================================
//   CAROUSEL CLASS
// ================================================

class SapCarousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    this.slides = [...this.track.children];
    this.btnPrev = container.querySelector('.carousel-btn-prev');
    this.btnNext = container.querySelector('.carousel-btn-next');

    this.currentIndex = 0;
    this.slidesPerView = 1;
    this.gap = 16;
    this.cellWidth = 0;

    this.updateLayout = this.updateLayout.bind(this);
    this.snap = this.snap.bind(this);

    this.updateLayout();
    this.initDraggable();
    this.bindButtons();
    window.addEventListener('resize', this.debounce(this.updateLayout, 180));
  }

  debounce(fn, delay) {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, delay);
    };
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
      gsap.set(this.track, {x});
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
      bounds: {minX: maxDrag(), maxX: 0},
      edgeResistance: 0.85,
      throwResistance: 5000,
      snap: {
        x: this.snap
      },
      onThrowComplete: () => {
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