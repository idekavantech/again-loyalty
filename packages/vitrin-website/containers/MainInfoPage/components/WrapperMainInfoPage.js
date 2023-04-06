const WrapperMainInfoPage = ({ children }) => {
  return (
    <div className="login-form d-flex flex-column justify-content-between">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .MuiInputLabel-outlined{
              margin-top:8px
            }
            .MuiOutlinedInput-adornedEnd{
              padding-left: 0;
              border-radius:8px;
            }
            .Mui-focused{
              margin-top:0px
            }
          `,
        }}
      />
      {children}
    </div>
  );
};

export default WrapperMainInfoPage;
