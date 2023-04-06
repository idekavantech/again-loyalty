import { ONLINE_SUPPORT_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectBusinessThemeColor } from "../business/selector";
import {
  ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
  ONLINE_SUPPORT_PLUGIN_MAIN_COMPONENT,
  ONLINE_SUPPROT_CRISP,
  ONLINE_SUPPROT_RAYCHAT,
} from "./constants";
import { makeSelectPlugin } from "./selector";
import CallRoundedIcon from "@material-ui/icons/CallRounded";
import dynamic from "next/dynamic";
import LazyImage from "@saas/components/LazyImage";
import { useSelector, useDispatch } from "react-redux";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { callRequest } from "./actions";
import { contactChannelsInitialState } from "@saas/utils/constants/fab";

const Fab = dynamic(() => import("react-tiny-fab").then((comp) => comp.Fab), {
  ssr: false,
});
const Action = dynamic(
  () => import("react-tiny-fab").then((comp) => comp.Action),
  {
    ssr: false,
  }
);
export const PLUGIN_COMPONENTS = {
  [ONLINE_SUPPORT_PLUGIN_MAIN_COMPONENT]: () => {
    const data = useSelector(makeSelectPlugin(ONLINE_SUPPORT_PLUGIN));
    const themeColor = useSelector(makeSelectBusinessThemeColor());
    const dispatch = useDispatch();
    const { maxWidth768 } = useResponsive();

    function runReplacementExtraScript(str, replacementCharacters) {
      let returnValue = str;
      for (let i = 0; i < replacementCharacters.length; i++) {
        returnValue = returnValue.replace(
          replacementCharacters[i].searchString,
          replacementCharacters[i].replacementString
        );
      }
      return returnValue;
    }

    return data.data.visibility && data.data.contact_channels.length ? (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                      .pulse-inner-circle-button {
                        border-radius: 50%;
                        width: 56px !important;
                        height: 56px !important;
                        animation: scaleIn 2s ease-in-out infinite;
                        -webkit-animation: scaleIn2 2s ease-in-out infinite;
                        background: inherit;
                      }
                      .pulse-outer-circle-button {
                        border-radius: 50%;
                        width: 75px !important;
                        height: 75px !important;
                        opacity: 0;
                        background: inherit;
                        animation: scaleOutButton 2s ease-in-out infinite;
                        -webkit-animation: scaleOutButton 2s ease-in-out infinite;
                      }
                      .pulse-container-button {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        width: 75px !important;
                        height: 75px !important;
                        position: fixed ;
                        bottom: 5px;
                        zIndex: 10000;
                        left: ${data.data.position === "left" && "-4px"};
                        right: ${data.data.position === "right" && "6px"};
                      }
                      @keyframes scaleIn2 {
                        0% {
                          transform: scale(1, 1);
                        }
                      
                        50% {
                          transform: scale(0.75, 0.75);
                        }
                      
                        100% {
                          transform: scale(1, 1);
                        }
                      }
                      @keyframes scaleOutButton {
                        0% {
                          opacity: 0.5;
                        }
                      
                        50% {
                          opacity: 0;
                        }
                      
                        100% {
                          opacity: 0.5;
                        }
                      }
                      `,
          }}
        />
        <div className="pulse-container-button ml-2">
          <div className="position-absolute">
            <div
              className="pulse-outer-circle-button"
              style={{ background: "rgba(0,0,0,0.4)" }}
            />
          </div>
          <div className="position-absolute">
            <div
              className="pulse-inner-circle-button"
              style={{ background: "rgba(0,0,0,0.4)" }}
            />
          </div>
        </div>
        <Fab
          mainButtonStyles={{
            backgroundColor: themeColor,
            border: "2px solid white",
          }}
          event={maxWidth768 ? "click" : "hover"}
          icon={<CallRoundedIcon />}
          style={{
            position: "fixed",
            bottom: -10,
            zIndex: 10000,
            left: data.data.position === "left" && -10,
            right: data.data.position === "right" && -10,
          }}
        >
          {data.data.contact_channels &&
            data.data.contact_channels.map((channel) => {
              if (
                channel.name !== ONLINE_SUPPROT_RAYCHAT &&
                channel.name !== ONLINE_SUPPROT_CRISP &&
                channel.status === ONLINE_SUPPORT_CHANNEL_IS_ACTIVE
              ) {
                const icon = contactChannelsInitialState.find(
                  (icon) => channel.name === icon.name
                )?.icon;
                return (
                  <button
                    onClick={() =>
                      dispatch(
                        callRequest(
                          { type: channel.name },
                          (window.location = channel.link)
                        )
                      )
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Action>
                      <LazyImage src={icon} width={55} height={55} />
                    </Action>
                  </button>
                );
              }
              if (
                channel.name === ONLINE_SUPPROT_RAYCHAT &&
                channel.status === ONLINE_SUPPORT_CHANNEL_IS_ACTIVE
              ) {
                const replacementCharacters = [
                  {
                    searchString: '<script type="text/javascript">',
                    replacementString: "",
                  },
                  {
                    searchString: "</script>",
                    replacementString: "",
                  },
                  {
                    searchString: "<!--BEGIN RAYCHAT CODE-->",
                    replacementString: "",
                  },
                  {
                    searchString: "<!--END RAYCHAT CODE-->",
                    replacementString: "",
                  },
                ];
                const mainScriptBetweenTwoTags = runReplacementExtraScript(
                  channel.link,
                  replacementCharacters
                );
                return (
                  <>
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
                      #raychatBtn {
                        display: none !important
                      }
                      .raychat_automessage_preview_container.right  {
                        display : none !important
                      }
                      #raychatFrame {
                        right : ${
                          data.data.position === "left" && "unset !important"
                        } ; 
                        left : ${data.data.position === "left" && "0px"};  
                        top : unset !important;
                        bottom : 0px !important
                      }
                      `,
                      }}
                    />
                    <script
                      type="text/javascript"
                      dangerouslySetInnerHTML={{
                        __html: mainScriptBetweenTwoTags,
                      }}
                    ></script>
                    <Action onClick={() => raychat_toggle_container()}>
                      <LazyImage src={channel.icon} />
                    </Action>
                  </>
                );
              }
              if (
                channel.name === ONLINE_SUPPROT_CRISP &&
                channel.status === ONLINE_SUPPORT_CHANNEL_IS_ACTIVE
              ) {
                const replacementCharacters = [
                  {
                    searchString: '<script type="text/javascript">',
                    replacementString: "",
                  },
                  {
                    searchString: "</script>",
                    replacementString: "",
                  },
                ];
                const mainScriptBetweenTwoTags = runReplacementExtraScript(
                  channel.link,
                  replacementCharacters
                );
                return (
                  <>
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
                        .crisp-client .cc-kv6t .cc-1xry .cc-unoo {
                        display: none !important
                      }
                      .crisp-client .cc-kv6t .cc-1xry .cc-ge4v, .crisp-client .cc-kv6t .cc-1xry .cc-unoo {
                        right:${
                          data.data.position === "right"
                            ? "24px !important"
                            : "unset !important"
                        } ;
                        left:${
                          data.data.position === "left"
                            ? "24px !important"
                            : "unset !important"
                        } 
                      }
                      `,
                      }}
                    />
                    <script
                      type="text/javascript"
                      dangerouslySetInnerHTML={{
                        __html: mainScriptBetweenTwoTags,
                      }}
                    ></script>
                    <Action onClick={() => $crisp.push(["do", "chat:toggle"])}>
                      <LazyImage src={channel.icon} />
                    </Action>
                  </>
                );
              }
            })}
        </Fab>
      </>
    ) : null;
  },
};
