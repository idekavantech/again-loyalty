const AdminProductBox = ({ children, className, ...props }) => {
  return (
    <div
      style={{ background: "#fff", border: "1px solid #EEEEEE" }}
      className={`u-border-radius-8 ${className && className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AdminProductBox;
