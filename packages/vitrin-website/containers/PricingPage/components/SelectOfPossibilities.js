import PeopleOutlineOutlinedIcon from "@material-ui/icons/PeopleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CompareArrowsOutlinedIcon from "@material-ui/icons/CompareArrowsOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import GMobiledataOutlinedIcon from "@mui/icons-material/GMobiledataOutlined";
import { uniqueId } from "lodash";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Button } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const GrowthOpportunities = [
  {
    id: uniqueId(),
    title: "باشگاه مشتریان",
    icon: () => <PeopleOutlineOutlinedIcon className="icon" />,
    label: "customer_club",
  },
  {
    id: uniqueId(),
    title: "فروش آنلاین",
    icon: () => <ShoppingCartOutlinedIcon className="icon" />,
    label: "online_sales",
  },
  {
    id: uniqueId(),
    title: "سئو (دیده شدن در گوگل)",
    icon: () => (
      <GMobiledataOutlinedIcon
        className="icon"
        style={{ transform: "scale(1.5)" }}
      />
    ),
    label: "seo",
  },
  {
    id: uniqueId(),
    title: "حسابداری و فروش",
    icon: () => <PostAddIcon className="icon" />,
    label: "accounting",
  },
  {
    id: uniqueId(),
    title: "تبلیغات آنلاین",
    icon: () => <CampaignOutlinedIcon className="icon" />,
    label: "online_ads",
  },
];
const SelectOfPossibilities = ({
  selectedOpp,
  setSelectedOpp,
  setStep,
  step,
}) => {
  const desktopMatches = useMediaQuery("(min-width:1200px)");

  return (
    <>
      <p className="text">برای رشد کسب‌وکارتان چه امکاناتی نیاز دارید؟</p>
      {GrowthOpportunities.map((opp) => (
        <div
          className="px-4 py-3 mt-4 mt-xl-4 d-flex justify-content-between align-items-center"
          style={{
            boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.12)",
            borderRadius: 8,
            cursor: "pointer",
            backgroundColor: selectedOpp.includes(opp.label)
              ? "#FA996A"
              : "#fff",
          }}
          key={opp.id}
          onClick={() => {
            if (selectedOpp.includes(opp.label)) {
              setSelectedOpp(
                selectedOpp.filter((selected) => selected !== opp.label)
              );
            } else setSelectedOpp([...selectedOpp, opp.label]);
          }}
        >
          <div style={{ height: 24 }}>
            {selectedOpp.includes(opp.label) ? (
              <CheckBoxIcon style={{ color: "#ffffffb3" }} />
            ) : (
              <CheckBoxOutlineBlankIcon
                style={{
                  color: "gray",
                  fontSize: 24,
                }}
              />
            )}
          </div>
          <div
            style={{
              fontSize: desktopMatches ? 16 : 12,
              fontWeight: 500,
              color: selectedOpp.includes(opp.label) ? "#fff" : "#000000",
            }}
            className="w-100 mr-3"
          >
            <p className="text-right">{opp.title}</p>
          </div>
          <div
            style={{
              color: selectedOpp.includes(opp.label) ? "#fff" : "#FB996A",
              height: desktopMatches ? 48 : 24,
            }}
          >
            {opp.icon()}
          </div>
        </div>
      ))}
      <Button
        className="w-100 mt-4 mt-xl-auto"
        variant="contained"
        color="primary"
        size="large"
        style={{ borderRadius: 8 }}
        onClick={() => {
          setStep(step + 1);
          window.dataLayer.push({
            event: "submit_preferred_services",
          });
        }}
      >
        ثبت
      </Button>
      <Button
        className="w-100 mt-4"
        variant="outlined"
        color="primary"
        size="large"
        style={{ borderRadius: 8 }}
        onClick={() => {
          setSelectedOpp([...selectedOpp, "more_info"]);
          setStep(step + 1);
        }}
      >
        نمی‌دانم، اطلاعات بیشتری لازم دارم
      </Button>
    </>
  );
};

export default SelectOfPossibilities;
