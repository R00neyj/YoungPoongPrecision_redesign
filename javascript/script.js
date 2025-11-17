gsap.registerPlugin(ScrollTrigger);

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
    let tl = gsap.timeline();
    tl.to(imgContainerWrap, {
      x: () => -(imgContainerWrap.offsetWidth - window.innerWidth),
      ease: "none",
      duration: 1,
    });

    let st = ScrollTrigger.create({
      trigger: sec_1_pin,
      pin: true,
      scrub: 1,
      animation: tl,
      start: "top top",
      end: "+=300%",
    });

    let tlImgBox = gsap.to(lastImgBox, { width: "100vw", height: "100dvh", position: "absolute", inset: "0 0 auto auto", duration: 1 });
    let tlImg = gsap.to(lastImgBox.querySelector("img"), { width: "100%", duration: 1 });
    let masterTlImg = gsap.timeline();
    masterTlImg.add(tlImgBox, 0);
    masterTlImg.add(tlImg, 0);
    const lastImgX = lastImgBox.getBoundingClientRect().left - window.innerWidth;

    let st2 = ScrollTrigger.create({
      trigger: lastImgBox,
      scrub: 1,
      animation: masterTlImg,
      start: `${lastImgX} bottom`,
      end: "+=80%",
      markers: true,
      // pin: true,
      onEnter: () => {
        textBox[2].style.transition = "all .5s";
        textBox[2].style.opacity = 0;
      },
    });
  }

  function changeText() {
    let tlText = gsap.timeline();
    tlText
      .fromTo(textBox[1], { opacity: 1 }, { opacity: 0, duration: 1, ease: "none" })
      .fromTo(textBox[2], { opacity: 0 }, { opacity: 1, duration: 1, ease: "none" });

    let st = ScrollTrigger.create({
      trigger: sec_1_pin,
      start: "top top",
      end: "+=250%",
      animation: tlText,
      scrub: true,
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  swiper__init();
  tooltip();
  sec_1_gsap__init();
});
