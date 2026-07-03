import { interpolateParams } from "./demo-registry.mjs";

export function tweenPreset({
  fromParams,
  toParams,
  duration = 900,
  onUpdate,
  onComplete,
}) {
  const startTime = performance.now();
  let frameId = null;

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    onUpdate(interpolateParams(fromParams, toParams, eased), progress);

    if (progress < 1) {
      frameId = requestAnimationFrame(step);
      return;
    }

    frameId = null;
    if (onComplete) onComplete();
  };

  frameId = requestAnimationFrame(step);

  return () => {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };
}
