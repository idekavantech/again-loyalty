/**
 *
 * Footer
 *
 */

import React, {memo} from "react";
import {useRouter} from "next/router";

function Footer({businessName, isWhiteLabel, whiteLabelPluginData}) {
    const router = useRouter();
    return (
        <footer className="c-footer py-4 pb-2">
            <div className="container text-center u-fontSmall">
                <div className="mt-1 u-text-darkest-grey">
                    تمامی حقوق مادی و معنوی این سایت متعلق به
                    <strong
                        className="u-font-semi-small u-cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <i> {businessName} </i>
                    </strong>
                    می‌باشد.
                </div>
                {!isWhiteLabel && (
                    <div>
                        <div className="mt-2 u-fontWeightBold u-fontVerySmall mt-1 u-text-darkest-grey">
                            طراحی سایت با
                            <a
                                href="https://vitrin.me"
                                rel="nofollow"
                                className="mx-1 u-text-primary-blue-remove"
                                style={{color: "#0050FF"}}
                            >
                                ویترین
                            </a>
                        </div>
                        <div>
                            <a href="https://vitrin.me" rel="nofollow">
                                <img
                                    width={30}
                                    className="mr-1"
                                    src={`/images/vitrin-logo.png`}
                                    alt="ویترین"
                                />
                            </a>
                        </div>
                    </div>
                )}
                {isWhiteLabel && whiteLabelPluginData.agency && (
                    <div
                        className="d-flex align-items-center justify-content-center mt-2 u-fontWeightBold u-fontVerySmall mt-1 u-text-darkest-grey">
                        <div>طراحی شده توسط</div>
                        <strong className="u-fontWeightBold mx-1">
                            <i style={{fontSize: 12}}>{whiteLabelPluginData.agency}</i>
                        </strong>
                        {whiteLabelPluginData?.has_powered_by === false ? null : (
                            <>
                                <div>با استفاده از</div>
                                <a
                                    href="https://vitrin.me"
                                    className="mx-1 u-text-primary-blue-remove"
                                >
                                    ویترین
                                    <img
                                        width={30}
                                        className="mr-1"
                                        src={`/images/vitrin-logo.png`}
                                        alt="ویترین"
                                    />
                                </a>
                            </>
                        )}
                    </div>
                )}
            </div>
        </footer>
    );
}

export default memo(Footer);
