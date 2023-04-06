import {useMemo} from "react";

import {
    FULFILLMENT_CARRY_OUT,
    FULFILLMENT_ON_BUSINESS_SITE,
    FULFILLMENT_ON_CAR,
    FULFILLMENT_ON_USER_SITE,
    FULFILLMENT_ON_WEBSITE,
} from "@saas/plugins/Shopping/constants";
import {PERSONAL_VITRIN_SALES_CHANNEL} from "@saas/stores/plugins/constants";


export const useFulfillmentTypes = (basePluginData) => {
    const customizedFulfillmentTypes =
        basePluginData?.salesChannels &&
        Object.keys(basePluginData?.salesChannels)
            .filter(
                (item) =>
                    basePluginData?.salesChannels?.[item]?.data?.type ===
                    PERSONAL_VITRIN_SALES_CHANNEL
            )
            .map((item) => {
                return basePluginData?.salesChannels?.[item]?.data?.fulfillment_types;
            })[0];
    const fulfillmentTypes = useMemo(() => {
        return [
            {
                id: 1,
                name: FULFILLMENT_ON_BUSINESS_SITE,
                title:
                    customizedFulfillmentTypes?.[
                        FULFILLMENT_ON_BUSINESS_SITE.toLowerCase()
                        ]?.title || "سرو در محل",
                description:
                    customizedFulfillmentTypes?.[
                        FULFILLMENT_ON_BUSINESS_SITE.toLowerCase()
                        ]?.description || "سرو غذای مورد نظر در فضای رستوران",

                icon: `/images/serve.svg`,
            },
            {
                id: 2,
                name: FULFILLMENT_CARRY_OUT,
                title:
                    customizedFulfillmentTypes?.[FULFILLMENT_CARRY_OUT.toLowerCase()]
                        ?.title || "تحویل حضوری در محل کسب‌و‌کار",
                description:
                    customizedFulfillmentTypes?.[FULFILLMENT_CARRY_OUT.toLowerCase()]
                        ?.description || "دریافت سفارش در محل کسب و کار",

                icon: `/images/pickup.svg`,
            },
            {
                id: 3,
                name: FULFILLMENT_ON_CAR,

                title:
                    customizedFulfillmentTypes?.[FULFILLMENT_ON_CAR.toLowerCase()]
                        ?.title || "تحویل حضوری در ماشین",
                description:
                    customizedFulfillmentTypes?.[FULFILLMENT_ON_CAR.toLowerCase()]
                        ?.description || "دریافت سفارش در محل کسب و کار در ماشین",

                icon: `/images/deliveryByCar.svg`,
            },
            {
                id: 4,
                name: FULFILLMENT_ON_USER_SITE,
                title:
                    customizedFulfillmentTypes?.[FULFILLMENT_ON_USER_SITE.toLowerCase()]
                        ?.title || "ارسال",
                description:
                    customizedFulfillmentTypes?.[FULFILLMENT_ON_USER_SITE.toLowerCase()]
                        ?.description || "ارسال سفارش به آدرس شما",

                icon: `/images/deliverToCustomer.svg`,
            },
            {
                id: 5,
                name: FULFILLMENT_ON_WEBSITE,
                title:
                    customizedFulfillmentTypes?.[FULFILLMENT_ON_WEBSITE.toLowerCase()]
                        ?.title || "دریافت مجازی",
                description:
                    customizedFulfillmentTypes?.[FULFILLMENT_ON_WEBSITE.toLowerCase()]
                        ?.description ||
                    "دریافت سفارش در فضای مجازی مانند تلگرام، واتس آپ و یا تماس تلفنی",

                icon: `/images/deliverToCustomer.svg`,
            },
        ];
    }, [customizedFulfillmentTypes]);
    return {
        fulfillmentTypes,
    };
};
