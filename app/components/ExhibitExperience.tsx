import React from "react";

type ExhibitExperienceProps = React.PropsWithChildren<{
  ambientLabel?: string;
}>;

function useCanopyGalleryScrollLock() {
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (!document.querySelector("[data-canopy-gallery]")) return;

    const positions = {
      current: { x: window.scrollX, y: window.scrollY },
      previous: { x: window.scrollX, y: window.scrollY },
    };

    const handleScroll = () => {
      positions.previous = positions.current;
      positions.current = { x: window.scrollX, y: window.scrollY };
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || !hash.startsWith("#canopy-gallery-")) return;

      const target = positions.previous;
      window.requestAnimationFrame(() => {
        window.scrollTo({ left: target.x, top: target.y });
      });
    };

    // Hash-based Canopy gallery modals cause the browser to jump to anchors, so
    // track the last natural scroll position and snap back whenever one fires.
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
}

export default function ExhibitExperience({
  ambientLabel,
  children,
}: ExhibitExperienceProps) {
  useCanopyGalleryScrollLock();

  return (
    <div className="exhibit-experience">
      <div className="exhibit-experience__ambient" aria-hidden="true" />
      <div className="exhibit-experience__shell">
        {ambientLabel ? (
          <div className="exhibit-experience__label" aria-hidden="true">
            {ambientLabel}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
