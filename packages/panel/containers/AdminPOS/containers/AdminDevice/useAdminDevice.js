import { makeSelectCashDrawers, makeSelectPOSDevice } from "store/selectors";
import { makeSelectBranches, makeSelectBusiness, makeSelectBusinessId } from "@saas/stores/business/selector";
import {
  closeCashDrawer,
  createCashTransaction,
  createPosDevice,
  deletePosDevice,
  finishCashDrawer,
  getCashDrawers,
  getPosDevice,
  openCashDrawer,
  renewPosLicence,
  updatePosDevice,
} from "store/actions";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix, makeSelectPlugin } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

const SHORTCUT_MENU_NAME = "حالت میانبر";
const DEFAULT_MENU_NAME = "حالت پیش فرض";
const FAST_ORDER_NAME = "ثبت سفارش سریع";
const menuTypes = [
  {
    name: SHORTCUT_MENU_NAME,
    value: 1,
  },
  {
    name: DEFAULT_MENU_NAME,
    value: 0,
  },
  {
    name: FAST_ORDER_NAME,
    value: 2,
  },
];

const CARRY_OUT_KEYWORD = "CARRY_OUT";
const DELIVERY_ON_BUSINESS_SITE_KEYWORD = "DELIVERY_ON_BUSINESS_SITE";
const DELIVERY_ON_CAR_KEYWORD = "DELIVERY_ON_CAR";
const DELIVERY_ON_USER_SITE_KEYWORD = "DELIVERY_ON_USER_SITE";

const deliveryOptions = [
  { name: "بیرون بر", value: CARRY_OUT_KEYWORD },
  { name: "تحویل در خودرو", value: DELIVERY_ON_CAR_KEYWORD },
  { name: "ارسال برای مشتری", value: DELIVERY_ON_USER_SITE_KEYWORD },
  { name: "سرو در سالن", value: DELIVERY_ON_BUSINESS_SITE_KEYWORD },
];

export function useAdminDevice() {
  const router = useRouter();
  const dispatch = useDispatch();
  const deviceId = router.query.id === "new" ? null : router.query.id;
  const isLoading = useSelector(makeSelectLoading());
  const branches = useSelector(makeSelectBranches());
  const businessId = useSelector(makeSelectBusinessId());
  const business = useSelector(makeSelectBusiness());
  const cashDrawers = useSelector(makeSelectCashDrawers());
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const shoppingPluginData = useSelector(makeSelectPlugin(SHOPPING_PLUGIN))
  const _device = useSelector(makeSelectPOSDevice());
  const _updateDevice = (id, data, callback) => dispatch(updatePosDevice(id, data, callback));
  const _deleteDevice = (id, callback) => dispatch(deletePosDevice(id, callback));
  const _createDevice = (data, callback) => dispatch(createPosDevice(data, callback));
  const _getDevice = (id) => dispatch(getPosDevice(id));

  const _renewPosLicence = (licence, callback) => dispatch(renewPosLicence(licence, callback));

  const _createCashDrawer = (id, data, callback) => dispatch(openCashDrawer(id, data, callback));
  const _closeCashDrawer = (id, data, callback) => dispatch(closeCashDrawer(id, data, callback));
  const _finishCashDrawer = (posId, drawerId, data, callback) =>
    dispatch(finishCashDrawer(posId, drawerId, data, callback));
  const _createCashTransaction = (id, data, callback) => dispatch(createCashTransaction(id, data, callback));
  const _getCashDrawers = (data) => dispatch(getCashDrawers(data));
  const [nameError, setNameError] = useState("");
  const [saleChannelError, setSaleChannelError] = useState("");
  const [defaultDeliveryType, setDefaultDeliveryType] = useState("");
  const [defaultDeliveryTypeError, setDefaultDeliveryTypeError] = useState("");
  const [branchError, setBranchError] = useState("");
  const [isDialogBoxOpen, setDialogBox] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [saleChannel, setSaleChannel] = useState("");
  const [device, setDevice] = useState(null);
  const [menuType, setMenuType] = useState(0);
  const [dialog, setDialog] = useState(null);
  const [isCrmRequired, setIsCrmRequired] = useState(true);
  const branch =
    device && branches && branches.length
      ? branches.find((branch) => branch.id === device.business)
        ? branches.find((branch) => branch.id === device.business).id
        : ""
      : businessId;

  useEffect(() => {
    if (_device) {
      setDevice(_device);
    }
  }, [_device]);
  useEffect(() => {
    if (device?.extra_data) {
      const { template_type, default_sales_channel_id, is_order_crm_details_required ,default_delivery_site_type} = device.extra_data;
      setDefaultDeliveryType(default_delivery_site_type?.toUpperCase() ?? "")
      console.log(device)
      setMenuType(template_type);
      setSaleChannel(default_sales_channel_id || "");
      (is_order_crm_details_required !== undefined || is_order_crm_details_required !== null) &&
        setIsCrmRequired(is_order_crm_details_required);
    }
  }, [device]);

  useEffect(() => {
    if (deviceId)
      setTimeout(() => {
        _getDevice(deviceId);
      }, 0);
    else {
      setDevice({});
    }
    return () => {
      setTimeout(() => {
        _getDevice(null);
      }, 0);
    };
  }, [deviceId]);

  const submit = () => {
    if (!device.name) setNameError("لطفا نام دستگاه را وارد کنید.");
    if (!branch) setBranchError("لطفا شعبه انتخاب کنید.");
    if (!phone) setPhoneError("لطفا شماره تلفن کاربر را وارد کنید.");
    if (!saleChannel) return setSaleChannelError("لطفا کانال فروش انتخاب کنید");
    if (!defaultDeliveryType && menuType !== 2) return setDefaultDeliveryTypeError("لطفا نحوه تحویل را انتخاب کنید");
    const defaultDeliveryTypeLowerCase = defaultDeliveryType.toLowerCase()
    if (device.name && branch) {
      if (deviceId) {
        _updateDevice(deviceId, {
          name: device.name,
          extra_data: {
            ...(defaultDeliveryTypeLowerCase && {default_delivery_site_type: defaultDeliveryTypeLowerCase}),
            ...(menuType === 2 && {
              is_order_crm_details_required: isCrmRequired,
            }),
            template_type: menuType,
            default_sales_channel_id: saleChannel,
          },
        });
      } else {
        _createDevice(
          {
            ...device,
            extra_data: {
              ...(defaultDeliveryTypeLowerCase && {default_delivery_site_type: defaultDeliveryTypeLowerCase}),
              ...(menuType === 2 && {
                is_order_crm_details_required: isCrmRequired,
              }),
              default_sales_channel_id: saleChannel,
              template_type: menuType,
            },
            business: branch,
            user: { phone, user_name: name },
          },
          router.back
        );
      }
    }
  };

  const renewLicense = () =>
    _renewPosLicence(device.id, () => {
      setDialog(false);
      setModal(true);
    });

  const selectBranch = (value) => {
    setBranchError("");
    setDevice({
      ...device,
      business: parseInt(value),
    });
  };
  const handleDeviceNameChange = (name) => {
    setNameError("");
    setDevice({ ...device, name });
  };
  const handleSalesChannelChange = (value) => {
    setSaleChannelError("");
    setSaleChannel(value);
  };

  const handleMenuTypeChange = (value) => {
    const isQuickOrder = value === 2;
    setMenuType(value);
    if (isQuickOrder) {
      setDefaultDeliveryType("");
    }
  };
  const handleDefaultDeliveryType = (value) => {
    setDefaultDeliveryType(value);
  };

  const onDeviceDelete = () => {
    setDialogBox(false);
    _deleteDevice(deviceId, router.back);
  };

  const isQuickOrder = useMemo(() => menuType === 2, [menuType]);


  const availableDeliveryOptions = useMemo(() => {
    const { delivery_type_options } = shoppingPluginData?.data;
    if(!delivery_type_options) return []
    return deliveryOptions.filter((deliveryOption) => delivery_type_options.includes(deliveryOption.value));
  }, [shoppingPluginData]);

  return {
    onDeviceDelete,
    availableDeliveryOptions,
    handleDefaultDeliveryType,
    defaultDeliveryType,
    defaultDeliveryTypeError,
    isQuickOrder,
    handleMenuTypeChange,
    handleSalesChannelChange,
    handleDeviceNameChange,
    selectBranch,
    renewLicense,
    menuTypes,
    SHORTCUT_MENU_NAME,
    isLoading,
    _getDevice,
    business,
    branches,
    _createCashDrawer,
    _closeCashDrawer,
    _finishCashDrawer,
    _createCashTransaction,
    cashDrawers,
    _getCashDrawers,
    adminUrlPrefix,
    nameError,
    setNameError,
    saleChannelError,
    branchError,
    isDialogBoxOpen,
    setDialogBox,
    phoneError,
    setPhoneError,
    phone,
    setPhone,
    name,
    setName,
    modal,
    setModal,
    saleChannel,
    device,
    menuType,
    setMenuType,
    dialog,
    setDialog,
    submit,
    branch,
    deviceId,
    isCrmRequired,
    setIsCrmRequired,
  };
}
