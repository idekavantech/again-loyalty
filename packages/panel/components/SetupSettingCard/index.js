import { uniqueId } from "lodash";
import SetupItems from "./components/SetupItems";

const statusSetupItems = [
  { id: uniqueId(), title: "غیرفعال" },
  { id: uniqueId(), title: "درحال پردازش" },
  { id: uniqueId(), title: "فعال" },
];

const statusSetupItem = [
  // {
  //   id: uniqueId(),
  //   title: "وضعیت دامنه",
  //   link: "/documents",
  //   type: "domain",
  //   statusSetupItems,
  // },
  {
    id: uniqueId(),
    title: "وضعیت درگاه پرداخت",
    link: "/gate_away",
    type: "gateway",
    statusSetupItems,
  },
];
const SetupSettingCard = ({ successState }) => {
  return (
    <div className="w-100 mb-5 p-4 setup_setting_card ">
      {statusSetupItem.map((item) => (
        <SetupItems key={item.id} item={item} successState={successState} />
      ))}
    </div>
  );
};

export default SetupSettingCard;
