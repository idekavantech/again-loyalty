import React, {memo} from "react";

const promotionText = `/images/promotion-text.png`;
const promotionIcon = `/images/promotion-icon.png`;
import LazyImage from "@saas/components/LazyImage";
import {useResponsive} from "@saas/utils/hooks/useResponsive";


function VitrinPromotionSection() {
    const {maxWidth768} = useResponsive();
    if (maxWidth768)
        return (
            <a
                href="https://vitrin.me"
                style={{marginLeft: 1}}
                className="u-border-primary-blue d-block text-center promotion-card u-fontWeightBold"
            >
                <div className="container d-flex py-4 justify-content-around align-items-center">
                    <div>
                        <div className="u-text-black">Website design with showcase</div>
                        <LazyImage
                            style={{
                                width: 163,
                                height: 20,
                                objectFit: "contain",
                                marginTop: 1,
                            }}
                            src={promotionText}
                            alt="promotion-text"
                        />
                        <div className="u-text-darkest-grey" style={{marginTop: 8}}>
                            Professional in less than 2 hours!
                        </div>
                    </div>
                    <LazyImage
                        style={{width: 114, height: 70, objectFit: "contain"}}
                        src={promotionIcon}
                        alt="promotion-icon"
                    />
                </div>
            </a>
        );
    return (
        <a
            href="https://vitrin.me"
            style={{marginLeft: 1}}
            className="u-border-primary-blue d-block text-center promotion-card u-fontWeightBold"
        >
            <div className="container d-flex py-4 justify-content-around align-items-center">
                <div>
                    <div className="u-text-black u-font-largest">
                        Website design with showcase
                    </div>
                    <div
                        className="u-text-darkest-grey u-fontVeryLarge"
                        style={{marginTop: 8}}
                    >
                        Professional in less than 2 hours!
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <LazyImage
                        style={{
                            width: 256,
                            height: 33,
                            objectFit: "contain",
                            marginTop: 1,
                        }}
                        src={promotionText}
                        alt="promotion-text"
                    />
                    <LazyImage
                        style={{width: 114, height: 70, objectFit: "contain"}}
                        src={promotionIcon}
                        alt="promotion-icon"
                    />
                </div>
            </div>
        </a>
    );
}

export default memo(VitrinPromotionSection);
