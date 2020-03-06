export async function waitForReadystate() {
  if (
    typeof document !== "undefined" &&
    typeof window !== "undefined" &&
    document.readyState !== "complete"
  ) {
    await new Promise(resolve => {
      const cb = () => {
        window.requestAnimationFrame(resolve);
        window.removeEventListener("load", cb);
      };

      window.addEventListener("load", cb);
    });
  }
}
