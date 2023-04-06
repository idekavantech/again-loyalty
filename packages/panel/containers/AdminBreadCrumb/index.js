import { memo, useEffect, useState } from "react";
import { night } from "@saas/utils/colors";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Link from "next/link";
import request from "@saas/utils/request";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { VITRIN_WEBAPP_CONSTANT } from "@saas/utils/constants";
import Popover from "@material-ui/core/Popover";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

const TutorialVideoModal = dynamic(() => import("./TutorialVideoModal"));
import dynamic from "next/dynamic";

function AdminBreadCrumb({
  submitButtonText,
  submitAction,
  submitButtonHasPlus,
  deleteButtonText,
  deleteButtonAction,
  isLoading,
  responsive = true,
  buttons,
  noBack = false,
  buttonContainerClassName = "",
  customizedButton,
  isDeleteButtonDisable,
  overrideCurrentLinkWith,
  disableBreadcrumb = false,
  helpVideo,
}) {
  const { minWidth768 } = useResponsive();
  const theme = useTheme();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const noLayout =
    router.query.no_layout === "true" || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("noLayout")
      : false;
  const [breadcrumb, setBreadCrumb] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const getBreadCrumb = async () => {
    const { response: { data } = {} } = await request(
      `/api/breadcrumb?pathname=${router.pathname}&route=${router.asPath}`
    );
    setBreadCrumb(data?.breadcrumb ?? []);
  };

  const isVitrin = process.env.NEXT_PUBLIC_APP_NAME === VITRIN_WEBAPP_CONSTANT;
  useEffect(() => {
    if (!disableBreadcrumb)
      setTimeout(() => {
        getBreadCrumb();
      }, 0);
  }, [router.asPath]);

  return (
    <div
      className="d-flex justify-content-between align-items-center flex-wrap py-4 ltr_force"
      style={{
        position: "sticky",
        top: noLayout ? 0 : minWidth768 ? 63 : 48,
        background: "#f6f6f7",
        zIndex: 100,
      }}
    >
      <div className="d-flex align-items-center py-2 ">
        {!noBack && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.back()}
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
            }}
            className="mr-2"
          >
            <ChevronLeftIcon />
          </Button>
        )}
        {!disableBreadcrumb && (
          <div
            className="d-flex align-items-center flex-wrap"
            style={{ color: night, fontSize: 16, fontWeight: 500 }}
          >
            {breadcrumb?.map((item, index, self) =>
              index !== self.length - 1 ? (
                <>
                  {" "}
                  <Link href={item.url}>
                    <div
                      style={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      {" "}
                      {item.title}{" "}
                    </div>
                  </Link>
                  <div className="mx-1"> /</div>
                </>
              ) : overrideCurrentLinkWith ? (
                <div> {overrideCurrentLinkWith} </div>
              ) : (
                <div> {item.title} </div>
              )
            )}
          </div>
        )}
      </div>
      {!minWidth768 && responsive && helpVideo && isVitrin && !buttons && (
        <>
          <Button
            className="ml-2 breadcrumb_tuturial_btn"
            onClick={() => setShowModal(true)}
            color={"primary"}
            {...(helpVideo.id && { id: helpVideo.id })}
          >
            <PlayCircleOutlineIcon style={{ color: "#222633b3" }} />
            <span className="mr-1" style={{ color: "#222633b3" }}>
              {minWidth768 ? "educational video" : "Education"}
            </span>
          </Button>
        </>
      )}
      {!minWidth768 && responsive && buttons ? (
        <div className={`d-flex flex-wrap justify-content-end w-100`}>
          {buttons ? (
            <MoreVertIcon
              className={"mx-2"}
              onClick={handleClick}
              style={{ color: "#222633b3" }}
            />
          ) : null}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className={"d-flex flex-col align-items-start py-2"}>
              {buttons}
              {helpVideo && isVitrin ? (
                <Button
                  className="ml-2 breadcrumb_tuturial_btn"
                  onClick={() => setShowModal(true)}
                  color={"primary"}
                  {...(helpVideo.id && { id: helpVideo.id })}
                >
                  <PlayCircleOutlineIcon style={{ color: "#222633b3" }} />
                  <span className="mr-1" style={{ color: "#222633b3" }}>
                    {minWidth768 ? "educational video" : "Education"}
                  </span>
                </Button>
              ) : null}
            </div>
          </Popover>
        </div>
      ) : null}
      {customizedButton}
      {(minWidth768 || !responsive) &&
      (submitButtonText || deleteButtonText || buttons || helpVideo) ? (
        <div
          className={`d-flex flex-wrap justify-content-end ${buttonContainerClassName}`}
        >
          {helpVideo && isVitrin && (
            <Button
              className={`${
                submitButtonText || deleteButtonText || buttons ? "ml-2" : ""
              } breadcrumb_tuturial_btn`}
              onClick={() => setShowModal(true)}
              color={"primary"}
              {...(helpVideo.id && { id: helpVideo.id })}
            >
              <PlayCircleOutlineIcon
                fontSize={"small"}
                style={{ color: "#222633b3" }}
              />
              <span className="mr-1" style={{ color: "#222633b3" }}>
                {minWidth768 ? "educational video" : "Education"}
              </span>
            </Button>
          )}
          {submitButtonText && (
            <Button
              onClick={submitAction}
              variant="contained"
              color="primary"
              style={{ direction: "ltr" }}
              endIcon={submitButtonHasPlus ? <AddRoundedIcon /> : ""}
              disabled={isLoading}
            >
              {submitButtonText}
            </Button>
          )}
          {deleteButtonText && (
            <Button
              style={{
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
              }}
              onClick={deleteButtonAction}
              variant="outlined"
              className="mx-2"
              disabled={isLoading}
            >
              {deleteButtonText}
            </Button>
          )}
          {buttons}
        </div>
      ) : submitButtonText || deleteButtonText || buttons ? (
        <div
          style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)" }}
          className="fixed-bottom p-3 bg-white d-flex"
        >
          {submitButtonText && (
            <Button
              color="primary"
              onClick={submitAction}
              variant="contained"
              className="flex-1"
              disabled={isLoading}
            >
              {submitButtonText}
            </Button>
          )}
          {deleteButtonText && (
            <Button
              style={{
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
              }}
              onClick={deleteButtonAction}
              variant="outlined"
              className="mx-2 flex-1"
              disabled={isDeleteButtonDisable || isLoading}
            >
              {deleteButtonText}
            </Button>
          )}

          {buttons}
        </div>
      ) : null}
      {helpVideo && isVitrin && (
        <TutorialVideoModal
          title={
            helpVideo.title || breadcrumb[breadcrumb.length - 1]?.title || ""
          }
          showModal={showModal}
          setShowModal={setShowModal}
          videoUrl={helpVideo.url}
        />
      )}
    </div>
  );
}

export default memo(AdminBreadCrumb);
