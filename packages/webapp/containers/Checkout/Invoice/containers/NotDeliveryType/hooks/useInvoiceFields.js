import React, {useState} from "react";

import {
    FULFILLMENT_ON_BUSINESS_SITE,
    FULFILLMENT_ON_CAR,
} from "@saas/plugins/Shopping/constants";
import {
    alphabets,
    carTagFlag,
    carTagIran,
} from "containers/Checkout/Invoice/containers/NotDeliveryType/constants";
import {coal} from "@saas/utils/colors";
import {persianToEnglishNumber} from "@saas/utils/helpers/persianToEnglishNumber";

export const useInvoiceFields = (
    car,
    setCar,
    tableNumber,
    setTableNumber,
    invoiceFields,
    themeColor
) => {
    const [errors, setErrors] = useState([
        {
            type: "",
            text: "",
        },
    ]);
    const invoiceFieldsConstant = {
        [FULFILLMENT_ON_CAR]: {
            title: "اطلاعات خودرو",
            plate_number: {
                id: 0,
                is_required: invoiceFields?.delivery_on_car?.plate_number?.is_required,
                fieldRenderer: (
                    <div
                        className="d-flex carTagContainer align-items-center mb-3 mb-lg-0"
                        style={{
                            height: 50,
                            padding: 0,
                        }}
                    >
                        <div
                            className="d-flex position-relative justify-content-center align-items-center"
                            style={{
                                border: "2px solid black",
                                borderRadius: "0 5px 5px 0",
                                width: "35%",
                                height: "100%",
                            }}
                        >
                            <img
                                alt=""
                                src={carTagIran}
                                style={{
                                    position: "absolute",
                                    top: 1,
                                    width: "70%",
                                    maxWidth: "60px",
                                }}
                            />
                            <input
                                type="text"
                                className="text-center carInput px-1 py-2"
                                placeholder="33"
                                value={car?.cityOfTag}
                                onChange={(event) => {
                                    setCar({
                                        ...car,
                                        cityOfTag: event.target.value,
                                    });
                                }}
                                style={{width: "70%", height: "36px"}}
                                maxLength="2"
                                minLength="2"
                            />
                        </div>

                        <div
                            className="d-flex position-relative align-items-center"
                            style={{
                                borderTop: "2px solid black",
                                borderBottom: "2px solid black",
                                borderLeft: "2px solid black",
                                borderRadius: "5px 0px 0px 5px",
                                height: 50,
                            }}
                        >
                            <div
                                className="d-flex justify-content-between"
                                style={{
                                    width: "100%",
                                    transform: "translate(-10%, 0%)",
                                }}
                            >
                                <input
                                    type="text"
                                    className="text-center carInput px-1 py-2"
                                    placeholder="333"
                                    value={car?.seccondPartOfTag}
                                    onChange={(event) => {
                                        setCar({
                                            ...car,
                                            seccondPartOfTag: event.target.value,
                                        });
                                    }}
                                    style={{width: "30%", height: "36px"}}
                                    maxLength="3"
                                    minLength="3"
                                />
                                <select
                                    className="carInput px-1 py-2"
                                    style={{width: "40%", height: "36px"}}
                                    value={car?.letterOfTag}
                                    onChange={(event) => {
                                        setCar({
                                            ...car,
                                            letterOfTag: event.target.value,
                                        });
                                    }}
                                    placeholder="انتخاب کد"
                                >
                                    {alphabets.map((alphabetLetter) => (
                                        <option key={alphabetLetter} value={alphabetLetter}>
                                            {alphabetLetter}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className="text-center carInput px-1 py-2"
                                    placeholder="33"
                                    value={car?.firstPartOfTag}
                                    onChange={(event) => {
                                        setCar({
                                            ...car,
                                            firstPartOfTag: event.target.value,
                                        });
                                    }}
                                    maxLength="2"
                                    minLength="2"
                                    style={{width: "25%", height: "36px"}}
                                />
                            </div>
                            <div style={{width: 76}}>
                                <img
                                    alt=""
                                    src={carTagFlag}
                                    className="position-absolute"
                                    style={{
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        height: "46px",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ),
            },
            car_model: {
                id: 1,
                is_required: invoiceFields?.delivery_on_car?.car_model?.is_required,
                fieldRenderer: (
                    <input
                        type="text"
                        className="col-12 col-lg-3 carInput px-3 py-2 mb-md-3 mb-lg-0 ml-3"
                        placeholder="مدل خودرو"
                        value={car?.model}
                        onChange={(event) => {
                            setCar({
                                ...car,
                                model: event.target.value,
                            });
                        }}
                        style={{padding: 0, height: 50}}
                    />
                ),
            },
            car_color: {
                id: 2,
                is_required: invoiceFields?.delivery_on_car?.car_color?.is_required,
                fieldRenderer: (
                    <input
                        type="text"
                        className="col-12 col-lg-3 carInput px-3 py-2 ml-3 mb-3 mb-lg-0"
                        placeholder="رنگ خودرو"
                        value={car?.color}
                        onChange={(event) => {
                            setCar({
                                ...car,
                                color: event.target.value,
                            });
                        }}
                        style={{padding: 0, height: "50px"}}
                    />
                ),
            },
        },
        [FULFILLMENT_ON_BUSINESS_SITE]: {
            title: "اطلاعات میز",
            table_number: {
                id: 0,
                is_required:
                invoiceFields?.delivery_on_business_site?.table_number?.is_required,
                fieldRenderer: (
                    <div className="mb-3 mb-md-2 px-2">
                        <div style={{color: coal}} className="u-font-semi-small">
                            شماره میز
                        </div>
                        <input
                            className="mt-1 px-2 py-1 placeholder-right"
                            color="secondary"
                            style={{
                                border: "1px solid lightgray",
                                direction: "ltr",
                                borderRadius: 5,
                            }}
                            onChange={(e) => {
                                if (e.target.value.length < 40) {
                                    setErrors((prevState) => [
                                        ...prevState.filter(
                                            (item) => item.type !== FULFILLMENT_ON_BUSINESS_SITE
                                        ),
                                    ]);
                                    setTableNumber(persianToEnglishNumber(e.target.value));
                                } else {
                                    setErrors((prevState) => [
                                        ...prevState.filter(
                                            (item) => item.type !== FULFILLMENT_ON_BUSINESS_SITE
                                        ),
                                        {
                                            type: FULFILLMENT_ON_BUSINESS_SITE,
                                            text: "ظرفیت تعداد کاراکترهای مجاز به پایان رسیده است.",
                                        },
                                    ]);
                                }
                            }}
                            themeColor={themeColor}
                            value={tableNumber}
                            size="small"
                            placeholder="شماره میز"
                        />
                    </div>
                ),
            },
        },
    };
    return {
        invoiceFieldsConstant,
        errors,
    };
};
