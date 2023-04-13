import React, {memo, useEffect, useRef, useState} from "react";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";

import AdminSection from "@saas/components/AdminSection";
import {makeSelectUrlPrefix} from "@saas/stores/plugins/selector";
import {
    makeSelectBusiness,
    makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@saas/components/Map"), {
    ssr: false,
    loading: () => (
        <div style={{height: "800px", width: "100%", background: "#eeeeee"}}/>
    ),
});
import Paper from "@material-ui/core/Paper";
import {cement, coal, pollution} from "@saas/utils/colors";
import Cart from "./BranchCart";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import {GPS} from "@saas/icons";
import Icon from "@saas/components/Icon";
import Button from "@material-ui/core/Button";
import LocationAccessPopup from "@saas/components/LocationAccessPopup";
import {getDistance} from "@saas/utils/helpers/getDistance";

import Flickity from "@saas/components/Flickity";
import LazyImage from "@saas/components/LazyImage";
import {useResponsive} from "@saas/utils/hooks/useResponsive";


function Section47({
                       isDragging,
                       dragHandleProps,
                       isActive,
                       _updateSection,
                       isEditMode,
                       onClick,
                       customization = {},
                       content = {},
                       business,
                       themeColor,
                   }) {
    const {
        section_size: {main_width = "container"} = {},
        showing_branches: {has_ordering, show_image} = {},
    } = customization;
    const {buttons = []} = content;
    const {minWidth768} = useResponsive();
    const flkty = useRef(null);
    const flickityOptions = {
        rightToLeft: true,
        pageDots: false,
        cellAlign: "right",
        freeScroll: true,
        contain: true,
    };
    const dragging = useRef();

    const inputRef = useRef(null);
    const theme = useTheme();
    const mapRef = useRef(null);
    const [filters, setFilters] = useState("");
    const [businessBranches, setBusinessBranches] = useState(business?.branches);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [access, setAccess] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [slideIndex, setSlideIndex] = useState(null);
    const [selectedMarkerId, setSelectMarkerId] = useState(
        business.branches?.[0]?.id
    );
    const [hoveredMarkerId, setHoveredMarkerId] = useState(null);

    const mapOptions = {
        height: minWidth768 ? 600 : 550,
        width: "100%",
        center: {
            longitude: business.longitude,
            latitude: business.latitude,
        },
        markers: business.branches
            ?.filter((branch) => !branch?.extra_data?.labels?.includes("warehouse"))
            ?.map((branch) => ({
                latitude: +branch.latitude,
                longitude: +branch.longitude,
                markerId: branch.id,
                onClick: () => setSelectMarkerId(branch.id),
                onMouseOver: minWidth768
                    ? () => setHoveredMarkerId(branch.id)
                    : () => setSelectMarkerId(branch.id),
                onMouseOut: () => setHoveredMarkerId(null),
            })),
        selectedMarkerId: selectedMarkerId,
        hoveredMarkerId: hoveredMarkerId,
        themeColor,
        zoomControl: minWidth768,
        touchZoom: true,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        dragging: minWidth768,
        zoom: 11,
        ref: mapRef,
    };
    useEffect(() => {
        if (filters === "") {
            setBusinessBranches(business?.branches);
        } else {
            const filteredBranches = [];
            business.branches.forEach((branch) => {
                if (
                    branch.title?.includes(filters) ||
                    branch.address?.includes(filters)
                ) {
                    filteredBranches.push(branch);
                    setBusinessBranches(filteredBranches);
                }
            });
        }
    }, [filters]);

    const handleKeyPress = (event, value) => {
        if (event.key === "Enter") {
            setFilters(value);
        }
    };

    const getAccess = async () => {
        setAccess(true);
        setDialogOpen(false);
        const _location = await accessLocation();
        setUserLocation(_location);
        if (_location) {
            mapRef.current.setView({
                lat: _location.latitude,
                lng: _location.longitude,
            });
        }
    };
    const getPosition = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej, options);
        }).catch();
    };
    const accessLocation = async () => {
        const pos = await getPosition();
        if (pos) {
            const crd = pos.coords;
            const latitude = +crd.latitude.toFixed(7);
            const longitude = +crd.longitude.toFixed(7);
            return {latitude, longitude};
        }
        return null;
    };

    useEffect(() => {
        if (userLocation) {
            let minDistance = getDistance(
                userLocation.latitude,
                userLocation.longitude,
                business.branches[0].latitude,
                business.branches[0].longitude
            );
            let minBranchIndex = 0;
            business.branches.map((branch, i) => {
                const d = getDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    branch.latitude,
                    branch.longitude
                );
                if (d < minDistance) {
                    minDistance = d;
                    minBranchIndex = i;
                }
                return false;
            });
            setSlideIndex(minBranchIndex);
        }
    }, [userLocation]);

    useEffect(() => {
        if (typeof slideIndex === "number") {
            flkty?.current.select(slideIndex);
            setSelectMarkerId(business.branches[slideIndex].id);
            setSlideIndex(null);
        }
    }, [slideIndex]);
    useEffect(() => {
        if (typeof selectedMarkerId === "number") {
            const selectedBranchIndex = business.branches.findIndex(
                (branch) => selectedMarkerId === branch.id
            );
            flkty?.current.select(
                selectedBranchIndex !== 0 && minWidth768
                    ? selectedBranchIndex - 1
                    : selectedBranchIndex
            );
            setSlideIndex(null);
        }
    }, [selectedMarkerId]);
    return (
        <AdminSection
            isDragging={isDragging}
            dragHandleProps={dragHandleProps}
            isActive={isActive}
            _updateSection={_updateSection}
            isEditMode={!!isEditMode}
            onClick={onClick}
        >
            <div className={`my-2 ${main_width}`}>
                <Paper
                    elevation={1}
                    className="py-4"
                    style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
                >
                    <div
                        className={`u-fontWeightBold ${
                            minWidth768 ? "u-fontExteraLarge" : "u-fontLarge"
                        }`}
                        style={{color: coal}}
                    >
                        Choosing a branch
                    </div>
                </Paper>
                {dialogOpen && !minWidth768 && (
                    <LocationAccessPopup
                        themeColor={themeColor}
                        business={business}
                        onClose={() => setDialogOpen(false)}
                        getAccess={getAccess}
                    />
                )}
                <div className="position-relative">
                    <Map options={mapOptions} className="section25-type1-zoomControl"/>
                    <div className="d-flex align-items-center">
                        <div
                            className="position-absolute col-10 col-md-9 mx-1 mx-md-0 px-md-0"
                            style={{
                                top: 0,
                            }}
                        >
                            <div
                                style={{
                                    borderRadius: 8,
                                    height: minWidth768 ? 56 : 48,
                                }}
                                className="d-flex align-items-center mt-3 mt-md-5 mr-md-5 bg-white w-100"
                            >
                                <div
                                    onClick={() => {
                                        setFilters(inputRef.current.value);
                                    }}
                                    className="d-flex u-cursor-pointer"
                                >
                                    <SearchRoundedIcon
                                        className="mr-3"
                                        style={{color: cement}}
                                        fontSize="medium"
                                    />
                                </div>
                                <input
                                    type="text"
                                    ref={inputRef}
                                    className="w-100 u-fontLarge h-100 mr-2 search-input"
                                    placeholder="Search of the branch or address"
                                    onChange={(event) => {
                                        // if (event.target.value === "") {
                                        setFilters(event.target.value);
                                        // }
                                    }}
                                    onKeyDown={(event) =>
                                        handleKeyPress(event, inputRef.current.value)
                                    }
                                ></input>
                            </div>
                        </div>
                        {minWidth768 && (
                            <section
                                style={{
                                    width: 224,
                                    top: 0,
                                    left: 0,
                                    zIndex: 1000,
                                    background: theme.palette.background.default,
                                    height: 56,
                                    borderRadius: 8,
                                }}
                                className="col-3 position-absolute u-cursor-pointer px-3 mt-md-5 ml-md-5 d-flex flex-row-reverse align-items-center justify-content-between"
                            >
                                <div className="u-fontVeryLarge mr-2" style={{color: coal}}>
                                    The nearest branch to me
                                </div>
                                <Icon color={pollution} icon={GPS} width={25} height={25}/>
                            </section>
                        )}
                        {!minWidth768 && (
                            <section
                                style={{
                                    top: 0,
                                    left: 0,
                                    zIndex: 1000,
                                }}
                                className="col-2 pr-0 position-absolute mt-4"
                            >
                                <Button
                                    style={{
                                        minWidth: 46,
                                        borderRadius: "50%",
                                        background: theme.palette.background.default,
                                    }}
                                    className="p-2 c-btn-open-map"
                                    onClick={() => {
                                        if (access) getAccess();
                                        else setDialogOpen(true);
                                    }}
                                    variant="contained"
                                >
                                    <Icon color={pollution} icon={GPS} width={25} height={25}/>
                                </Button>
                            </section>
                        )}
                    </div>
                    <div className="position-absolute w-100" style={{bottom: 10}}>
                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
              .flickity-button {
                display: ${!minWidth768 && "none"};
              }
            `,
                            }}
                        />
                        {!minWidth768 && (
                            <Paper
                                elevation={1}
                                className="p-1 m-2 d-flex align-items-center"
                            >
                                <LazyImage
                                    src={`/images/twofinger.svg`}
                                    width={12}
                                    height={18}
                                />
                                <div
                                    style={{color: coal}}
                                    className="u-font-semi-small u-fontWeightBold mr-2"
                                >
                                    Use two fingers simultaneously to move on the map.
                                </div>
                            </Paper>
                        )}
                        <Flickity
                            className={`carousel px-2 branch-section-flickity-arrows ${
                                main_width === "container" && "container"
                            }`}
                            elementType="div"
                            options={flickityOptions}
                            disableImagesLoaded={false}
                            dragging={dragging}
                            flickityRef={flkty}
                        >
                            {businessBranches
                                ?.filter(
                                    (branch) => !branch?.extra_data?.labels?.includes("warehouse")
                                )
                                .map((branch) => {
                                    return (
                                        <Cart
                                            key={branch.id}
                                            branch={branch}
                                            showImage={show_image}
                                            hasOrdering={has_ordering}
                                            buttons={buttons}
                                            setHoveredMarkerId={setHoveredMarkerId}
                                            selectedMarkerId={selectedMarkerId}
                                            setSelectMarkerId={setSelectMarkerId}
                                            themeColor={themeColor}
                                        />
                                    );
                                })}
                        </Flickity>
                    </div>
                </div>
            </div>
        </AdminSection>
    );
}

const mapStateToProps = createStructuredSelector({
    urlPrefix: makeSelectUrlPrefix(),
    business: makeSelectBusiness(),
    themeColor: makeSelectBusinessThemeColor(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Section47);
