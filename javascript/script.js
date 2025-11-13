new Swiper(".hero-swiper", {
  loop: true,
  parallax: true,
  speed: 800,

  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
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
