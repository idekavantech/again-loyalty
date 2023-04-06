/**
 *
 * DownloadApp
 *
 */

import React, {memo, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Paper from "@material-ui/core/Paper";
import {createStructuredSelector} from "reselect";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";

const ios = `/images/ios-button.png`;
const android = `/images/android-button.png`;
import AndroidModal from "../../components/AndroidModal";
import IosModal from "../../components/IosModal";
import {makeSelectBusiness} from "@saas/stores/business/selector";
import {noOp} from "@saas/utils/helpers/noOp";


export function DownloadApp({business}) {
    const [iosModal, setIosModal] = useState(false);
    const [androidModal, setAndroidModal] = useState(false);
    return (
        <Paper
            style={{minHeight: "80vh"}}
            elevation={2}
            className="d-flex p-3 my-5 flex-column justify-content-center align-items-center w-100"
        >
            <IosModal
                isOpen={iosModal}
                onClose={() => setIosModal(false)}
                business={business}
            />
            <AndroidModal
                isOpen={androidModal}
                onClose={() => setAndroidModal(false)}
            />

            <div
                style={{padding: 40}}
                className="d-flex justify-content-center align-items-center"
            >
                <AddToHomeScreenIcon color="text.primary" style={{fontSize: 70}}/>
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        lineHeight: "24px",
                    }}
                >
                    <div>نصب</div>
                    <div>اپلیکیشن</div>
                </div>
            </div>

            <div className="flex-1">
                <div className="mb-5" style={{fontSize: "14px", fontWeight: "bold"}}>
                    وب اپلیکیشن {business.revised_title} امکانات زیر را در اختیار شما قرار
                    می‌دهد.
                </div>
                <div className="d-flex justify-content-start align-items-start my-2">
                    <CheckRoundedIcon fontSize="small" className="ml-2"/>
                    <div>کارایی بهتر</div>
                </div>
                <div className="d-flex justify-content-start align-items-start my-2">
                    <CheckRoundedIcon fontSize="small" className="ml-2"/>
                    <div>دسترسی آسان‌تر</div>
                </div>
                <div className="d-flex justify-content-start align-items-start my-2">
                    <CheckRoundedIcon fontSize="small" className="ml-2"/>
                    <div>سرعت و عملکرد بالا</div>
                </div>
                <div className="d-flex justify-content-start align-items-start my-2">
                    <CheckRoundedIcon fontSize="small" className="ml-2"/>
                    <div>اضافه شدن سایت به عنوان اپلیکیشن به صفحه موبایل شما</div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div
                    className="flex-1 mx-1"
                    onClick={() => {
                        if (window.deferredPrompt) window.deferredPrompt.prompt();
                        setAndroidModal(true);
                    }}
                    onKeyDown={noOp}
                    role="button"
                    tabIndex="0"
                >
                    <img
                        className="w-100"
                        src={android}
                        alt={business.revised_title}
                    />
                </div>
                <div
                    className="flex-1 mx-1"
                    onClick={() => setIosModal(true)}
                    onKeyDown={noOp}
                    role="button"
                    tabIndex="0"
                >
                    <img
                        className="w-100"
                        src={ios}
                        alt={business.revised_title}
                    />
                </div>
            </div>
        </Paper>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const mapStateToProps = createStructuredSelector({
    business: makeSelectBusiness(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DownloadApp);
