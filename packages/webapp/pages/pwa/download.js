import DownloadAppPageContainer from "@saas/plugins/PWA/containers/DownloadApp";
import Head from "next/head";
import { PWA_PLUGIN } from "@saas/utils/constants/plugins";

export default function DownloadAppPage() {
  return (
    <div>
      <Head>
        <title>نصب وب اپلیکیشن</title>
      </Head>
      <DownloadAppPageContainer />
    </div>
  );
}
DownloadAppPage[PWA_PLUGIN] = true;
DownloadAppPage.layoutConfig = { isSmall: true };
