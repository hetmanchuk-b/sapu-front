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