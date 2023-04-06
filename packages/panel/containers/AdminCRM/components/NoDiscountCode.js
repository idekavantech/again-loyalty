/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {memo} from "react";
import Button from "@material-ui/core/Button";
import {compose} from "redux";
import Paper from "@material-ui/core/Paper";
import {useRouter} from "next/router";
import {createStructuredSelector} from "reselect";
import {makeSelectAdminUrlPrefix} from "@saas/stores/plugins/selector";
import {connect} from "react-redux";


const percentage = `/images/percentage.svg`;

function NoDiscountCode({urlPrefix}) {
    const router = useRouter();

    return (
        <div>
            <div className="d-flex flex-column" style={{minHeight: "50vh"}}>
                <div className="my-4 text-center">
                    <img src={percentage} alt="box" style={{width: 64, height: 64}}/>
                </div>
                <div className="my-5 p-3 flex-1">
                    <div className="u-fontWeightBold u-fontLarge">
                        Automation marketing cannot be activated
                    </div>
                    <div className="mt-3">
                        In order to activate marketing automation it is necessary first to define discount code
                        do.
                    </div>
                </div>
                <Paper className="sticky-bottom p-3">
                    <Button
                        onClick={() => router.push(`${urlPrefix}crm/discount`)}
                        style={{width: "100%"}}
                        color="primary"
                        variant="contained"
                    >
                        Build a discount code
                    </Button>
                </Paper>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps() {
    return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NoDiscountCode);
