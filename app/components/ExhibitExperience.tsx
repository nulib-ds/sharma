import React from "react";

type ExhibitExperienceProps = React.PropsWithChildren<{
  ambientLabel?: string;
  backgroundImage?: string;
}>;

export default function ExhibitExperience({
  ambientLabel,
  backgroundImage,
  children,
}: ExhibitExperienceProps) {
  const style = backgroundImage
    ? ({
        ["--exhibit-experience-bg-image" as const]: `url("${backgroundImage}")`,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className="exhibit-experience" style={style}>
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
