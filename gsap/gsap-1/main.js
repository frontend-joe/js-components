gsap.registerPlugin(Observer);

const state = {
  currentIndex: -1,
  animating: false,
};

const collectDOM = () => {
  const sections = document.querySelectorAll("section");
  const headings = gsap.utils.toArray(".section-heading");

  return {
    sections,
    images: document.querySelectorAll(".bg"),
    outerWrappers: gsap.utils.toArray(".outer"),
    innerWrappers: gsap.utils.toArray(".inner"),
    splitHeadings: headings.map(
      (heading) =>
        new SplitText(heading, {
          type: "chars,words,lines",
          linesClass: "clip-text",
        })
    ),
  };
};

const dom = collectDOM();
const wrapIndex = gsap.utils.wrap(0, dom.sections.length);

const setupWrappers = ({ outerWrappers, innerWrappers }) => {
  gsap.set(outerWrappers, { yPercent: 100 });
  gsap.set(innerWrappers, { yPercent: -100 });
};

setupWrappers(dom);

const createTimeline = (onComplete) =>
  gsap.timeline({
    defaults: { duration: 1.25, ease: "power1.inOut" },
    onComplete,
  });

const animateOutgoingSection = (tl, dFactor) => {
  const { currentIndex } = state;
  if (currentIndex < 0) return;

  gsap.set(dom.sections[currentIndex], { zIndex: 0 });

  tl.to(dom.images[currentIndex], { yPercent: -15 * dFactor }).set(
    dom.sections[currentIndex],
    { autoAlpha: 0 }
  );
};

const animateIncomingSection = (tl, index, dFactor) => {
  gsap.set(dom.sections[index], { autoAlpha: 1, zIndex: 1 });

  tl.fromTo(
    [dom.outerWrappers[index], dom.innerWrappers[index]],
    {
      yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
    },
    { yPercent: 0 },
    0
  )
    .fromTo(dom.images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
    .fromTo(
      dom.splitHeadings[index].chars,
      {
        autoAlpha: 0,
        yPercent: 150 * dFactor,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
        stagger: {
          each: 0.02,
          from: "random",
        },
      },
      0.2
    );
};

const gotoSection = (index, direction) => {
  if (state.animating) return;

  state.animating = true;
  index = wrapIndex(index);

  const dFactor = direction === -1 ? -1 : 1;
  const tl = createTimeline(() => (state.animating = false));

  animateOutgoingSection(tl, dFactor);
  animateIncomingSection(tl, index, dFactor);

  state.currentIndex = index;
};

const createObserver = () =>
  Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    tolerance: 10,
    preventDefault: true,
    onDown: () => gotoSection(state.currentIndex - 1, -1),
    onUp: () => gotoSection(state.currentIndex + 1, 1),
  });

createObserver();
gotoSection(0, 1);
