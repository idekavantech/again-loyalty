/* eslint-disable react/no-danger */
/* eslint-disable indent */

/**
 *
 * AdminCouriers
 *
 */

import React, {memo, useRef, useState} from "react";

import Head from "next/head";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {makeSelectLoading} from "@saas/stores/global/selectors";
import {
    makeSelectAdminUrlPrefix,
    makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import {makeSelectBusiness} from "@saas/stores/business/selector";
import {
    SHOPPING_PLUGIN,
    SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import useTheme from "@material-ui/core/styles/useTheme";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import MiareModal from "./containers/Modals/MiareModal";
import AlopeykModal from "./containers/Modals/AlopeykModal";
import {setPluginData} from "@saas/stores/plugins/actions";
import Button from "@material-ui/core/Button";
import DeleteCourierModal from "./containers/Modals/DeleteCourierModal";
import {englishNumberToPersianNumber} from "@saas/utils/helpers/englishNumberToPersianNumber";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import {icon} from "@saas/utils/colors";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import {useRouter} from "next/router";


const miareIcon = `/images/Miare.png`;
const alopeykIcon = `/images/Alopeyk.png`;

export function AdminCouriers({
                                  loading,
                                  pluginData,
                                  _setPluginData,
                                  urlPrefix,
                              }) {
    const theme = useTheme();
    const [miareToken, setMiareToken] = useState(
        pluginData.data?.deliverer_companies?.miare_api_token
    );
    const [alopeykToken, setAlopeykToken] = useState(
        pluginData.data?.deliverer_companies?.alopeyk_api_token
    );
    const couriers = pluginData.data?.couriers;
    const [isDeleteCourierModalOpen, setIsDeleteCourierModalOpen] =
        useState(false);
    const [selectedCourierId, selectCourierId] = useState(null);
    const [isMiareModalOpen, setIsMiareModalOpen] = useState(false);
    const [isAlopeykModalOpen, setIsAlopeykModalOpen] = useState(false);
    const [has_disable_miare_input, set_has_disable_miare_input] = useState(true);
    const [has_disable_alopeyk_input, set_has_disable_alopeyk_input] =
        useState(true);
    const router = useRouter();

    const deleteCourier = () => {
        const _couriers = {...couriers};
        delete _couriers[selectedCourierId];
        _setPluginData(SHOPPING_PLUGIN, {
            ...pluginData.data,
            couriers: _couriers,
        });
    };
    const miareInputRef = useRef(null);
    const aloPeykInputRef = useRef(null);

    return (
        <div>
            <Head>
                <title>Peak management</title>
            </Head>
            <MiareModal
                isOpen={isMiareModalOpen}
                onClose={() => setIsMiareModalOpen(false)}
            />
            <AlopeykModal
                isOpen={isAlopeykModalOpen}
                onClose={() => setIsAlopeykModalOpen(false)}
            />
            <DeleteCourierModal
                isOpen={isDeleteCourierModalOpen}
                onClose={() => {
                    setIsDeleteCourierModalOpen(false);
                    selectCourierId(null);
                }}
                submit={deleteCourier}
            />
            <div className="container">
                <AdminBreadCrumb isLoading={loading} responsive={false}/>
            </div>
            <div className="container mt-3">
                <Paper className="p-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="u-fontLarge">Shipping Services</div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                className="mr-3"
                                onClick={() => {
                                    _setPluginData(SHOPPING_PLUGIN, {
                                        ...pluginData.data,
                                        deliverer_companies: {
                                            ...(pluginData.data?.deliverer_companies || {}),
                                            alopeyk_api_token: alopeykToken,
                                            miare_api_token: miareToken,
                                        },
                                    });
                                }}
                                disabled={loading}
                            >
                                Store
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex mt-5 justify-content-between align-items-center">
                        <div className="flex-1">
                            <div className="d-flex mb-2 align-items-center">
                                <img
                                    src={miareIcon}
                                    alt="miare"
                                    style={{width: 24}}
                                    className="ml-2"
                                />
                                <span style={{fontSize: 14}}>The token is serving</span>

                                <HelpRoundedIcon
                                    onClick={() => setIsMiareModalOpen(true)}
                                    className="mr-2"
                                    style={{width: 15.5, color: "gray", cursor: "pointer"}}
                                />
                            </div>
                            <div className="d-flex">
                                <input
                                    ref={miareInputRef}
                                    type="text"
                                    value={miareToken}
                                    size="medium"
                                    placeholder="The token service comes"
                                    className="admin_couriers_input"
                                    onChange={(e) => setMiareToken(e.target.value)}
                                    disabled={has_disable_miare_input}
                                />
                                <Button
                                    variant="outlined"
                                    className="mx-1"
                                    style={{
                                        padding: 19,
                                        maxWidth: 10.5,
                                        minWidth: 10.5,
                                        minHeight: 10.5,
                                        maxHeight: 10.5,
                                        borderColor: "#E4E6E7",
                                    }}
                                    disabled={loading}
                                    onClick={() => {
                                        set_has_disable_miare_input(false);
                                        miareInputRef.current.focus();
                                    }}
                                >
                                    <EditIcon style={{color: theme.palette.primary.main}}/>
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 mr-3">
                            <div className="d-flex mb-2 align-items-center">
                                <img
                                    src={alopeykIcon}
                                    alt="alopeyk"
                                    style={{width: 24}}
                                    className="ml-2"
                                />
                                <span style={{fontSize: 14}}>Alopic Service Token</span>
                                <HelpRoundedIcon
                                    onClick={() => setIsAlopeykModalOpen(true)}
                                    className="mr-2"
                                    style={{width: 15.5, color: "gray", cursor: "pointer"}}
                                />
                            </div>
                            <div className="d-flex">
                                <input
                                    ref={aloPeykInputRef}
                                    type="text"
                                    size="medium"
                                    placeholder="Alopic token service"
                                    value={alopeykToken}
                                    className="admin_couriers_input"
                                    border="none"
                                    onChange={(e) => setAlopeykToken(e.target.value)}
                                    disabled={has_disable_alopeyk_input}
                                />
                                <Button
                                    variant="outlined"
                                    className="mx-1"
                                    style={{
                                        padding: 19,
                                        maxWidth: 10.5,
                                        minWidth: 10.5,
                                        minHeight: 10.5,
                                        maxHeight: 10.5,
                                        borderColor: "#E4E6E7",
                                    }}
                                    disabled={loading}
                                    onClick={() => {
                                        set_has_disable_alopeyk_input(false);
                                        aloPeykInputRef.current.focus();
                                    }}
                                >
                                    <EditIcon style={{color: theme.palette.primary.main}}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
                <Paper className="mt-3 p-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="u-fontLarge font-weight-bold">Personal peaks</div>
                        <div className="u-fontLarge">
                            <Button
                                variant="contained"
                                color="primary"
                                className="mr-3"
                                onClick={() =>
                                    router.push(
                                        `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/couriers/new`
                                    )
                                }
                                disabled={loading}
                            >
                                <Add/>
                                <span className="pr-2"> Making a new courier</span>
                            </Button>
                        </div>
                    </div>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow style={{height: 50}}>
                                    <TableCell align="right" width="40%">
                                        Courier name
                                    </TableCell>
                                    <TableCell
                                        className="text-nowrap"
                                        align="right"
                                        style={{fontWeight: 600}}
                                    >
                                        Phone number
                                    </TableCell>
                                    <TableCell
                                        className="text-nowrap"
                                        align="right"
                                        style={{fontWeight: 600}}
                                    >
                                        Send records
                                    </TableCell>
                                    <TableCell
                                        className="text-nowrap"
                                        align="right"
                                        style={{fontWeight: 600}}
                                    ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {couriers &&
                                    Object.entries(couriers)?.map(([courier_id, courier]) => (
                                        <TableRow
                                            hover
                                            key={courier.phone}
                                            style={{
                                                cursor: "pointer",
                                                borderTop: "1px solid #F0F2F3",
                                            }}
                                            onClick={() => {
                                                selectCourierId(courier_id);
                                                // setIsCourierModalOpen(true);
                                            }}
                                        >
                                            <TableCell align="right" className="py-3">
                                                <img
                                                    style={{
                                                        borderRadius: 4,
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                    className="ml-2"
                                                    src={
                                                        courier?.image ||
                                                        `https://hs3-cdn-saas.behtarino.com/static/images/default_deal.jpg`
                                                    }
                                                    alt="Showcase"
                                                />

                                                <span>{courier.name}</span>
                                            </TableCell>

                                            <TableCell align="right" className="py-3">
                                                {englishNumberToPersianNumber(courier.phone)}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className="py-3"
                                                style={{
                                                    color: theme.palette.primary.main,
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    router.push(
                                                        `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/courier-records?courier=${courier_id}`
                                                    );
                                                }}
                                            >
                                                View records
                                            </TableCell>
                                            <TableCell align="left" className="py-3">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => {
                                                        router.push(
                                                            `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/couriers/${courier_id}`
                                                        );
                                                    }}
                                                    style={{
                                                        padding: 20,
                                                        maxWidth: 10.5,
                                                        minWidth: 10.5,
                                                        minHeight: 10.5,
                                                        maxHeight: 10.5,
                                                        borderColor: "#E4E6E7",
                                                    }}
                                                    disabled={loading}
                                                >
                                                    <EditIcon
                                                        style={{color: theme.palette.primary.main}}
                                                    />
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    className="mr-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        selectCourierId(courier_id);
                                                        setIsDeleteCourierModalOpen(true);
                                                    }}
                                                    style={{
                                                        padding: 20,
                                                        maxWidth: 10.5,
                                                        minWidth: 10.5,
                                                        minHeight: 10.5,
                                                        maxHeight: 10.5,
                                                        borderColor: "#E4E6E7",
                                                    }}
                                                    disabled={loading}
                                                >
                                                    <DeleteIcon style={{color: icon.default}}/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    urlPrefix: makeSelectAdminUrlPrefix(),
    business: makeSelectBusiness(),
    pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
});

function mapDispatchToProps(dispatch) {
    return {
        _setPluginData: (plugin, data) => dispatch(setPluginData(plugin, data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminCouriers);
