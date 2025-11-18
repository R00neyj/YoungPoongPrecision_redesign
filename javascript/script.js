gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

let skewSetter = gsap.quickTo(".skew", "skewX"), // fast
  clamp = gsap.utils.clamp(-4, 4); // don't let the skew go beyond 20 degrees.

ScrollSmoother.create({
  smooth: 1.5,
  speed: 1.5,
  effects: true,
  onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -50)),
  onStop: () => skewSetter(0),
});

function tooltip() {
  const toolTipBox = document.querySelector(".tooltip-box");
  const toolTipText = toolTipBox.querySelector(".tipText");
  const hoverEl = document.querySelectorAll(`[data-hover="true"]`);

  document.addEventListener("mousemove", (eh) => {
    let mouseX = eh.clientX;
    let mouseY = eh.clientY;
    toolTipBox.style.transform = `translate3d(${mouseX + 10}px, calc(${mouseY}px + 2.4rem), 0)`;
  });

  hoverEl.forEach((el) => {
    let text;

    el.addEventListener("mouseenter", (e) => {
      text = el.getAttribute("data-hover-text");
      toolTipText.textContent = text;
      console.log(text);
      toolTipBox.classList.add("active");
    });
    el.addEventListener("mouseleave", (e) => {
      toolTipBox.classList.remove("active");
    });
  });
}

function swiper__init() {
  new Swiper(".hero-swiper", {
    loop: true,
    parallax: true,
    speed: 800,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-btns > .next",
      prevEl: ".swiper-btns > .prev",
    },
    on: {
      init: function () {
        const imgBoxs = document.querySelectorAll(".hero-swiper .swiper-slide .slide-box");

        imgBoxs.forEach((el) => {
          el.setAttribute("data-swiper-parallax-x", "80%");
        });
      },
    },
  });
}

function sec_1_gsap__init() {
  const sec_1 = document.querySelector(".sec-1");
  const sec_1_pin = sec_1.querySelector(".container");
  const imgContainerWrap = sec_1.querySelector(".img-container .inner");
  const textBox = sec_1.querySelectorAll(".text-box");
  const imgBox = imgContainerWrap.querySelectorAll(".img-box");
  const lastImgBox = imgBox[5];

  horizontalScroll();
  changeText();

  function horizontalScroll() {
    const totalScrollDistance = imgContainerWrap.offsetWidth - window.innerWidth;
    const imgBoxCenterOffset = lastImgBox.offsetLeft + lastImgBox.offsetWidth / 2 - window.innerWidth / 2;
    const startProgress = imgBoxCenterOffset / totalScrollDistance;

    console.log(startProgress);

    let tl = gsap.timeline();
    tl.to(imgContainerWrap, {
      x: () => -totalScrollDistance,
      ease: "none",
      duration: 2,
    })
      .to(lastImgBox, {
        x: () => window.innerWidth / 2 - lastImgBox.offsetWidth / 2,
      })
      .to(
        lastImgBox,
        {
          width: "100vw",
          right: 0,
          x: 0,
          height: "100dvh",
          duration: 1,
        },
        "+=0.5"
      );

    let st = ScrollTrigger.create({
      trigger: sec_1_pin,
      pin: true,
      scrub: 1,
      animation: tl,
      start: "top top",
      end: "+=700%",
    });
  }

  function changeText() {
    let tlText = gsap.timeline();
    tlText
      .set(textBox[0], { opacity: 1 })
      .to(textBox[0], { opacity: 0, duration: 1, ease: "none" })
      .to(textBox[1], { opacity: 1, duration: 2, ease: "none" })
      .to(textBox[1], { opacity: 0, duration: 1, ease: "none" })
      .to(textBox[2], { opacity: 1, duration: 2, ease: "none" });

    let st = ScrollTrigger.create({
      trigger: sec_1_pin,
      start: "top top",
      end: "+=700%",
      animation: tlText,
      scrub: 1,
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  swiper__init();
  tooltip();
  sec_1_gsap__init();
});
