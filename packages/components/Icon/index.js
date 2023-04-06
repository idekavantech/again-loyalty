/* eslint-disable no-param-reassign */
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";

function Icon({
  className,
  width,
  height,
  icon,
  color,
  angle = 0,
  style,
  onClick = () => {},
}) {
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
  const size = icon ? icon.size : "";
  return (
    <svg
      style={{ ...style, ...styles.svg }}
      className={className}
      width={`${width || `${size}px`}`}
      height={`${height || `${size}px`}`}
      viewBox={`0 0 ${size || width} ${size || height}`}
      onClick={onClick}
    >
      {icon &&
        icon.elements &&
        icon.elements.map((iconElement) => {
          if (iconElement.d)
            return (
              <path
                key={iconElement.key}
                {...iconElement}
                style={iconElement.fill ? {} : styles.path}
              />
            );
          if (iconElement.rect)
            return (
              <rect
                {...iconElement.rect}
                key={iconElement.key}
                style={
                  iconElement.fill ? { fill: iconElement.fill } : styles.path
                }
              />
            );
          if (iconElement.circle)
            return (
              <circle
                {...iconElement.circle}
                key={iconElement.key}
                style={
                  iconElement.fill ? { fill: iconElement.fill } : styles.path
                }
              />
            );
          if (iconElement.line)
            return (
              <line
                {...iconElement.line}
                stroke={color}
                key={iconElement.key}
                style={
                  iconElement.fill ? { fill: iconElement.fill } : styles.path
                }
              />
            );
          return null;
        })}
    </svg>
  );
}

export default Icon;
