import VerifyPageContainer from "containers/Pages/Verify";

export default function VerifyPage() {
  return <VerifyPageContainer />;
}

VerifyPage.NeedNoAuth = true;
VerifyPage.layoutConfig = { isSmall: true };
