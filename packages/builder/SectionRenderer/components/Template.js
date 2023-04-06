import React from "react";
import { sectionsDetails } from "../constants";

export default function Template({ sections, templateProps }) {
  return (
    <div>
      {sections.map((section, index) => {
        const id = `${section.id || "i"}-${section.name}-${index}`;
        const SectionComponent = sectionsDetails[section.name].component;
        return (
          <div className="position-relative u-pointer-events-none" key={id}>
            <SectionComponent {...section.props} {...templateProps} />
          </div>
        );
      })}
    </div>
  );
}
