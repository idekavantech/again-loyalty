import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { graphite, smoke, strawberryI } from "@saas/utils/colors";
import Tabs from "@saas/components/Tabs";
import useTheme from "@material-ui/core/styles/useTheme";
import Icon from "@saas/components/Icon";
import { TRASH } from "@saas/icons";
import Input from "@saas/components/Input";
import SaveAndDiscardButtons from "@saas/components/SaveAndDiscardButtons";
import {
  ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
  ONLINE_SUPPORT_CHANNEL_IS_INACTIVE,
  ONLINE_SUPPROT_CRISP,
  ONLINE_SUPPROT_RAYCHAT,
} from "@saas/stores/plugins/constants";
import { ONLINE_SUPPORT_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { setPluginData } from "@saas/stores/plugins/actions";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { updateJourneyState } from "store/actions";
import { useRouter } from "next/router";
import { makeSelectJourneyState } from "store/selectors";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";
import {contactChannelsInitialState, contactChannelsPrefix} from "@saas/utils/constants/fab";
export function AdminSettings({
  loading,
  pluginData,
  _setPluginData,
  _setSnackBarMessage,
  _updateJourneyState,
  journeyData,
}) {
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  const [emptyContactChannels, setEmptyContactChannels] = useState([]);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const dashboardState =
    journeyData?.vitrin_journey_state?.dashboard_state || {};

  const router = useRouter();
  const visibilityTab = [
    {
      text: "فعال",
      color: theme.palette.primary.main,
      value: true,
    },
    {
      text: `غیرفعال`,
      color: smoke,
      value: false,
    },
  ];
  const positionTab = [
    {
      text: "پایین سمت راست",
      color: theme.palette.primary.main,
      value: true,
    },
    {
      text: `پایین سمت چپ`,
      color: theme.palette.primary.main,
      value: false,
    },
  ];
  const [selectedVisibilityTab, selectVisibilityTab] = useState(
    pluginData.data.visibility ||
      typeof pluginData.data.visibility === "undefined"
      ? visibilityTab[0]
      : visibilityTab[1]
  );
  const [selectedPositionTab, selectPositionTab] = useState(
    pluginData.data.position === "right" ? positionTab[0] : positionTab[1]
  );
  const [contactChannels, setContactChannels] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const onDragEnd = (e) => {
    if (!e.destination) return;
    const newList = [...contactChannels];
    const draggbleItem = newList[e.source.index];
    newList.splice(e.source.index, 1);
    newList.splice(e.destination.index, 0, draggbleItem);
    setContactChannels(newList);
  };
  const deleteHandler = (index) => {
    const newList = [...contactChannels];
    newList.splice(index, 1);
    setContactChannels(newList);
  };
  const handleSwitch = (e) => {
    const newList = [...contactChannels];
    if (
      (newList.find((icon) => icon.name === ONLINE_SUPPROT_RAYCHAT) &&
        newList.find((icon) => icon.name === ONLINE_SUPPROT_RAYCHAT).status ===
          ONLINE_SUPPORT_CHANNEL_IS_ACTIVE &&
        e.target.name === ONLINE_SUPPROT_CRISP &&
        e.target.checked) ||
      (newList.find((icon) => icon.name === ONLINE_SUPPROT_CRISP) &&
        newList.find((icon) => icon.name === ONLINE_SUPPROT_CRISP).status ===
          ONLINE_SUPPORT_CHANNEL_IS_ACTIVE &&
        e.target.name === ONLINE_SUPPROT_RAYCHAT &&
        e.target.checked)
    ) {
      setPopupOpen(true);
    } else {
      const foundContactChannel = newList.find(
        (icon) => icon.name === e.target.name
      );
      if (foundContactChannel) {
        if (e.target.checked) {
          foundContactChannel.status = ONLINE_SUPPORT_CHANNEL_IS_ACTIVE;
        } else {
          foundContactChannel.status = ONLINE_SUPPORT_CHANNEL_IS_INACTIVE;
        }
        setContactChannels(newList);
      }
    }
  };
  const onClosePopupHandler = () => {
    setPopupOpen(false);
  };
  const addCommunicationHandler = (channel) => {
    if (
      contactChannels.find(
        (communicationIcon) => communicationIcon.name === channel.name
      )
    ) {
      return;
    } else {
      const newList = [...contactChannels];
      newList.unshift(channel);
      setContactChannels(newList);
    }
  };
  const submit = () => {
    const emptyFields = [];
    contactChannels.forEach((channel) => {
      if (
        channel.link.length ===
        contactChannelsPrefix[channel.name].prefix.length
      ) {
        emptyFields.push(channel.name);
      }
    });
    if (emptyFields.length) {
      _setSnackBarMessage("فیلد‌های اضافه شده نباید خالی باشند.", "fail");
      setEmptyContactChannels(emptyFields);
    } else {
      _setPluginData(ONLINE_SUPPORT_PLUGIN, {
        ...pluginData.data,
        contact_channels: contactChannels,
        position: selectedPositionTab.value ? "right" : "left",
        visibility: selectedVisibilityTab.value,
      });
      if (!dashboardState?.fab_step) {
        setIsOpenSuccessModal(true);
      }
      setEmptyContactChannels([]);
    }
  };

  const updateJourneyStateData = (data) => {
    _updateJourneyState(
      {
        dashboard_state: {
          ...dashboardState,
          ...data,
        },
      },
      () => router.back()
    );
  };

  useEffect(() => {
    setContactChannels(pluginData.data.contact_channels || []);
  }, [pluginData.data]);

  const inputChangeHandler = (value, icon) => {
    const newList = [...contactChannels];
    let selectedContactChannel = newList.find(
      (communicationIcon) => communicationIcon.name === icon.name
    );
    for (let index = 0; index < contactChannels.length; index++) {
      if (
        value.includes(
          contactChannelsPrefix[selectedContactChannel.name].prefix
        )
      ) {
        selectedContactChannel.link = value;
        setContactChannels(newList);
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: minWidth768 ? "" : 60 }}>
      <Head>
        <title>تنظیمات دکمه شناور تماس</title>
      </Head>

      <AdminBreadCrumb helpVideo={{ url: ADMIN_HELP_VIDEOS.fab.url }} />

      <Dialog
        open={isPopupOpen}
        onClose={onClosePopupHandler}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="u-fontNormal">
              {` امکان فعال‌سازی دو سرویس چت به صورت همزمان وجود ندارد. لطفا ابتدا
              یکی از سرویس‌های "رایچت" یا "کریسپ" را غیر‌فعال نموده و سپس اقدام
              به فعال‌سازی سرویس دیگر کنید.`}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClosePopupHandler} color="primary">
            فهمیدم
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={1} className="d-flex flex-column mt-3 py-3 px-1">
        <div className="col-6">تنظیمات</div>
        <div className="d-flex flex-column flex-md-row mt-4">
          <div className="w-100 w-md-25 col-12 col-md-6">
            <Tabs
              selectTab={(data) =>
                selectVisibilityTab(
                  data.value ? visibilityTab[0] : visibilityTab[1]
                )
              }
              selectedTab={selectedVisibilityTab}
              tabs={visibilityTab}
            />
            <div
              className="p-1 u-font-semi-small text-justify"
              style={{ color: graphite }}
            >
              {`از طریق گزینه بالا می‌توانید نسبت به فعال یا غیرفعال‌سازی "دکمه
              شناور تماس" اقدام نمایید.`}
            </div>
          </div>
          <div className="w-100 w-md-25 col-12 col-md-6 mt-3 mt-md-0">
            <Tabs
              selectTab={(data) =>
                selectPositionTab(data.value ? positionTab[0] : positionTab[1])
              }
              selectedTab={selectedPositionTab}
              tabs={positionTab}
            />
            <div
              className="p-1 u-font-semi-small text-justify"
              style={{ color: graphite }}
            >
              {`از طریق گزینه بالا می‌توانید نسبت به تغییر محل نمایش "دکمه شناور
              تماس" اقدام نمایید.`}
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={1} className="d-flex flex-column mt-3 py-3 px-5">
        <div style={{ color: theme.palette.text.tertiary }}>
          راه‌های ارتباطی
        </div>
        <div
          style={{ color: theme.palette.text.tertiary }}
          className="mt-1 u-font-semi-small"
        >
          برای افزودن راه‌های ارتباطی جدید برای مشتریان خود روی هر کدام از
          آیکن‌های زیر برای اضافه شدن یک راه ارتباطی جدید کلیک نمایید.
        </div>
        <div className="d-flex flex-wrap">
          {contactChannelsInitialState.map((channel) => {
            const isUsedThisContactChannel =
              contactChannels &&
              contactChannels.find(
                (contactChannel) => contactChannel.name === channel.name
              );
            return (
              <img
                alt=""
                key={channel.id}
                src={channel.icon}
                style={{
                  width: 35,
                  height: 35,
                  opacity: isUsedThisContactChannel ? "0.5" : "1",
                }}
                className="ml-2 mt-3 u-cursor-pointer"
                onClick={() => addCommunicationHandler(channel)}
              />
            );
          })}
        </div>
      </Paper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="deal_categories">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {contactChannels &&
                contactChannels.map((icon, index) => (
                  <Draggable
                    key={icon.name}
                    draggableId={`${icon.name}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <Paper
                        elevation={1}
                        className="d-flex flex-column my-3 py-3 px-4"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <span
                              className="dragHandle d-flex"
                              style={{ cursor: "grab", color: graphite }}
                            >
                              <DragIndicatorIcon />
                            </span>
                            <img
                              alt=""
                              src={
                                contactChannelsInitialState.find(
                                  (channel) => channel.name === icon.name
                                )?.icon
                              }
                              style={{ width: 35, height: 35 }}
                              className="mx-2"
                            />
                          </div>
                          <div className="d-flex align-items-center">
                            <Switch
                              checked={
                                icon.status === ONLINE_SUPPORT_CHANNEL_IS_ACTIVE
                              }
                              onChange={(e) => handleSwitch(e)}
                              color="primary"
                              name={icon.name}
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                            <Icon
                              icon={TRASH}
                              className="u-cursor-pointer"
                              onClick={() => deleteHandler(index)}
                            />
                          </div>
                        </div>
                        <Input
                          type="text"
                          size="small"
                          onChange={(value) => inputChangeHandler(value, icon)}
                          style={{ width: minWidth768 ? 350 : "100%" }}
                          className="mr-1 mt-3"
                          value={icon.link}
                          InputProps={{ style: { direction: "ltr" } }}
                        />
                        {emptyContactChannels.length &&
                        emptyContactChannels.find(
                          (channel) => channel === icon.name
                        ) ? (
                          <div
                            className="p-1 u-font-semi-small text-justify"
                            style={{ color: strawberryI }}
                          >
                            لطفا این فیلد را تکمیل نمایید.
                          </div>
                        ) : null}
                        <div
                          className="p-1 u-font-semi-small text-justify"
                          style={{ color: graphite }}
                          dangerouslySetInnerHTML={{
                            __html: icon.description,
                          }}
                        ></div>
                      </Paper>
                    )}
                  </Draggable>
                ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <SuccessMessageModal
        isOpen={isOpenSuccessModal}
        title="آماده دریافت تماس هستید؟!"
        content="در صورتی که پیام یا تماس جدیدی دریافت کنید در این قسمت می‌توانید از آن مطلع شوید.
        تا چند ثانیه دیگر شما یک تماس تستی از ویترین دریافت می‌کنید تا نحوه دریافت گزارش کلیک بر دکمه شناور تماس را بررسی کنید."
        onClose={() => setIsOpenSuccessModal(false)}
        image={`/images/success-call.svg`}
        returnToDashboardText="تمایل ندارم"
        returnToDashboard={() => updateJourneyStateData({ fab_step: 1 })}
        nextTitle="تست و دریافت تماس تستی"
        next={() => updateJourneyStateData({ fab_step: 1, fab_bot_step: 1 })}
      />
      <SaveAndDiscardButtons
        saveAction={submit}
        saveText="ذخیره"
        disabled={loading}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  pluginData: makeSelectPlugin(ONLINE_SUPPORT_PLUGIN),
  journeyData: makeSelectJourneyState(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setPluginData: (pluginName, data) =>
      dispatch(setPluginData(pluginName, data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _updateJourneyState: (data, callback) =>
      dispatch(updateJourneyState(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminSettings);
