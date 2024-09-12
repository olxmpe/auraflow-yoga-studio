document.addEventListener("DOMContentLoaded", () => {
  const locations = document.querySelectorAll(".location");
  const imageBox = document.querySelector(".image-box");
  const animatedSVG = document.querySelector(".animated-svg");
  const boxes = Array.from(document.querySelectorAll(".box"));
  const auraClickableDiv = document.querySelector(".aura");
  const cursorString = "step into the aura";
  const text = document.getElementById("text");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createTextAnimation() {
    cursorString.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.classList.add("rotating-text");
      span.innerHTML = char;
      const angle = (360 / cursorString.length) * i;
      span.style.transform = `rotate(${angle}deg) translateX(75px)`;
      text.appendChild(span);
    });
  }

  function updateTextPosition(e) {
    const rect = auraClickableDiv.getBoundingClientRect();
    text.style.left = `${e.clientX - rect.left - text.offsetWidth / 2}px`;
    text.style.top = `${e.clientY - rect.top - text.offsetHeight / 2}px`;
  }

  async function playStartAnimations() {
    const startImageKeyframes = new KeyframeEffect(
      imageBox,
      [
        { transform: "scale(1.3)", opacity: 0 },
        { transform: "scale(1)", opacity: 1 },
      ],
      {
        duration: 1000,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );

    const startImageAnimation = new Animation(
      startImageKeyframes,
      document.timeline
    );
    startImageAnimation.play();
    await startImageAnimation.finished;

    shuffleArray(boxes);

    boxes.forEach((box) => {
      if (!box.classList.contains("image-box")) {
        const boxesKeyframes = new KeyframeEffect(
          box,
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 3000, easing: "ease-in-out", fill: "forwards" }
        );

        const boxesAnimation = new Animation(boxesKeyframes, document.timeline);
        const delay = Math.random() * 2000;
        setTimeout(() => {
          boxesAnimation.play();
        }, delay);
      }
    });
  }

  function setupLocationAnimations() {
    locations.forEach((location) => {
      const expandAnimation = new KeyframeEffect(
        location,
        [{ height: "50px" }, { height: "290px" }],
        {
          duration: 500,
          fill: "forwards",
        }
      );

      const expand = new Animation(expandAnimation, document.timeline);

      location.addEventListener("mouseenter", () => {
        if (expand.playState === "running" || expand.playState === "finished") {
          expand.reverse();
        } else {
          expand.play();
        }
      });

      location.addEventListener("mouseleave", () => {
        expand.reverse();
      });
    });
  }

  function setupSVGAnimation() {
    const animatedSVGKeyframes = new KeyframeEffect(
      animatedSVG,
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(180deg)", transformOrigin: "50% 50%" },
      ],
      {
        duration: 20000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    const svgAnimation = new Animation(animatedSVGKeyframes, document.timeline);
    svgAnimation.play();
  }

  function setupAuraText() {
    createTextAnimation();

    auraClickableDiv.addEventListener("mouseenter", (e) => {
      text.style.opacity = 1;
      updateTextPosition(e);
    });

    auraClickableDiv.addEventListener("mousemove", (e) => {
      updateTextPosition(e);
    });

    auraClickableDiv.addEventListener("mouseleave", () => {
      text.style.opacity = 0;
    });
  }

  playStartAnimations();
  setupLocationAnimations();
  setupSVGAnimation();
  setupAuraText();
});
