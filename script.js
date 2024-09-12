document.addEventListener("DOMContentLoaded", () => {
  const locations = document.querySelectorAll(".location");

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
