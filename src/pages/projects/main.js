import { gsap } from "gsap";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(SplitText)

const splitTitle = SplitText.create('.hero-title', {type: 'words, chars'})

gsap.from(splitTitle.chars, {
  duration: 1,
  x: 100,
  autoAlpha: 0,
  stagger: 0.01
})
// Appear
gsap.from('.anim-appear', {
  x: -40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.3,
  ease: 'power3.out',
})
gsap.from('.op-appear', {
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.in',
})