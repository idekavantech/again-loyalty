/**
 *
 * Wallet
 *
 */

import React, {memo, useEffect, useState} from "react";
import {connect} from "react-redux";
import Head from "next/head";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import moment from "moment-jalaali";
import Button from "@material-ui/core/Button";
import {getSelfMembership} from "@saas/stores/user/actions";
import {
    makeSelectUser,
    makeSelectWalletTransactions,
} from "@saas/stores/user/selector";
import {noOp} from "@saas/utils/helpers/noOp";
import {priceFormatter} from "@saas/utils/helpers/priceFormatter";
import {englishNumberToPersianNumber} from "@saas/utils/helpers/englishNumberToPersianNumber";

import {
    makeSelectBusiness,
    makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";
import Modal from "@saas/components/Modal";
import Icon from "@saas/components/Icon";
import {GIFT_WITH_STARS} from "@saas/icons";


const back1 = `/images/wallet-back-1.png`;
const back2 = `/images/wallet-back-2.png`;

export function Wallet({
                           _getSelfMembership,
                           user,
                           themeColor,
                           transactions,
                           business,
                       }) {
    useEffect(() => {
        if (localStorage.getItem("giftReceived")) {
            setGiftModal(true);
            localStorage.removeItem("giftReceived");
        }
        setTimeout(() => _getSelfMembership(), 0);
    }, []);
    const [giftModal, setGiftModal] = useState(false);
    return (
        <div>
            <Modal
                onClose={noOp}
                isOpen={giftModal}
                body={
                    <div
                        className="flex-1 d-flex flex-column u-border-radius-4"
                        style={{minHeight: 270, maxWidth: 360}}
                    >
                        <div/>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <Icon
                                icon={GIFT_WITH_STARS}
                                width={95}
                                height={78}
                                color={themeColor}
                            />
                            <div className="u-fontWeightBold u-text-black">
                                اعتبار هدیه شما فعال شد.
                            </div>
                            <div className="u-fontMedium text-center px-4 u-lineHeight-30 mt-3">
                                با داشتن اعتبار هدیه می‌توانید در هنگام ثبت سفارش تخفیف بگیرید.
                            </div>
                        </div>
                        <Button
                            onClick={() => setGiftModal(false)}
                            className="u-fontWeightBold mr-auto fit-content"
                            color="secondary"
                            variant="contained"
                        >
                            فهمیدم
                        </Button>
                    </div>
                }
            />
            <Head>
                <title>کیف پول</title>
                <meta name="description" content="کیف پول"/>
                <meta name="robots" content="noindex"/>
            </Head>
            <div className="pb-5">
                <div className=" u-borderBottom">
                    <div className="mx-auto col-12 col-xl-3 col-md-6 u-text-dark-grey u-fontMedium text-center">
                        <div className=" pb-3 pt-2 container">
                            کیف پول {business.revised_title}
                        </div>
                    </div>
                </div>
                <div className="container text-center px-0 mt-2 col-12 col-xl-3 col-md-6">
                    <div
                        className="d-flex flex-column align-items-center justify-content-center px-3 py-4 u-border-radius-8 position-relative u-text-white"
                        style={{height: 210, backgroundColor: themeColor}}
                    >
                        <div className="u-fontWeightBold">اعتبار هدیه:</div>
                        <img
                            className="position-absolute left-0 bottom-0"
                            alt="back-1"
                            src={back1}
                        />
                        <img
                            className="position-absolute u-top-0 right-0"
                            alt="back-2"
                            src={back2}
                        />
                        <div className="d-flex align-items-center mt-2">
                            <div className="u-fontWeightBold u-fontLarge">
                                {user && priceFormatter(Math.abs(user.giftCredit))}
                            </div>
                            <div className="mr-1">تومان</div>
                            <div className="u-font-largest mt-1">
                                {user && user.gift_credit > 0 && "+"}
                                {user && user.gift_credit < 0 && "-"}
                            </div>
                        </div>
                    </div>
                    {transactions && transactions.length ? (
                        <div className="mt-3 pr-3">
                            <div className="d-flex align-items-center flex-column fit-content">
                                <div className="mb-1 u-text-black u-fontWeightBold">
                                    تراکنش‌ها
                                </div>
                                <div
                                    style={{
                                        backgroundColor: themeColor,
                                        borderRadius: 1.5,
                                        height: 3,
                                        width: 30,
                                    }}
                                />
                            </div>
                            <div className="d-flex u-text-black u-fontWeightBold mt-3 mb-3">
                                <div className="col-2 px-0">تاریخ</div>
                                <div className="col-7 px-0">مبلغ تراکنش</div>
                                <div className="col-3 px-0">مبلغ مانده</div>
                            </div>
                            {transactions.map((transaction) => (
                                <div
                                    className="d-flex mt-1 align-items-center"
                                    key={transaction.created_at}
                                >
                                    <div className="col-2 px-0">
                                        {englishNumberToPersianNumber(
                                            moment(transaction.created_at).format("jYYYY/jM/jD")
                                        )}
                                    </div>
                                    <div className="d-flex col-7 px-0 align-items-center justify-content-center">
                                        <div className="u-fontWeightBold u-fontLarge">
                                            {priceFormatter(Math.abs(transaction.amount))}
                                        </div>
                                        <div className="mr-1">تومان</div>
                                        <div
                                            className="u-fontVeryLarge mr-2"
                                            style={{marginTop: 2}}
                                        >
                                            {transaction.amount > 0 && "+"}
                                            {transaction.amount < 0 && "-"}
                                        </div>
                                    </div>
                                    <div className="col-3 px-0">
                    <span className="u-fontWeightBold">
                      {priceFormatter(transaction.balance)}
                    </span>{" "}
                                        <span>تومان</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    transactions: makeSelectWalletTransactions(),
    themeColor: makeSelectBusinessThemeColor(),
    user: makeSelectUser(),
    business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
    return {
        _getSelfMembership: () => dispatch(getSelfMembership()),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Wallet);
