export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

export const INCLUDED_WEBAPPS_ONLY_KEY = "INCLUDED_WEBAPPS";
export const VITRIN_WEBAPP_CONSTANT = "VITRIN";
export const DARAMAD_WEBAPP_CONSTANT = "DARAMAD";
export const DOBARE_WEBAPP_CONSTANT = "DOBARE";

export const VITRIN_TOKEN = "VITRIN_TOKEN";
export const VITRIN_REFRESH_TOKEN = "VITRIN_REFRESH_TOKEN";

export const UTM_DATA_SESSION_STORAGE = "utm_data";

export const IS_DENIED_NOTIFICATION_ALERT_SENT =
  "IS_DENIED_NOTIFICATION_ALERT_SENT";

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const WEBAPP_URLS = `admin.test.${process.env.NEXT_PUBLIC_SITE_DOMAIN}.ir.ink,staging.${process.env.NEXT_PUBLIC_SITE_DOMAIN}.ir.ink,${process.env.NEXT_PUBLIC_SITE_DOMAIN}.me`;
export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
