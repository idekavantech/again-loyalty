import LoginPageContainer from "containers/Pages/Login";

export default function LoginPage() {
  return <LoginPageContainer />;
}
LoginPage.NeedNoAuth = true;
LoginPage.layoutConfig = { isSmall: true };