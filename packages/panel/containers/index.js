// /**
//  *
//  * Settings
//  *
//  */

import Dashboard from "configs/dashboardContainers";
export default function Index() {
  const Comp = Dashboard[process.env.NEXT_PUBLIC_APP_NAME];
  return <Comp />;
}
