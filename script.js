document.addEventListener("DOMContentLoaded", () => {
  const locations = document.querySelectorAll(".location");
  const imageBox = document.querySelector(".image-box");
  const boxes = document.querySelectorAll(".box");
  const animatedSVG = document.querySelector(".animated-svg");

  const auraClickableDiv = document.querySelector(".aura");
  const cursorString = "step into the aura";

  const text = document.getElementById("text");
  for (let i = 0; i < cursorString.length; i++) {
    let span = document.createElement("span");
    span.classList.add("rotating-text");
    span.innerHTML = cursorString[i];

    const angle = (360 / cursorString.length) * i;
    span.style.transform = `rotate(${angle}deg) translateX(75px)`;
    text.appendChild(span);
  }

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

  function updateTextPosition(e) {
    const rect = auraClickableDiv.getBoundingClientRect();
    text.style.left = `${e.clientX - rect.left - text.offsetWidth / 2}px`;
    text.style.top = `${e.clientY - rect.top - text.offsetHeight / 2}px`;
  }

  const playStartAnimations = async () => {
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

    boxes.forEach((box) => {
      if (!box.classList.contains("image-box")) {
        const boxesKeyframes = new KeyframeEffect(
          box,
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 3000, easing: "ease-in-out", fill: "forwards" }
        );

        const boxesAnimation = new Animation(boxesKeyframes, document.timeline);
        boxesAnimation.play();
      }
    });

    const animatedSVGKeyframes = new KeyframeEffect(
      animatedSVG,
      [
        {
          transform: "rotate(0deg)",
        },
        {
          transform: "rotate(180deg)",
          transformOrigin: "50% 50%",
        },
      ],
      {
        duration: 20000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    const svgAnimation = new Animation(animatedSVGKeyframes, document.timeline);
    svgAnimation.play();
  };

  playStartAnimations();

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
});
