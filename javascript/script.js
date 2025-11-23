gsap.registerPlugin(ScrollSmoother, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

let skewSetter = gsap.quickTo(".skew", "skewX"), // fast
  clamp = gsap.utils.clamp(-4, 4); // don't let the skew go beyond 20 degrees.

gsap.matchMedia().add("(min-width: 800px)", () => {
  smoother = ScrollSmoother.create({
    smooth: 1.5,
    speed: 1.5,
    effects: true,
    onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -50)),
    onStop: () => skewSetter(0),
  });

  return () => {
    if (smoother) smoother.kill();
  };
});

function tooltip() {
  if (isMobile) {
  }
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
      if (isMobile) {
        return false;
      }
      text = el.getAttribute("data-hover-text");
      toolTipText.textContent = text;

      timer = setTimeout(() => {
        clearTimeout(timer);

        toolTipBox.classList.add("active");
      }, 400);
    });
    el.addEventListener("mouseleave", (e) => {
      if (isMobile) {
        return false;
      }
      clearTimeout(timer);
      toolTipBox.classList.remove("active");
    });
  });
}

function swiper__init() {
  // hero
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

  // sec4 product
  let sec4Swiper = new Swiper(".sec-4 .swiper", {
    slidesPerView: 1,
    spaceBetween: 30,

    breakpoints: {
      800: {
        slidesPerView: 1.6,
      },
    },
  });

  // sec5 news
  const sec5SwiperEl = document.querySelector(".sec-5 .swiper");
  const length = sec5SwiperEl.querySelectorAll(".swiper-slide").length;

  let sec5Swiper = new Swiper(sec5SwiperEl, {
    slidesPerView: 1,
    spaceBetween: 40,
    centerdSlides: true,

    breakpoints: {
      800: {
        slidesPerView: length,
        // centerdSlides: false,
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
  if (isMobile) {
    ifMobile();
  } else {
    horizontalScroll();
    changeText();
  }

  function horizontalScroll() {
    const totalScrollDistance = imgContainerWrap.offsetWidth - window.innerWidth;

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
    tl.to(lastImgBox, {
      width: "100vw",
      right: 0,
      x: 0,
      height: "100dvh",
      duration: 1,
      ease: "none",
    });
    tl.to(lastImgBox.querySelector("img"), { height: "100dvh", duration: 1 }, "<10%");
    tl.to({}, { duration: 0.1 });

    let st = ScrollTrigger.create({
      trigger: sec_1_pin,
      pin: true,
      scrub: 0,
      animation: tl,
      start: "top top",
      end: "+=700%",
    });
  }

  function changeText() {
    let tlText = gsap.timeline();
    tlText
      .to(textBox[0], { opacity: 1, duration: 0, ease: "none" })
      .to({}, { duration: 3 })
      .to(textBox[0], { opacity: 0, ease: "none" })
      .to(textBox[1], { opacity: 1, ease: "none" })
      .to({}, { duration: 3 })
      .to(textBox[1], { opacity: 0, duration: 1, ease: "none" })
      .to(textBox[2], { opacity: 1, ease: "none" });
    tlText.to({}, { duration: 3 });

    let st = ScrollTrigger.create({
      trigger: sec_1_pin,
      start: "top top",
      end: "+=700%",
      animation: tlText,
      scrub: 0,
    });
  }

  function ifMobile() {
    const sec_1MC = document.querySelector(".sec-1-m > .container");
    const textBox = sec_1MC.querySelectorAll(".text-box");
    const imgContainer = sec_1MC.querySelector(".sec-1-m .img-container");
    const lastImg = sec_1MC.querySelector(".sec-1-m .img-container .img-box:nth-child(6) > img");

    let tl = gsap.timeline({ defaults: { ease: "none" } });
    tl.to(textBox[0], { opacity: 1 });
    tl.to(textBox[0], { opacity: 0 }, 2);
    tl.to(textBox[1], { opacity: 1 }, "<");
    tl.to(textBox[1], { opacity: 0 }, 4);
    tl.to(textBox[2], { opacity: 1 }, "<");
    tl.to({}, { duration: 0.1 }, 5);

    let tl2 = gsap.timeline({ defaults: { ease: "none" } });
    gsap.set(imgContainer, { y: "0%" });
    tl2.to(imgContainer, {
      y: () => {
        return -(imgContainer.offsetHeight - window.innerHeight);
      },
      duration: tl.duration(),
    });
    tl2.fromTo(sec_1MC, { backgroundColor: "#1d4a84" }, { backgroundColor: "#09182b", duration: tl.duration() }, 0);

    let master = gsap.timeline();
    master.add(tl);
    master.add(tl2, 0);

    let st = ScrollTrigger.create({
      trigger: sec_1MC,
      pin: true,
      animation: master,
      scrub: 0,
      start: "top top",
      end: () => {
        return imgContainer.offsetHeight * 1.5;
      },
    });
  }
}

function sec_2_gsap__init() {
  const cards = document.querySelectorAll(".sec-2 .card");
  let fontLarge = "max(32px,2.5vw)",
    fontMedium = "max(24px,1.667vw)",
    fontSmall = "max(14px,1.042vw)";

  cards.forEach((card, index) => {
    const target = card.querySelector("a");
    const h3 = target.querySelector("h3");
    const p = target.querySelector("p");

    const getCardsWidth = () => {
      let innerWidth = window.innerWidth;

      return { activeWidth: isMobile ? innerWidth * 0.9 : "69.2708vw", defaultWidth: isMobile ? innerWidth * 0.6 : "41.6667vw" };
    };

    let prevTarget = null,
      pervH3 = null,
      prevP = null;
    if (index >= 1) {
      prevTarget = cards[index - 1].querySelector("a");
      pervH3 = prevTarget.querySelector("h3");
      prevP = prevTarget.querySelector("p");
    }

    gsap.set(target, {
      width: () => {
        return getCardsWidth().defaultWidth;
      },
      height: "50%",
    });

    let tl = gsap.timeline();
    tl.add("start");
    tl.to(target, {
      width: () => {
        return getCardsWidth().activeWidth;
      },
      height: "100%",
      duration: 1,
    });
    if (prevTarget !== null) {
      tl.to(
        prevTarget,
        {
          width: () => {
            return getCardsWidth().defaultWidth;
          },
          height: "50%",
          duration: 1,
        },
        "<10%"
      );
      tl.to(pervH3, { fontSize: fontMedium }, "<");
      tl.to(prevP, { fontSize: fontSmall }, "<");
    }
    tl.to(h3, { fontSize: fontLarge }, "start");
    tl.to(p, { fontSize: fontMedium }, "start");

    let st = ScrollTrigger.create({
      trigger: card,
      start: "top center",
      end: "33% center",
      animation: tl,
      scrub: 1,
    });

    st.refresh();
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

    let duration = 2.5;
    let ease = "power2.out";

    let tl = gsap.timeline();
    tl.set(circle, { opacity: 0 });
    tl.from(path, { drawSVG: "0", duration: duration, ease: ease });
    tl.to(circle, { opacity: 1, ease: ease }, "<");
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
        duration: duration,
        ease: ease,
      },
      "<"
    );

    let st = ScrollTrigger.create({
      trigger: head,
      animation: tl,
      pin: true,
      start: "top top",
      end: "+=150%",
      scrub: duration,

      // toggleActions: "play none none reset",
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

function animation__init() {
  const target = document.querySelectorAll("[data-ani]");
  let defaultDuration = 0.6;

  target.forEach((el) => {
    let aniType = el.getAttribute("data-ani");
    let delay = el.getAttribute("data-delay") == null ? 0 : el.getAttribute("data-delay");
    let duration = el.getAttribute("data-duration") == null ? defaultDuration : el.getAttribute("data-duration");

    if (aniType == "up") {
      aniUp(el, delay, duration);
    } else if (aniType == "right") {
      aniRight(el, delay, duration);
    } else {
      return false;
    }
  });

  function aniUp(El, de, du) {
    gsap.set(El, { opacity: 0 });
    let tl = gsap.timeline();
    tl.to(El, { y: "50%", opacity: 0, duration: 0.01, ease: "none" });
    tl.to(El, { y: 0, opacity: 1, duration: du, ease: "power2.out", delay: de });
    let st = ScrollTrigger.create({
      trigger: El,
      animation: tl,
      toggleActions: "play none none reverse",
      start: "top 90%",
    });
  }
  function aniRight(El, de, du) {
    gsap.set(El, { opacity: 0 });
    let tl = gsap.timeline();
    tl.to(El, { x: "-50%", opacity: 0, duration: 0.01, ease: "none" });
    tl.to(El, { x: 0, opacity: 1, duration: du, ease: "power2.out", delay: de });

    let st = ScrollTrigger.create({
      trigger: El,
      animation: tl,
      toggleActions: "play none none reverse",
      start: "top 90%",
    });
  }
}
let currentWidth = window.innerWidth;
let isMobile = false;

document.addEventListener("DOMContentLoaded", () => {
  checkMobile();
  swiper__init();
  tooltip();
  sec_1_gsap__init();
  sec_2_gsap__init();
  sec_3_gsap__init();
  headerST();
  animation__init();

  const allLinks = document.querySelectorAll("a");

  allLinks.forEach((el) => {
    el.setAttribute("href", "javascript:void(0)");
  });
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    if (currentWidth == window.innerWidth) {
      return false;
    } else {
      currentWidth = window.innerWidth;
    }
    checkMobile();
    resizeReload();
  }, 300);

  const resizeReload = () => {
    ScrollTrigger.getAll().forEach((s) => {
      s.kill(true);
    });

    sec_1_gsap__init();
    sec_2_gsap__init();
    sec_3_gsap__init();
    headerST();
    animation__init();
  };
});
const checkMobile = () => {
  if (currentWidth < 800) {
    isMobile = true;
  } else {
    isMobile = false;
  }
};

const mNavBtn = document.querySelector(".m-nav-btn");
const mNav = document.querySelector(".m-sidebar");
const closeBtn = mNav.querySelector(".m-sidebar .close");

mNavBtn.addEventListener("click", () => {
  mNav.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  mNav.classList.remove("active");
});
