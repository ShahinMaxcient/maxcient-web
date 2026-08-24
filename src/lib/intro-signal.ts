/**
 * Handshake between the intro splash and the hero.
 *
 * The hero's reveal is viewport-triggered and the hero sits above the trigger
 * line, so it fires the instant it mounts — underneath the splash, finishing
 * before the curtain opens. The splash announces when it is out of the way so
 * the hero can start then instead.
 */
const EVENT = "mx-intro-done";

let done = false;

/** Called by the splash when it finishes, or immediately when it will not play. */
export function markIntroDone() {
  if (done) return;
  done = true;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT));
}

/** True once the splash is out of the way. */
export function isIntroDone() {
  return done;
}

/** Subscribe; returns an unsubscribe. Fires immediately if already done. */
export function onIntroDone(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (done) {
    fn();
    return () => {};
  }
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}
