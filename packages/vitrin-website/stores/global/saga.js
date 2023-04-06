import {
  makeSelectBusinessCRMData,
  makeSelectVitrinFormInformation,
} from "./selector";
import {
  isSiteDomainValid,
  setSnackBarMessage,
  setUserBusinesses,
  startLoading,
  stopLoading,
  updateGmv,
  updateNewVitrinForm,
  uploadRequest,
  uploadRequestFinished,
  fileUploaded,
  uploadFailure,
  uploadSuccess,
  uploadProgress,
  setBusinessesCategories,
  setCategoryTemplates,
  setTemplate,
  setPackages,
  setBusinessCRMData,
  setTransaction,
  setFormsDictionary,
  setBusiness,
  createBehtarino,
  updateBehtarino,
} from "./actions";
import {
  ACCEPT_EVENT,
  CREATE_AND_INITIALIZE_VITRIN,
  GET_BUSINESSES_CATEGORIES,
  GET_CATEGORY_TEMPLATES,
  GET_PACKAGES,
  GET_TEMPLATE,
  GET_TRANSACTION,
  GET_USER_BUSINESSES,
  GET_VITRIN_CRM_DATA,
  MAKE_TRANSACTION,
  PAY_TRANSACTION,
  SHOW_TOTAL_GMV,
  UPDATE_VITRIN,
  UPLOAD_FILE,
  VALIDATE_SITE_DOMAIN,
  GET_FORMS_DICTIONARY,
  CREATE_FORM_RESPONSE,
  CREATE_VITRIN,
  INITIALIZE_VITRIN,
  GET_BUSINESS,
  CREATE_BEHTARINO,
  UPDATE_BEHTARINO,
  UPLOAD_FILE_BEHTARINO,
  ADD_OR_REMOVE_IMAGE_TO_BEHTARINO,
  CREATE_TRANSACTION,
} from "./constants";
import {
  put,
  all,
  takeLatest,
  select,
  call,
  take,
  takeEvery,
} from "redux-saga/effects";
import {
  INITIALIZE_VITRIN_API,
  CREATE_AND_INITIALIZE_VITRIN_API,
  TOTAL_GMV,
  GET_TEMPLATE_API,
  GET_PACKAGES_API,
  CHECK_SITE_DOMAIN,
  GET_USER_BUSINESS_API,
  FILE_SERVER_URL_API,
  GET_BUSINESSES_CATEGORIES_API,
  GET_CATEGORY_TEMPLATES_API,
  CREATE_TRANSACTION_FOR_VITRIN_INSTALLATION,
  TRANSACTION_API,
  USER_API,
  UPDATE_VITRIN_API,
  GET_VITRIN_CRM_JOURNEY_DATA_API,
  VITRIN_CRM_EVENT_API,
  GET_TRANSACTION_API,
  ACCEPT_EVENT_API,
  FORMS_ITEM_API,
  FORM_RESPONSE_API,
  CREATE_VITRIN_API,
  BUSINESS_LIGHT_BY_SITE_DOMAIN_API,
  CREATE_BEHTARINO_BUSINESS_API,
  UPDATE_BEHTARINO_BUSINESS_API,
  UPLOAD_FILE_BEHTARINO_API,
  UPDATE_BEHTARINO_BUSINESS_IMAGES_API,
  DELETE_BEHTARINO_BUSINESS_IMAGES_API,
  FLAG_BEHTARINO_BUSINESS_API,
  SET_PLUGIN_DATA_API,
  SEND_CUSTOM_EMAIL_API,
  GET_BUSINESS_ORDER_TRANSACTION_API,
  PAY_TRANSACTION_API,
} from "utils/apis";
import request from "utils/request";
import Compressor from "compressorjs";
import { createUploadFileChannel } from "./createFileUploadChannel";
import { getFileExtention } from "utils/helpers/getFileExtention";
import { getFileExtensionType } from "utils/helpers/getFileExtensionType";
import Axios from "axios";
import Router from "next/router";
import { makeSelectBusiness } from "./selector";
import { domains } from "utils/constants";

function compressImage(file) {
  return new Promise(async (resolve, reject) => {
    if (file && /\.png|\.jpg|\.jpeg/.test(file.name.toLowerCase())) {
      try {
        new Compressor(file, {
          quality: 1,
          maxWidth: 1920,
          success(result) {
            resolve(result);
          },
          error(err) {
            console.log(err.message);
          },
        });
      } catch (e) {
        reject(e);
      }
    } else {
      resolve(file);
    }
  });
}
export function* createAndInitializeVitrinSaga(action) {
  try {
    yield put(startLoading());
    let formInfo = yield select(makeSelectVitrinFormInformation());
    formInfo = { ...formInfo, ...action.data };
    yield put(updateNewVitrinForm(formInfo));
    const dto = {
      title: formInfo?.title,
      business_type: "vitrin",
      super_category: formInfo?.initialize_shopping,
      template_site_domain: formInfo?.template_site_domain,
      ...(formInfo.categories && { categories: formInfo.categories }),
      ...(formInfo.sub_categories && {
        sub_categories: formInfo.sub_categories,
      }),
      theme_config: {},
      journey_data: {
        preferred_services: formInfo.preferred_services,
        utm_data: {
          source: "google",
          medium: "cpc",
          ads_type: localStorage.getItem("type"),
          term: localStorage.getItem("kw"),
          referrer: localStorage.getItem("referrer"),
          ad_group: localStorage.getItem("adgid"),
          device: localStorage.getItem("device"),
          entry_url: localStorage.getItem("entry-url"),
          utm: localStorage.getItem("utm"),
        },
      },
      crm_description: "",
      is_owner: true,
    };
    const {
      response: { data: business, meta },
    } = yield call(request, CREATE_AND_INITIALIZE_VITRIN_API, dto, "POST");
    if (meta.status_code >= 200 && meta.status_code < 300) {
      yield call(request, USER_API, { name: formInfo.adminName }, "PATCH");
      yield put(setBusiness(business));
      if (typeof action.callback === "function") {
        const slug = business.slug;
        yield put(setSnackBarMessage("وبسایت شما ساخته شد", "success"));
        yield call(getBusinessCRMDataSaga, { data: { slug } });
        const businessCRMData = yield select(makeSelectBusinessCRMData());
        if (!businessCRMData?.has_first_login_event) {
          yield call(
            request,
            VITRIN_CRM_EVENT_API(slug),
            {
              result_type: 13,
            },
            "POST"
          );
        }
        localStorage.removeItem("createdBusiness");
        yield call(action.callback, business);
      }
    } else if (meta.status_code >= 403) {
      yield put(stopLoading());
      yield call(action.callbackError);
    } else {
      yield put(setSnackBarMessage("خطا در ساخت وبسایت", "fail"));
      yield put(stopLoading());
    }
  } catch (error) {
    console.log(error);
    yield put(stopLoading());
    yield put(setSnackBarMessage("خطا در ساخت وبسایت", "fail"));
  }
}

export function* createVitrinSaga(action) {
  const { preferred_services, phone } = action.data;
  try {
    yield put(startLoading());
    const {
      response: { data: business, meta },
    } = yield call(
      request,
      CREATE_VITRIN_API,
      {
        theme_config: {},
        phone,
        extra_data: {
          business_type: "vitrin",
        },
        journey_data: {
          preferred_services,
          utm_data: {
            source: "google",
            medium: "cpc",
            ads_type: localStorage.getItem("type"),
            term: localStorage.getItem("kw"),
            referrer: localStorage.getItem("referrer"),
            ad_group: localStorage.getItem("adgid"),
            device: localStorage.getItem("device"),
            entry_url: localStorage.getItem("entry-url"),
            utm: localStorage.getItem("utm"),
          },
        },
      },
      "POST"
    );
    if (meta.status_code >= 200 && meta.status_code < 300) {
      yield put(setBusiness(business));
      localStorage.setItem("createdBusiness", JSON.stringify(business));
      yield put(stopLoading());
      if (action.callback) {
        yield call(action.callback);
      }
    } else if (meta.status_code >= 403) {
      yield put(stopLoading());
    } else {
      yield put(setSnackBarMessage("خطا در ساخت وبسایت", "fail"));
      yield put(stopLoading());
    }
  } catch (error) {
    console.log(error);
    yield put(stopLoading());
    yield put(setSnackBarMessage("خطا در ساخت وبسایت", "fail"));
  }
}

export function* createBehtarinoSaga(action) {
  try {
    const { title, reval_id, address, latitude, longitude } = action.data;
    yield put(startLoading("createBehtarino"));
    const {
      status,
      response: { data },
    } = yield call(
      request,
      CREATE_BEHTARINO_BUSINESS_API,
      {
        reval_id,
      },
      "POST"
    );
    if (status >= 200 && status < 300) {
      yield put(stopLoading("createBehtarino"));
      localStorage.setItem(
        "behtarinoCreatedBusiness",
        JSON.stringify({
          id: data.id,
          ...(data.latitude && { latitude: Number(data.latitude).toFixed(7) }),
          ...(data.longitude && {
            longitude: Number(data.longitude).toFixed(7),
          }),
        })
      );
      yield all([
        put(
          updateBehtarino(
            {
              title,
              address,
              business: data.id,
              latitude,
              longitude,
            },
            action.callback
          )
        ),
        call(request, FLAG_BEHTARINO_BUSINESS_API(reval_id), {}, "PATCH"),
      ]);
    } else {
      yield put(
        setSnackBarMessage(
          "خطا در ساخت کسب و کار در بهترینو رخ داده است.",
          "fail"
        )
      );
      yield put(stopLoading("createBehtarino"));
    }
  } catch (error) {
    console.log(error);
    yield put(stopLoading("createBehtarino"));
    yield put(
      setSnackBarMessage(
        "خطا در ساخت کسب و کار در بهترینو رخ داده است.",
        "fail"
      )
    );
  }
}

export function* uploadFileBehtarino(file, folderName, callback) {
  yield put(startLoading("uploadImage"));
  try {
    const {
      response: {
        data: { url },
      },
    } = yield call(
      request,
      UPLOAD_FILE_BEHTARINO_API,
      { file_name: file.name, folder_name: folderName },
      "GET"
    );
    yield call(uploadFileSaga, url, file, true);
    const type = getFileExtensionType(
      getFileExtention(file.name).toLowerCase()
    );

    if (type) {
      const uploadedFile = {
        url: url.substr(0, url.indexOf("?")),
        file_name: url.substring(url.lastIndexOf("/") + 1, url.indexOf("?")),
        folder_name: folderName,
        type,
      };
      if (callback)
        yield call(
          callback,
          url.substr(0, url.indexOf("?")),
          `${uploadedFile.folder_name}/${uploadedFile.file_name}`
        );
    }
    yield put(stopLoading("uploadImage"));
  } catch (err) {
    yield put(stopLoading("uploadImage"));
    console.log(err);
  }
}

export function* uploadFileBehtarinoSaga(action) {
  try {
    const { files, folderName } = action.data;
    const type = getFileExtensionType(
      getFileExtention(files[0].name).toLowerCase()
    );
    const _file =
      type === "image"
        ? /\.gif/.test(files[0].name.toLowerCase())
          ? files[0]
          : yield compressImage(files[0])
        : files[0];
    yield call(uploadFileBehtarino, _file, folderName, action.callback);
  } catch (err) {
    console.log(err);
  }
}
export function* updateBehtarinoSaga(action) {
  try {
    yield put(startLoading("createBehtarino"));
    const {
      status,
      response: { data },
    } = yield call(request, UPDATE_BEHTARINO_BUSINESS_API, action.data, "POST");
    if (status >= 200 && status < 300) {
      yield put(stopLoading("createBehtarino"));
      localStorage.setItem(
        "behtarinoCreatedBusiness",
        JSON.stringify({
          id: data.business,
          ...(data.latitude && { latitude: Number(data.latitude).toFixed(7) }),
          ...(data.longitude && {
            longitude: Number(data.longitude).toFixed(7),
          }),
        })
      );
      if (action.callback) {
        yield call(action.callback);
      }
    } else {
      yield put(
        setSnackBarMessage(
          "خطا در آپدیت کسب و کار در بهترینو رخ داده است.",
          "fail"
        )
      );
      yield put(stopLoading("createBehtarino"));
    }
  } catch (error) {
    console.log(error);
    yield put(stopLoading("createBehtarino"));
    yield put(
      setSnackBarMessage(
        "خطا در آپدیت کسب و کار در بهترینو رخ داده است.",
        "fail"
      )
    );
  }
}

export function* addOrRemoveImageToBusinessBehtarinoSaga(action) {
  const { business, resource, isRemove } = action.data;
  try {
    if (!isRemove) yield put(startLoading("uploadImage"));
    const fileType = getFileExtensionType(
      getFileExtention(resource.url).toLowerCase()
    );
    const dataToSubmit = {
      business,
    };
    if (fileType === "image") dataToSubmit.image = resource.url;
    else dataToSubmit.video = resource.url;
    const {
      status,
      response: { data },
    } = yield call(
      request,
      isRemove
        ? DELETE_BEHTARINO_BUSINESS_IMAGES_API(resource.id)
        : UPDATE_BEHTARINO_BUSINESS_IMAGES_API,
      dataToSubmit,
      isRemove ? "DELETE" : "POST"
    );

    if (status >= 200 && status < 300) {
      if (action.callback) {
        yield call(action.callback, data || resource);
      }
    } else {
      yield put(
        setSnackBarMessage(
          `خطا در ${
            isRemove ? "حذف" : "ثبت"
          } تصویر کسب و کار در بهترینو رخ داده است.`,
          "fail"
        )
      );
      if (action.callbackError) {
        yield call(action.callbackError);
      }
    }
    if (!isRemove) yield put(stopLoading("uploadImage"));
  } catch (error) {
    console.log(error);
    if (!isRemove) yield put(stopLoading("uploadImage"));
    yield put(
      setSnackBarMessage(
        `خطا در ${
          isRemove ? "حذف" : "ثبت"
        } تصویر کسب و کار در بهترینو رخ داده است.`,
        "fail"
      )
    );
    if (action.callbackError) {
      yield call(action.callbackError);
    }
  }
}

export function* initializeVitrinSaga(action) {
  try {
    const business = yield select(makeSelectBusiness());
    const slug =
      business?.slug ||
      JSON.parse(localStorage.getItem("createdBusiness") || "").slug;

    const {
      title,
      initialize_shopping,
      template_site_domain,
      adminName,
      categories,
      sub_categories,
      preferred_services,
    } = action.data;
    yield put(startLoading("initializeVitrin"));
    const {
      response: { meta, data },
    } = yield call(
      request,
      INITIALIZE_VITRIN_API(slug),
      {
        title: title,
        business_type: "vitrin",
        super_category: initialize_shopping,
        template_site_domain: template_site_domain,
        ...(categories && { categories: categories }),
        ...(sub_categories && {
          sub_categories: sub_categories,
        }),
        theme_config: {},
        journey_data: {
          preferred_services,
          utm_data: {
            source: "google",
            medium: "cpc",
            ads_type: localStorage.getItem("type"),
            term: localStorage.getItem("kw"),
            referrer: localStorage.getItem("referrer"),
            ad_group: localStorage.getItem("adgid"),
            device: localStorage.getItem("device"),
            entry_url: localStorage.getItem("entry-url"),
            utm: localStorage.getItem("utm"),
          },
        },
        crm_description: "",
        is_owner: true,
      },
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code < 300) {
      yield call(request, USER_API, { name: adminName }, "PATCH");
      yield put(setBusiness(data));
      if (typeof action.callback === "function") {
        yield call(getBusinessCRMDataSaga, { data: { slug } });
        const businessCRMData = yield select(makeSelectBusinessCRMData());
        if (!businessCRMData?.has_first_login_event) {
          yield call(
            request,
            VITRIN_CRM_EVENT_API(slug),
            {
              result_type: 13,
            },
            "POST"
          );
        }
        yield call(action.callback, data);
      }
    } else {
      yield put(setSnackBarMessage("خطا در ساخت وبسایت", "fail"));
      yield call(action.callbackError, meta.status_code);
      yield put(stopLoading("initializeVitrin"));
    }
  } catch (error) {
    console.log(error);
    yield put(stopLoading("initializeVitrin"));
    yield call(action.callbackError, null);
    yield put(setSnackBarMessage("خطا در ساخت وبسایت", "fail"));
  }
}

export function* updateBusinessSaga(action) {
  try {
    yield put(startLoading());
    const _business = yield select(makeSelectBusiness());
    const {
      response: { meta },
    } = yield call(
      request,
      UPDATE_VITRIN_API(_business?.slug),
      action.data,
      "PATCH"
    );
    if (meta.status_code >= 200 && meta.status_code < 300) {
      if (typeof action.callback === "function") {
        action.callback();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getBusinessCRMDataSaga(action) {
  try {
    yield put(startLoading());

    const {
      response: { data: businessCRMData, meta },
    } = yield call(
      request,
      GET_VITRIN_CRM_JOURNEY_DATA_API(action.data.slug),
      {},
      "GET"
    );
    if (meta.status_code >= 200 && meta.status_code < 300) {
      localStorage.setItem("businessCRMData", JSON.stringify(businessCRMData));
      yield put(setBusinessCRMData(businessCRMData));
    }
    yield put(stopLoading());
  } catch (error) {
    console.log(error);
    yield put(stopLoading());
  }
}

export function* exposeTotalGmv() {
  try {
    const {
      response: {
        data: { total_gmv },
      },
    } = yield call(request, TOTAL_GMV, {}, "GET");

    yield put(updateGmv(total_gmv));
  } catch (error) {
    console.log(error);
  }
}

export function* getUserBusinessesSaga() {
  try {
    const {
      response: { data: businesses },
    } = yield call(request, GET_USER_BUSINESS_API, {}, "GET");

    yield put(setUserBusinesses(businesses));
  } catch (error) {
    console.log(error);
  }
}

export function* domainValidator(action) {
  try {
    const {
      response: {
        meta: { status_code },
      },
    } = yield call(request, CHECK_SITE_DOMAIN(action.data), {}, "GET");

    if (status_code === 404) {
      yield put(isSiteDomainValid(true));
    } else {
      yield put(isSiteDomainValid(false));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* uploadFileSaga(url, file, noSnackBarMessage) {
  yield put(uploadRequest());
  const channel = yield call(createUploadFileChannel, url, file);
  while (true) {
    const { progress = 0, err, success } = yield take(channel);
    if (err) {
      yield put(uploadFailure(file, err));
      if (!noSnackBarMessage)
        yield put(setSnackBarMessage("فایل شما اپلود نشد.", "fail"));

      return;
    }
    if (success) {
      yield put(uploadSuccess(file));
      if (!noSnackBarMessage)
        yield put(
          setSnackBarMessage("فایل شما با موفقیت اپلود شد.", "success")
        );
      return;
    }
    yield put(uploadProgress(file, progress));
  }
}

export function* uploadFile(file, folderName, callback, noSnackBarMessage) {
  yield put(startLoading());
  yield put(uploadRequest());
  try {
    const {
      response: {
        data: { url },
      },
    } = yield call(
      request,
      FILE_SERVER_URL_API,
      { file_name: file.name, folder_name: folderName },
      "GET"
    );
    yield call(uploadFileSaga, url, file, noSnackBarMessage);
    const type = getFileExtensionType(
      getFileExtention(file.name).toLowerCase()
    );
    if (type) {
      const uploadedFile = {
        url: url.substr(0, url.indexOf("?")),
        file_name: url.substring(url.lastIndexOf("/") + 1, url.indexOf("?")),
        folder_name: folderName,
        type,
      };
      yield put(fileUploaded(uploadedFile));
      if (callback)
        yield call(
          callback,
          url.substr(0, url.indexOf("?")),
          `${uploadedFile.folder_name}/${uploadedFile.file_name}`
        );
    }
  } catch (err) {
    // console.log(err);
  }
  yield put(stopLoading());
  yield put(uploadRequestFinished());
}

export function* uploadFiles(action) {
  yield put(startLoading());
  const { files, folderName, noSnackBarMessage } = action.data;
  for (let i = 0; i < files.length; i += 1) {
    if (files[i].size > 500000) {
      // const _file = type === "image" ? yield compressImage(files[i]) : files[i];
      yield call(
        uploadFile,
        files[i],
        folderName,
        action.callback,
        noSnackBarMessage
      );
    } else {
      yield call(
        uploadFile,
        files[i],
        folderName,
        action.callback,
        noSnackBarMessage
      );
    }
  }
  yield put(stopLoading());
}
export function* getBusinessesCategoriesSaga() {
  try {
    yield put(startLoading());
    const token = Axios.defaults.headers.common.Authorization;
    delete Axios.defaults.headers.common.Authorization;
    const { response } = yield call(
      request,
      GET_BUSINESSES_CATEGORIES_API,
      {},
      "GET"
    );
    Axios.defaults.headers.common.Authorization = token;
    yield put(setBusinessesCategories(response));
    yield put(stopLoading());
  } catch (e) {
    console.log(e);
  }
}
export function* getCategoryTemplatesSaga(action) {
  try {
    const { id } = action.data;
    yield put(startLoading());
    const token = Axios.defaults.headers.common.Authorization;
    delete Axios.defaults.headers.common.Authorization;
    const { response } = yield call(
      request,
      GET_CATEGORY_TEMPLATES_API(id),
      {},
      "GET"
    );
    Axios.defaults.headers.common.Authorization = token;
    yield put(setCategoryTemplates(response));
    yield put(stopLoading());
  } catch (e) {
    console.log(e);
  }
}
export function* getTemplateSaga(action) {
  try {
    const { id } = action.data;
    yield put(startLoading());
    const token = Axios.defaults.headers.common.Authorization;
    delete Axios.defaults.headers.common.Authorization;
    const { response } = yield call(request, GET_TEMPLATE_API(id), {}, "GET");
    Axios.defaults.headers.common.Authorization = token;
    yield put(setTemplate(response));
    yield put(stopLoading());
  } catch (e) {
    console.log(e);
  }
}
export function* getPackagesSaga(action) {
  try {
    const { id } = action.data;
    yield put(startLoading());
    const token = Axios.defaults.headers.common.Authorization;
    delete Axios.defaults.headers.common.Authorization;
    const { response } = yield call(request, GET_PACKAGES_API(id), {}, "GET");
    Axios.defaults.headers.common.Authorization = token;
    yield put(setPackages(response));
    yield put(stopLoading());
  } catch (e) {
    console.log(e);
  }
}
export function* makeTransactionSaga(action) {
  try {
    yield put(startLoading());
    const _business = JSON.parse(localStorage.getItem("business"));

    const { response } = yield call(
      request,
      CREATE_TRANSACTION_FOR_VITRIN_INSTALLATION(_business.slug),
      action.data,
      "POST"
    );
    const {
      response: { data: paymentData },
    } = yield call(
      request,
      TRANSACTION_API(response.data.transaction_id, "zibal"),
      {},
      "GET"
    );
    if (paymentData) {
      const { url } = paymentData;
      window.location.href = url;
    }
    yield put(stopLoading());
  } catch (e) {
    console.log(e);
  }
}
export function* getTransactionSaga(action) {
  const { order } = Router.query;
  const getTransactionUrl =
    order == "business"
      ? GET_BUSINESS_ORDER_TRANSACTION_API
      : GET_TRANSACTION_API;
  try {
    yield put(startLoading());
    const {
      response: { data: transaction },
    } = yield call(request, getTransactionUrl(action.data.id), {}, "GET");
    yield put(setTransaction(transaction));
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* payTransactionSaga(action) {
  const { order } = Router.query;
  const payTransactionUrl =
    order == "business"
      ? PAY_TRANSACTION_API(action.data.transaction_id)
      : TRANSACTION_API(action.data.transaction_id, "zibal");
  try {
    yield put(startLoading());
    const {
      response: { data },
    } = yield call(request, payTransactionUrl, {}, "GET");
    if (data) {
      const { url } = data;
      window.location = url;
    }
    yield put(stopLoading());
  } catch (error) {
    console.log(error);
    yield put(stopLoading());
  }
}
export function* acceptEventSaga(action) {
  try {
    yield put(startLoading());

    const {
      response: {
        data: { success },
      },
    } = yield call(
      request,
      ACCEPT_EVENT_API(action.data.slug),
      { event_id: action.data.event_id },
      "PATCH"
    );
    if (success) {
      yield put(setSnackBarMessage("جلسه با موفقیت ست شد", "success"));
      Router.push("/admin");
    }
    yield put(stopLoading());
  } catch (error) {
    console.log(error);
    yield put(stopLoading());
  }
}

export function* getFormsDictionarySaga(action) {
  try {
    yield put(startLoading());
    const id = action.data;
    const {
      response: { meta, data },
    } = yield call(request, FORMS_ITEM_API(id), {}, "GET");

    if (meta.status_code >= 200 && meta.status_code <= 300) {
      yield put(setFormsDictionary(data));
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* createFormResponseSaga(action) {
  try {
    yield put(startLoading());

    const {
      response: { data },
    } = yield call(
      request,
      FORM_RESPONSE_API(action.data.form),
      { data: action.data.data, form: action.data.form },
      "post"
    );

    if (data) {
      yield put(setSnackBarMessage("درخواست شما با موفقیت ثبت شد.", "success"));
      window.dataLayer.push({
        event: "formSubmitted",
        formName: action.data.form,
      });
      if (action.cb) {
        if (typeof action.cb == "string") {
          Router.push(action.cb);
        } else {
          action.cb();
        }
      }
    }
    yield put(stopLoading());
  } catch (err) {
    yield put(stopLoading());
  }
}

export function* getBusinessData(action) {
  try {
    yield put(startLoading());
    const siteDomain = action.data;
    const {
      response: { data: business },
    } = yield call(
      request,
      BUSINESS_LIGHT_BY_SITE_DOMAIN_API(siteDomain),
      {},
      "GET"
    );
    yield put(setBusiness(business));
    yield put(stopLoading());
  } catch (err) {
    console.log(err);
    yield put(stopLoading());
  }
}

export function* createTransactionSaga(action) {
  try {
    yield put(startLoading());
    const _business = JSON.parse(localStorage.getItem("business"));

    yield call(
      request,
      SET_PLUGIN_DATA_API(action.slug || _business.slug),
      {
        plugin: "base",
        data: {
          packages: action.data.packages,
          duration: action.data.duration,
        },
      },
      "PATCH"
    );
    let paymentData = null;

    if (action.slug) {
      const { response } = yield call(
        request,
        CREATE_TRANSACTION_FOR_VITRIN_INSTALLATION(
          action.slug || _business.slug
        ),
        action.data,
        "POST"
      );
      const {
        response: { data },
      } = yield call(
        request,
        TRANSACTION_API(response.data.transaction_id, "zibal"),
        {},
        "GET"
      );
      paymentData = data;
      const email = {
        subject: "درخواست پرداخت (درگاه) برای ویترین",
        body: `
          بیزینس: ${_business?.title} - ${action.slug || _business?.slug}
          مبلغ: ${action.data.amount}
        `,
        recipients: [
          "amirreza.oakzad7798@gmail.com",
          "amin.vahdat.76@gmail.com",
        ],
      };
      yield call(request, SEND_CUSTOM_EMAIL_API, email, "POST");
    } else {
      if (!action.has_first_login_event) {
        yield call(
          request,
          VITRIN_CRM_EVENT_API(action.slug || _business.slug),
          {
            result_type: 13,
          },
          "POST"
        );
      }
    }

    if (paymentData) {
      const { url } = paymentData;
      window.location = url;
    } else {
      const selectedDomain =
        domains.find((domain) => domain.value === formInfo.acception_state) ||
        domains[0];
      const user = yield select(makeSelectUser());
      const selectedFullDomain = `https://${formInfo.websiteAddress}${selectedDomain.name}`;
      window.location = `${selectedFullDomain}/admin?token=${user.token}`;
    }
    yield put(stopLoading());
  } catch (e) {
    console.log(e);
  }
}

const sagaFunctions = [
  takeLatest(GET_TRANSACTION, getTransactionSaga),
  takeLatest(CREATE_AND_INITIALIZE_VITRIN, createAndInitializeVitrinSaga), // create and initialize
  takeLatest(SHOW_TOTAL_GMV, exposeTotalGmv),
  takeLatest(VALIDATE_SITE_DOMAIN, domainValidator),
  takeLatest(GET_USER_BUSINESSES, getUserBusinessesSaga),
  takeLatest(UPLOAD_FILE, uploadFiles),
  takeLatest(GET_BUSINESSES_CATEGORIES, getBusinessesCategoriesSaga),
  takeLatest(GET_CATEGORY_TEMPLATES, getCategoryTemplatesSaga),
  takeLatest(GET_TEMPLATE, getTemplateSaga),
  takeLatest(GET_PACKAGES, getPackagesSaga),
  takeLatest(MAKE_TRANSACTION, makeTransactionSaga),
  takeLatest(UPDATE_VITRIN, updateBusinessSaga),
  takeLatest(GET_VITRIN_CRM_DATA, getBusinessCRMDataSaga),
  takeLatest(PAY_TRANSACTION, payTransactionSaga),
  takeLatest(ACCEPT_EVENT, acceptEventSaga),
  takeEvery(GET_FORMS_DICTIONARY, getFormsDictionarySaga),
  takeLatest(CREATE_FORM_RESPONSE, createFormResponseSaga),
  takeLatest(CREATE_VITRIN, createVitrinSaga),
  takeLatest(CREATE_BEHTARINO, createBehtarinoSaga),
  takeLatest(UPDATE_BEHTARINO, updateBehtarinoSaga),
  takeLatest(
    ADD_OR_REMOVE_IMAGE_TO_BEHTARINO,
    addOrRemoveImageToBusinessBehtarinoSaga
  ),
  takeLatest(UPLOAD_FILE_BEHTARINO, uploadFileBehtarinoSaga),
  takeLatest(INITIALIZE_VITRIN, initializeVitrinSaga),
  takeLatest(GET_BUSINESS, getBusinessData),
  takeLatest(CREATE_TRANSACTION, createTransactionSaga),
];

export default sagaFunctions;
