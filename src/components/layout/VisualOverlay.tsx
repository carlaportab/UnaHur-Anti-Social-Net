export function VisualOverlay() {
  return (
    <>
      <div className="scanlines pointer-events-none fixed inset-0 z-[60] opacity-[0.035]" aria-hidden />
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[59] opacity-[0.04]" aria-hidden />
    </>
  );
}
