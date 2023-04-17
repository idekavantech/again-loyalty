/* eslint-disable no-param-reassign */
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";

function Icon({ className, width, height, icon, color, angle = 0, style, onClick = () => {} }) {
  const theme = useTheme();
  color = color || theme.palette.primary.main;
  const styles = {
    svg: {
      display: "inline-block",
      verticalAlign: "middle",
      fill: "none",
      transform: `rotate(${angle}deg)`,
    },
    path: {
      fill: color,
    },
  };
  const size = icon ? icon.size : "10px";
  return <span className="mx-1">$</span>;
  // return (
  //   <svg
  //     style={{ ...style, ...styles.svg }}
  //     className={className}
  //     width={`${width || `${size}px`}`}
  //     height={`${height || `${size}px`}`}
  //     viewBox={`0 0 ${size || width} ${size || height}`}
  //     onClick={onClick}
  //   >
  //     <g>
  //       <path
  //         d="M24.26,20.34c0,3.42-2.423,6.342-6.845,7.111v3.92h-3.768v-3.648c-2.578-0.117-5.076-0.811-6.537-1.654l1.154-4.5
	// 	      c1.615,0.886,3.883,1.693,6.383,1.693c2.191,0,3.691-0.848,3.691-2.385c0-1.461-1.23-2.389-4.077-3.348
	// 	      c-4.112-1.385-6.921-3.306-6.921-7.033c0-3.386,2.385-6.035,6.499-6.845V0h3.767v3.383c2.576,0.115,4.309,0.652,5.576,1.268
	// 	      l-1.115,4.348C21.07,8.575,19.3,7.688,16.531,7.688c-2.5,0-3.307,1.076-3.307,2.154c0,1.268,1.346,2.074,4.613,3.307
	// 	      C22.416,14.762,24.26,16.877,24.26,20.34z"
  //       />
  //     </g>
  //   </svg>
  // );
}

export default Icon;

{
  /*       
      {icon &&
        icon.elements &&
        icon.elements.map((iconElement) => {
          if (iconElement.d)
            return <path key={iconElement.key} {...iconElement} style={iconElement.fill ? {} : styles.path} />;
          if (iconElement.rect)
            return (
              <rect
                {...iconElement.rect}
                key={iconElement.key}
                style={iconElement.fill ? { fill: iconElement.fill } : styles.path}
              />
            );
          if (iconElement.circle)
            return (
              <circle
                {...iconElement.circle}
                key={iconElement.key}
                style={iconElement.fill ? { fill: iconElement.fill } : styles.path}
              />
            );
          if (iconElement.line)
            return (
              <line
                {...iconElement.line}
                stroke={color}
                key={iconElement.key}
                style={iconElement.fill ? { fill: iconElement.fill } : styles.path}
              />
            );
          return null;
        })} */
}
