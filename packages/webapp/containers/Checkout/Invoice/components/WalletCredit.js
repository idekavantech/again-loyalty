import React, {memo} from "react";

import LazyImage from "@saas/components/LazyImage";
import {coal, smoke} from "@saas/utils/colors";
import {priceFormatter} from "@saas/utils/helpers/priceFormatter";
import {$} from "@saas/icons";
import Icon from "@saas/components/Icon";
import {useResponsive} from "@saas/utils/hooks/useResponsive";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import useTheme from "@material-ui/core/styles/useTheme";


function WalletCredit({walletCredit, isUsingWallet, setIsUsingWallet}) {
    const theme = useTheme();
    const {minWidth768} = useResponsive();
    return (
        <Paper elevation={1} className="mt-4">
            <div className="px-4 py-3 align-items-center justify-content-between u-cursor-pointer checkout-collapse">
                <div className="d-flex align-items-center">
                    <LazyImage
                        src={`/images/wallet.svg`}
                        width={24}
                        height={24}
                        className="ml-2"
                    />
                    <div>
                        <div
                            className="u-fontMedium u-fontWeightBold"
                            style={{color: coal}}
                        >
                            کیف پول
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        border: "1px solid #EDEDED",
                        borderRadius: 8,
                        width: minWidth768 && "50%",
                        height: 40,
                    }}
                    className="d-flex align-items-center justify-content-between mt-3 mx-4 pr-2 pl-1 mb-3"
                >
                    <div className="d-flex align-items-center mr-1">
                        <div className="u-fontNormal" style={{color: smoke}}>
                            اعتبار کیف پول شما:
                        </div>
                        <div
                            className="u-fontNormal"
                            style={{color: theme.palette.secondary.main}}
                        >
                            &nbsp;{priceFormatter(walletCredit)}
                            &nbsp;
                            <Icon
                                icon={$}
                                width={21}
                                height={21}
                                color={theme.palette.secondary.main}
                            />
                        </div>
                    </div>
                    <Switch
                        checked={isUsingWallet}
                        onChange={(event) => setIsUsingWallet(event.target.checked)}
                        name="checkedA"
                        inputProps={{"aria-label": "secondary checkbox"}}
                    />
                </div>
            </div>
            {!isUsingWallet && (
                <>
                    <Divider className="mb-3"/>
                    <div className="u-font-semi-small px-4 pb-3" style={{color: smoke}}>
                        برای اعمال شدن اعتبار کیف پول باید آن را فعال نمایید.
                    </div>
                </>
            )}
        </Paper>
    );
}

export default memo(WalletCredit);
