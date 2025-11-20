gsap.registerPlugin(ScrollSmoother, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

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
    let timer;

    el.addEventListener("mouseenter", (e) => {
      text = el.getAttribute("data-hover-text");
      toolTipText.textContent = text;

      timer = setTimeout(() => {
        clearTimeout(timer);

        toolTipBox.classList.add("active");
      }, 400);
    });
    el.addEventListener("mouseleave", (e) => {
      clearTimeout(timer);
      toolTipBox.classList.remove("active");
    });
  });
}

function swiper__init() {
  let heroSection = new Swiper(".hero-swiper", {
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

  let sec4Swiper = new Swiper(".sec-4 .swiper", {
    slidesPerView: 1.6,
    spaceBetween: 30,
  });

  const sec5SwiperEl = document.querySelector(".sec-5 .swiper");
  const length = sec5SwiperEl.querySelectorAll(".swiper-slide").length;

  let sec5Swiper = new Swiper(sec5SwiperEl, {
    slidesPerView: length,
    spaceBetween: 40,
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
    });
    tl.to(
      lastImgBox,
      {
        x: () => window.innerWidth / 2 - lastImgBox.offsetWidth / 2,
        ease: "none",
      },
      "-=0.5"
    );
    tl.to(".sec-1 .img-box:nth-child(6) img", { filter: "brightness(0.6)", ease: "none" }, "<");
    tl.to(
      lastImgBox,
      {
        width: "100vw",
        right: 0,
        x: 0,
        height: "100dvh",
        duration: 2,
        ease: "none",
      },
      "+=0.5"
    );
    tl.to({}, { duration: 1 });

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
      .to(textBox[0], { opacity: 1, duration: 0, ease: "none" })
      .to(textBox, { duration: 0.5 })
      .to(textBox[0], { opacity: 0, ease: "none" })
      .to(textBox[1], { opacity: 1, ease: "none" })
      .to(textBox, { duration: 1 })
      .to(textBox[1], { opacity: 0, duration: 1, ease: "none" })
      .to(textBox[2], { opacity: 1, ease: "none" });
    tlText.to({}, { duration: 3 });

    let st = ScrollTrigger.create({
      trigger: sec_1_pin,
      start: "top top",
      end: "+=700%",
      animation: tlText,
      scrub: 1,
    });
  }
}

function sec_2_gsap__init() {
  const cards = document.querySelectorAll(".sec-2 .card");

  cards.forEach((card, index) => {
    const target = card.querySelector("a");
    const prevTarget = index >= 1 ? cards[index - 1].querySelector("a") : null;

    const h3 = target.querySelector(".text-box h3");
    const p = target.querySelector(".text-box p");

    let tl = gsap.timeline();
    tl.add("start");
    tl.to(target, { width: "133rem", height: "100%", duration: 1, ease: "none" });
    tl.to(prevTarget, { width: "80rem", height: "50%", duration: 1, ease: "none" }, "<10%");
    tl.to(h3, { fontSize: "4.8rem", ease: "none" }, "start");
    tl.to(p, { fontSize: "3.2rem", ease: "none" }, "start");

    let st = ScrollTrigger.create({
      trigger: card,
      start: "top center",
      end: "33% center",
      animation: tl,
      scrub: 1,
    });
  });
}
function sec_3_gsap__init() {
  const sec3 = document.querySelector(".sec-3");

  headSVG();
  bodyST();

  function bodyST() {
    const pin = sec3.querySelector(".body");
    const cards = sec3.querySelectorAll(".card");

    const cardHeight = cards[0].offsetHeight;

    let tl = gsap.timeline();

    tl.to({}, { duration: 0.5 });
    for (let i = 1; cards.length > i; i++) {
      tl.to(cards[i], { y: -(cardHeight + 100) * i, duration: 1 * i, ease: "none" });
      tl.to(cards[i - 1], { scale: 0.95, filter: `blur(3px)`, duration: 1, ease: "none" }, "<40%");
    }
    tl.to({}, { duration: 0.5 });

    let st = ScrollTrigger.create({
      trigger: pin,
      pin: true,
      animation: tl,
      scrub: 1,
      start: "top top",
      end: `+=${cardHeight * 5}`,
    });
  }

  function headSVG() {
    const head = sec3.querySelector(".head");
    const path = sec3.querySelector("#sec-3-path");
    const circle = sec3.querySelector("#sec-3-circle");

    let duration = 3.3;
    let ease = "power2.out";

    let tl = gsap.timeline();
    tl.set(circle, { opacity: 0 });
    tl.from(path, { drawSVG: "0", ease: ease });
    tl.to(
      circle,
      {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 1,
        },
        opacity: 1,
        ease: ease,
      },
      "<"
    );

    let st = ScrollTrigger.create({
      trigger: head,
      animation: tl,
      scrub: duration,
      start: "25% center",
      end: "center center",
    });
  }
}
function headerST() {
  const header = document.querySelector("header");
  const target = document.querySelectorAll(`[data-invert="true"]`);
  const target2 = document.querySelectorAll(`[data-invert="false"]`);

  target.forEach((el) => {
    let st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onEnter: () => header.classList.add("invert"),
      onLeaveBack: () => header.classList.remove("invert"),
    });
  });

  target2.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onEnter: () => header.classList.remove("invert"),
      onLeaveBack: () => header.classList.add("invert"),
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  swiper__init();
  tooltip();
  sec_1_gsap__init();
  sec_2_gsap__init();
  sec_3_gsap__init();
  headerST();

  const allLinks = document.querySelectorAll("a");

  allLinks.forEach((el) => {
    el.setAttribute("href", "javascript:void(0)");
  });
});
