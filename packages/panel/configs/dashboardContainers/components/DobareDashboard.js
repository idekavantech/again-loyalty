import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import QRCode from "qrcode.react";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { useDispatch, useSelector } from "react-redux";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import moment from "moment";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { JoiningTheCustomerClubLink } from "./JoiningTheCustomerClubLink";
import { setPluginData } from "@saas/stores/plugins/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { getAutomatedProcesses } from "store/actions";
import AutomatedProcessesList from "./automatedProcessesList";
import { makeSelectAutomatedProcesses } from "store/selectors";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Button } from "@material-ui/core";
import Link from "next/link";

const FAQS = [
  {
    id: uniqueid(),
    question: "What is a Customer List?",
    response: `You can see all your customers' information in the "Customer List". This information including "Customer Name, Customer Number, Rating, Gift Credit amount, Wallet Inventory,NPS, Tags, The Account Creation Date, Description, First Order Date, Last Order Date, Number of Orders, Average Purchase, and Sum of Orders' Value". You can also make a new customer. Clicking on each customer we can assign a label to the customer.`,
  },
  {
    id: uniqueid(),
    question: "What is a poll?",
    response: `In this section you can consider all the methods of submitting your product. After clicking on each section(for example«Survey settings by sending method» ) You will see the overall status of the survey first and then click on«Select polls questions» You can enable the questions you want to have in your survey form and edit the text by selecting each question.. After selecting each question with«Careful poll» You can cause customer dissatisfaction(Score of one to three) Set your items for each question title.
    `,
  },
  {
    id: uniqueid(),
    question: "What is a discount code?",
    response: `In this section you can click on«Create a new discount code» Correct your favorite discount code. You can also see discount codes that are active or expired at the moment.`,
  },
  {
    id: uniqueid(),
    question: "What is a club's report?",
    response: `Here you can see a report on all surveys. Filtering of reports based on history, the reason for dissatisfaction, and the level of satisfaction are other features of this section. `,
  },
  {
    id: uniqueid(),
    question: "What are the customer levels?",
    response: `In this section you can create customer levels and view information about each level. in part of«Settings settings» By building different levels and determining the score range, you can categorize your customers according to their scores.. How to score to customers in the automatic trends section is defined.`,
  },
  {
    id: uniqueid(),
    question: "What are customer labels?",
    response: `In this section we can define the labels you intend to be on one or more customers. (The labels defined here are used in the club's client list and customer segmentation.) For example, we define the fixed customer tag here and we assign this label in the list of customers who buy from us fixedly..`,
  },
  {
    id: uniqueid(),
    question: "What is a customer segmentation?",
    response: `In this section you can define the labels you intend to be on one or more customers. (The labels defined here are used in the club's client list and customer segmentation.)`,
  },
  {
    id: uniqueid(),
    question: "What are automated process?",
    response: (
      <div>
        <div>
          You can automatically, in exchange for any event by the customers in Interaction with business occurs, for
          customers points, gift credit and SMS.
        </div>
        Automatic events include:
        <br />
        - Complete the profile
        <br />
        - Order
        <br />
        - Membership in the club
        <br />
        - Participate in survey
        <br />
        - Registration through the introduction
        <br />
        - Introducing a new customer
        <br />
        By clicking on any event you can determine that some time after an event What is the dedicated to the customers
        who are specified in a distinct segmentation. For example, you can specify after the customer who is categorized
        «New customers» Located, registered the first order; Be assigned to him as a gift for 5 days and to the customer
        through Be notified SMS. Action Types: SMS- Gift credit- Rating- Cash
      </div>
    ),
  },
  {
    id: uniqueid(),
    question: "What is a cash-back?",
    response: `cash-back or return money is one of the strategies to help customer loyalty. How does the cushion work?You can determine the customer after each customer's purchase, for example, 5 % of the total amount as credit to be used to be usable for the customer in the next purchase.. For example, if we consider the percentage of cache as 2 %, if a customer buys us $ 4,000, he will give 4,000 Tomans as a cache..`,
  },
];
function DobareDashboard() {
  const CRMPluginData = useSelector(makeSelectPlugin(CRM_PLUGIN));
  const dispatch = useDispatch();
  const loading = useSelector(makeSelectLoading());
  const theme = useTheme();
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const business = useSelector(makeSelectBusiness());
  const automated_process = useSelector(makeSelectAutomatedProcesses());
  const [collapses, setCollapses] = useState({});
  const [UTMMediums, setUTMMediums] = useState([]);
  const _setPluginData = (plugin, data) =>
    dispatch(setPluginData(plugin, data));

  const _getAutomatedProcesses = (query) =>
    dispatch(getAutomatedProcesses(query));

  const { utm: { description_choices = [] } = {} } = CRMPluginData.data;
  useEffect(() => {
    setUTMMediums([
      {
        link: `https://${business.site_domain}.ir.ink/profile`,
        title: "Membership General Link",
        isDefault: true,
      },
      ...description_choices?.map((description_choice) => ({
        link: `${business.get_vitrin_absolute_url}/profile?utm_medium=${description_choice}`,
        title: description_choice,
      })),
    ]);
  }, [description_choices?.length]);

  useEffect(() => {
    setTimeout(() => {
      const query = { is_active: true };
      _getAutomatedProcesses(query);
    }, 0);
  }, []);

  const addUTMMedium = () => {
    setUTMMediums([
      ...UTMMediums,
      {
        title: "",
        link: "",
      },
    ]);
  };
  const deleteJoiningLink = (index) => {
    const _UTMMediums = [...UTMMediums];
    _UTMMediums.splice(index, 1);
    setUTMMediums(_UTMMediums);
    _setPluginData(CRM_PLUGIN, {
      ...CRMPluginData.data,
      utm: {
        ...(CRMPluginData.data?.utm || {}),
        description_choices: _UTMMediums
          .filter((item) => !item.isDefault)
          .map((item) => item.title),
      },
    });
  };
  const submitNewMediumAdded = (value) => {
    const _description_choices = [...description_choices, value];
    _setPluginData(CRM_PLUGIN, {
      ...CRMPluginData.data,
      utm: {
        ...(CRMPluginData.data?.utm || {}),
        description_choices: _description_choices,
      },
    });
  };
  return (
    <>
      <Link href={`${adminUrlPrefix}/s/orders?submit_factor=true`}>
        <Button
          variant="filled"
          style={{
            position: "fixed",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            right: 30,
            bottom: 30,
            padding: "1.13rem 1rem",
            zIndex: 100,
            borderRadius: 40,
          }}
        >
          <AddShoppingCartIcon style={{ width: 27, height: 27 }} />
        </Button>
      </Link>
      <div className="container py-3 d-flex flex-wrap row-rev">
        <div className="col-12 col-md-8">
          <Paper elevation={1} className="p-4">
            <div className="d-flex justify-content-between align-items-start">
              <div className="mx-3 ltr_force" style={{ flex: 1 }}>
                <div style={{ fontSize: 24 }}>Club membership link</div>
                <div className="mt-2">
                  You can create a dedicated link for each of your membership channels
                  and separate your customers accordingly.
                  (To Create links+ click.)
                </div>
              </div>
              <div className="d-flex" style={{ width: 80 }}>
                <QRCode
                  value={`https://${business.site_domain}.ir.ink/profile`}
                  size={80}
                  className="printable qr-code"
                />
              </div>
            </div>

            {UTMMediums.map(({ link, title }, index, self) => (
              <>
                <JoiningTheCustomerClubLink
                  key={link}
                  link={link}
                  title={title}
                  businessTitle={business.revised_title}
                  hasPlusToAddNewMedium={index === self.length - 1 && title}
                  addUTMMedium={addUTMMedium}
                  hasDeleteButton={index !== 0}
                  deleteJoiningLink={() => deleteJoiningLink(index)}
                  submitNewMediumAdded={submitNewMediumAdded}
                  loading={loading}
                />
              </>
            ))}
          </Paper>
          <Paper elevation={1} className="p-4 mt-4">
            <div style={{ fontSize: 18 }}>Active Auto-trends</div>
            {automated_process && automated_process.length ? (
              <AutomatedProcessesList automatedProcesses={automated_process} />
            ) : (
              <div className="mt-4">
                You currently have no active automated processes.
              </div>
            )}
          </Paper>
          <div className="mt-5">
            <div style={{ fontSize: 20 }} className="mr-4">
              Frequently Asked Questions
            </div>
            {FAQS.map((item, index) => (
              <Paper
                key={item.id}
                className={`col-12 faq-box my-3 position-relative text-right ltr_force t-align-left`}
                style={{}}
              >
                <div
                  className="py-3 cursor-pointer pl-5 cursor-pointer u-fontLarge u-pre-wrap u-overflow-wrap"
                  onClick={() => setCollapses({ [index]: !collapses[index] })}
                  style={{ color: theme.palette.primary.main }}
                >
                  {item.question}
                </div>
                <div
                  className="position-absolute cursor-pointer"
                  style={{ left: "13px", top: "12px", width: 24 }}
                  onClick={() => setCollapses({ [index]: !collapses[index] })}
                >
                  {collapses[index] ? (
                    <ExpandLessRoundedIcon
                      className="w-100"
                      style={{ color: theme.palette.primary.main }}
                    />
                  ) : (
                    <ExpandMoreRoundedIcon
                      className="w-100"
                      style={{ color: theme.palette.primary.main }}
                    />
                  )}
                </div>
                <Collapse isOpened={collapses[index]} className="w-100">
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                        #reachTextContainer img{
                          max-width: 100%
                        }`,
                    }}
                  />
                  <div
                    id="reachTextContainer"
                    className="py-3 u-fontLarge u-pre-wrap u-overflow-wrap"
                  >
                    {item.response}
                  </div>
                </Collapse>
              </Paper>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-4">
          <Paper elevation={1} className="p-4">
            <div>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div style={{ fontSize: 24 }}>Account status</div>
                <div
                  className="px-3 py-1"
                  style={{
                    color: "white",
                    background: CRMPluginData.isActive
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                    borderRadius: 16,
                    fontSize: 15,
                  }}
                >
                  {CRMPluginData.isActive ? "active" : "Inactive"}
                </div>
              </div>
              {CRMPluginData.isActive ? (
                <div className="mt-4" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  Service duration:{" "}
                  <span style={{ color: "#001e2d" }}>one year</span>
                  <br/>
                   Up to date{" "}
                  <span style={{ color: "#001e2d" }}>
                    {" "}
                    {englishNumberToPersianNumber(
                      moment(CRMPluginData.expirationDate).format(
                        "YYYY/MM/DD"
                      )
                    )}
                  </span>
                </div>
              ) : (
                <div className="mt-4 ltr_force" style={{ color: "#001e2d" }}>
                  <div>Your service credit has been expired.</div>
                  <div>Please renew your service.</div>
                </div>
              )}
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default DobareDashboard;
