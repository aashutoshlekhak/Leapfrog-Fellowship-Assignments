document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.querySelector<HTMLElement>(
    ".carousel-image-wrapper"
  );
  const images = carouselTrack?.querySelectorAll<HTMLImageElement>("img");
  const totalImages = images?.length ?? 0;
  const imageWidth = images?.[0]?.clientWidth ?? 0;
  const dots = document.querySelectorAll<HTMLSpanElement>(".dot");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  let currentIndex = 0;
  let intervalId: number;

  function startCarousel() {
    intervalId = setInterval(() => {
      moveCarousel();
    }, 2500);
  }

  function moveCarousel() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  }

  function updateCarousel() {
    if (carouselTrack) {
      const offset = -currentIndex * imageWidth;
      carouselTrack.style.left = `${offset}px`;
      updateDots();
    }
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToImage(index: number) {
    currentIndex = index;
    updateCarousel();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(intervalId);
      goToImage(index);
      startCarousel();
    });
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      clearInterval(intervalId);
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
      startCarousel();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      clearInterval(intervalId);
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
      startCarousel();
    });
  }

  startCarousel();
});
