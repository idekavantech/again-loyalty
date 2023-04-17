import { uniqueId } from "lodash";
import SetupItems from "./components/SetupItems";

const statusSetupItems = [
  { id: uniqueId(), title: "Inactive" },
  { id: uniqueId(), title: "Processing" },
  { id: uniqueId(), title: "active" },
];

const statusSetupItem = [
  // {
  //   id: uniqueId(),
  //   title: "Domain status",
  //   link: "/documents",
  //   type: "domain",
  //   statusSetupItems,
  // },
  {
    id: uniqueId(),
    title: "The status of the payment gateway",
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
