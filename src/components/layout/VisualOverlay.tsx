export function VisualOverlay() {
  return (
    <>
      <div className="visual-overlay-scanlines scanlines pointer-events-none fixed inset-0 z-[60]" aria-hidden />
      <div className="visual-overlay-noise noise-overlay pointer-events-none fixed inset-0 z-[59]" aria-hidden />
    </>
  );
}
