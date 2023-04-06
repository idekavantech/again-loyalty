import DownloadAppPageContainer from "@saas/plugins/PWA/containers/DownloadApp";
import { PWA_PLUGIN } from "@saas/utils/constants/plugins";

export default function DownloadAppPage() {
  return <DownloadAppPageContainer />;
}
DownloadAppPage[PWA_PLUGIN] = true;
DownloadAppPage.layoutConfig = { isSmall: true };
