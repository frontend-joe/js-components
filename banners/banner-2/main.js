const message = document.querySelector(".message");

const s = new SplitText(message, {
  type: "lines,words",
});

const tl = gsap.timeline({
  delay: 0.5,
  repeatDelay: 0.5,
  repeat: 10,
});

tl.addLabel("enter");

tl.fromTo(
  s.words,
  { yPercent: 100 },
  {
    yPercent: 0,
    ease: "circ.out",
    stagger: 0.2,
  },
  "enter"
);

tl.fromTo(
  s.words,
  { opacity: 0 },
  {
    opacity: 1,
    ease: "power1.out",
    stagger: 0.2,
  },
  "enter"
);

tl.addPause();

tl.to(
  s.words,
  {
    yPercent: -200,
    opacity: 0,
    ease: "circ.in",
    stagger: 0.1,
    duration: 0.4,
  },
  "exit"
);

tl.to(
  s.words,
  {
    opacity: 0,
    ease: "power1.in",
    stagger: 0.1,
    duration: 0.4,
  },
  "exit"
);

const handleClick = () => {
  tl.play();
  const button = document.querySelector(".typed-message-wrapper button");
  button.classList.add("hidden");
};
