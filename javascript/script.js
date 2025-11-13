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
// document.querySelector(".sec-1 .text-box").innerHTML = `<h2>임시텍스트</h2><p>임시</p>`;
