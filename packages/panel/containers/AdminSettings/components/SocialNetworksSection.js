import React, { memo } from "react";
import { night } from "@saas/utils/colors";
import { socialInputsPrefix } from "./SocialInputsConstants";
import Paper from "@material-ui/core/Paper";
import SocialInputs from "./SocialInputs";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";


function SocialNetworksSection({
  instagram,
  telegram,
  linkedin,
  whatsapp,
  twitter,
  facebook,
  aparat,
  youtube,
  changeInstagram,
  changeTelegram,
  changeLinkedin,
  changeWhatsapp,
  changeTwitter,
  changeFacebook,
  changeAparat,
  changeYoutube,
  socialErrors,
  validationSocialNetwork,
  socialNetworkRef,
}) {
  return (
    <Paper elevation={1} className=" mt-3 py-3 " ref={socialNetworkRef}>
      <span className="anchor" id="social-media" />
      <div className="col-12 u-fontLarge mb-3" style={{ color: night }}>
        شبکه اجتماعی
      </div>
      <p className="col-12">
        اطلاعات شبکه های اجتماعی در بخش فوتر سایت تان نمایش داده می شود تا
        بازدیدکنندگان سایت بتوانند راه های ارتباطی شما یا کانال های محتوایی
        مرتبط را پیدا کنند.
      </p>
      <div className="d-flex flex-wrap ">
        <div className="col-12 col-lg-6 mt-4">
          <SocialInputs
            socialPlaceholder={socialInputsPrefix.instagram.placeHolder}
            socialIcon={InstagramIcon}
            value={instagram}
            onChange={changeInstagram}
            onBlur={() =>
              validationSocialNetwork(
                socialInputsPrefix.instagram.link,
                "instagram",
                instagram
              )
            }
            error={socialErrors.instagram}
          />
        </div>
        <div className="col-12 col-lg-6 mt-4 ">
          <SocialInputs
            socialPlaceholder={socialInputsPrefix.whatsapp.placeHolder}
            socialIcon={WhatsAppIcon}
            value={whatsapp}
            onChange={changeWhatsapp}
            onBlur={() =>
              validationSocialNetwork(
                socialInputsPrefix.whatsapp.link,
                "whatsapp",
                whatsapp
              )
            }
            error={socialErrors.whatsapp}
          />
        </div>
        <div className="col-12 col-lg-6 mt-4">
          <SocialInputs
            socialPlaceholder={socialInputsPrefix.telegram.placeHolder}
            socialIcon={TelegramIcon}
            value={telegram}
            onChange={changeTelegram}
            onBlur={() =>
              validationSocialNetwork(
                socialInputsPrefix.telegram.link,
                "telegram",
                telegram
              )
            }
            error={socialErrors.telegram}
          />
        </div>
        <div className="col-12 col-lg-6 mt-4">
          <SocialInputs
            socialPlaceholder={socialInputsPrefix.linkedin.placeHolder}
            socialIcon={LinkedInIcon}
            value={linkedin}
            onChange={changeLinkedin}
            onBlur={() =>
              validationSocialNetwork(
                socialInputsPrefix.linkedin.link,
                "linkedin",
                linkedin
              )
            }
            error={socialErrors.linkedin}
          />
        </div>
        <div className="col-12 col-lg-6 mt-4">
          <SocialInputs
            socialPlaceholder={socialInputsPrefix.youtube.placeHolder}
            socialIcon={YouTubeIcon}
            value={youtube}
            onChange={changeYoutube}
            onBlur={() =>
              validationSocialNetwork(
                socialInputsPrefix.youtube.link,
                "youtube",
                youtube
              )
            }
            error={socialErrors.youtube}
          />
        </div>
        <div className="col-12 col-lg-6 mt-4">
          <SocialInputs
            socialPlaceholder={socialInputsPrefix.facebook.placeHolder}
            socialIcon={FacebookIcon}
            value={facebook}
            onChange={changeFacebook}
            onBlur={() =>
              validationSocialNetwork(
                socialInputsPrefix.facebook.link,
                "facebook",
                facebook
              )
            }
            error={socialErrors.facebook}
          />
        </div>

        <div className="col-12 col-lg-6 mt-4">
          <SocialInputs
            socialPlaceholder={socialInputsPrefix.twitter.placeHolder}
            socialIcon={TwitterIcon}
            value={twitter}
            onChange={changeTwitter}
            onBlur={() =>
              validationSocialNetwork(
                socialInputsPrefix.twitter.link,
                "twitter",
                twitter
              )
            }
            error={socialErrors.twitter}
          />
        </div>
        <div className="col-12 col-lg-6 mt-4 ">
          <TextField
            className="w-100"
            value={aparat}
            onChange={(event) => changeAparat(event.target.value)}
            placeholder={socialInputsPrefix.aparat.placeHolder}
            variant="outlined"
            onBlur={() =>
              validationSocialNetwork(
                socialInputsPrefix.aparat.link,
                "aparat",
                aparat
              )
            }
            error={socialErrors.aparat}
            helperText={socialErrors.aparat}
            InputProps={{
              className: "medium",
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>
                    <img alt="" src={`/images/aparat.svg`} />
                  </Icon>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </Paper>
  );
}

export default memo(SocialNetworksSection);
