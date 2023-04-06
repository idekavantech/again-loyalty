export const useHtmlTag = (
  type = "span",
  {
    title_color = process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    title_font_size = "20px",
    title_position = "right",
    title_value,
  }
) => {
  const headingsComp = {
    h1: () => (
      <h1
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </h1>
    ),
    h2: () => (
      <h2
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </h2>
    ),
    h3: () => (
      <h3
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </h3>
    ),
    h4: () => (
      <h4
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </h4>
    ),
    h5: () => (
      <h5
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </h5>
    ),
    h6: () => (
      <h6
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </h6>
    ),
    p: () => (
      <p
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </p>
    ),
    div: () => (
      <div
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </div>
    ),
    span: () => (
      <span
        style={{
          color: title_color,
          fontSize: title_font_size,
          wordBreak: "break-word",
        }}
        className={`col-12 mx-auto text-${title_position} py-2`}
      >
        {title_value}
      </span>
    ),
  };

  return headingsComp[type]();
};
