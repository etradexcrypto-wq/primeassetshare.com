export function animateCSS(element: string, animation: string, prefix = "animate__") {
  return new Promise<void>((resolve, reject) => {
    const node = document.querySelector<HTMLElement>(element);
    if (!node) {
      reject(new Error(`Animation target not found: ${element}`));
      return;
    }
    const animationName = `${prefix}${animation}`;
    node.classList.add(`${prefix}animated`, animationName);
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== node) return;
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve();
    };
    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}
