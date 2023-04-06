import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the admin state domain
 */

const selectAdminDomain = (state) => state.admin || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Admin
 */

const makeSelectAdmin = () => createSelector(selectAdminDomain, (substate) => substate);

// Analytics
const makeSelectBusinessShoppingData = () => createSelector(selectAdminDomain, (state) => state.businessShoppingData);
const makeSelectPageViews = () => createSelector(selectAdminDomain, (state) => state.vitrinPageViews);
const makeSelectCallRequests = () => createSelector(selectAdminDomain, (state) => state.vitrinCallRequests);

const makeSelectReportsData = () => createSelector(selectAdminDomain, (state) => state.reportsData);

const makeSelectBusinessTransactions = () =>
  createSelector(selectAdminDomain, (state) => state.businessTransactionsReports);
const makeSelectBusinessTopSellingDeals = () =>
  createSelector(selectAdminDomain, (state) => state.businessTopSellingDealsReports);
const makeSelectBusinessBranchesTransactions = () =>
  createSelector(selectAdminDomain, (state) => state.businessBranchesTransactionsReports);

const makeSelectBusinessDeals = () => createSelector(selectAdminDomain, (state) => state.businessDealsReports);
const makeSelectBusinessBranchesDeals = () =>
  createSelector(selectAdminDomain, (state) => state.businessBranchesDealsReports);

const makeSelectBusinessReviews = () => createSelector(selectAdminDomain, (state) => state.businessReviewsReports);
const makeSelectBusinessBranchesReviews = () =>
  createSelector(selectAdminDomain, (state) => state.businessBranchesReviewsReports);

const makeSelectBusinessShoppingOrders = () =>
  createSelector(selectAdminDomain, (state) => state.businessShoppingOrdersReports);
const makeSelectBusinessBranchesShoppingOrders = () =>
  createSelector(selectAdminDomain, (state) => state.businessBranchesShoppingOrdersReports);
// Domain
const makeSelectIsDomainFree = () => createSelector(selectAdminDomain, (state) => state.isDomainFree);
const makeSelectNikTimeoutError = () => createSelector(selectAdminDomain, (state) => state.nikTimeoutError);
// Shopping
const makeSelectShoppingAdminOrders = () => createSelector(selectAdminDomain, (state) => state.shoppingAdminOrders);
const makeSelectShoppingAdminOrderInvoice = () =>
  createSelector(selectAdminDomain, (state) => state.shoppingAdminOrderInvoice);

const makeSelectShoppingAdminOrdersSummary = () =>
  createSelector(selectAdminDomain, (state) => state.shoppingAdminOrdersSummary);

const makeSelectShoppingAdminOrder = () => createSelector(selectAdminDomain, (state) => state.shoppingAdminOrder);

const makeSelectShoppingAdminAnalyticsData = () =>
  createSelector(selectAdminDomain, (state) => state.shoppingAnalyticsData);

// Reviews
const makeSelectAdminReviews = () => createSelector(selectAdminDomain, (state) => state.reviews);
const makeSelectAdminReviewsPagination = () => createSelector(selectAdminDomain, (state) => state.reviewsPagination);

const makeSelectAdminReview = () => createSelector(selectAdminDomain, (state) => state.review);

// Settings
const makeSelectAdminSelectedDeliveryDate = () =>
  createSelector(selectAdminDomain, (state) => state.selectedDeliveryDate);

const makeSelectShoppingAdminOrdersPagination = () =>
  createSelector(selectAdminDomain, (state) => state.shoppingAdminOrdersPagination);

const makeSelectAdminProducts = () => createSelector(selectAdminDomain, (state) => state.adminDeals);

const makeSelectAdminProduct = () => createSelector(selectAdminDomain, (state) => state.adminDeal);

const makeSelectAdminProductsPagination = () =>
  createSelector(selectAdminDomain, (state) => state.adminDealsPagination);

const makeSelectFormResponsePagination = () =>
  createSelector(selectAdminDomain, (state) => state.formResponsesPagination);

const makeSelectForms = () => createSelector(selectAdminDomain, (state) => state.forms);

const makeSelectFormResponses = () => createSelector(selectAdminDomain, (state) => state.formResponses);

const makeSelectFormResponsesNextPage = () =>
  createSelector(selectAdminDomain, (state) => state.nextFormResponsePageNum);
const makeSelectPOSDevices = () => createSelector(selectAdminDomain, (state) => state.devices);

const makeSelectPOSDevice = () => createSelector(selectAdminDomain, (state) => state.device);
const makeSelectDealReport = () => createSelector(selectAdminDomain, (state) => state.productReport);
const makeSelectIngredientReport = () => createSelector(selectAdminDomain, (state) => state.ingredientReport);
const makeSelectAdminTransactions = () => createSelector(selectAdminDomain, (state) => state.transactions);

const makeSelectAdminTransactionsPagination = () =>
  createSelector(selectAdminDomain, (state) => state.transactionsPagination);
const makeSelectReceivedPurchases = () => createSelector(selectAdminDomain, (state) => state.receivedPurchases);
const makeSelectReceivedPurchasesPagination = () =>
  createSelector(selectAdminDomain, (state) => state.receivedPurchasesPagination);
const makeSelectSubmittedPurchases = () => createSelector(selectAdminDomain, (state) => state.submittedPurchases);
const makeSelectSubmittedPurchasesPagination = () =>
  createSelector(selectAdminDomain, (state) => state.submittedPurchasesPagination);
const makeSelectOrderTransactions = () => createSelector(selectAdminDomain, (state) => state.orderTransactions);
const makeSelectPurchase = () => createSelector(selectAdminDomain, (state) => state.purchase);

const makeSelectEventActions = () => createSelector(selectAdminDomain, (state) => state.eventActions);

const makeSelectCMSLessons = () => createSelector(selectAdminDomain, (state) => state.CMSLessons);

const makeSelectOrderCRM = () => createSelector(selectAdminDomain, (state) => state.orderCRM);
const makeSelectOrderDetail = () => createSelector(selectAdminDomain, (state) => state.orderDetail);

const makeSelectJourneyState = () => createSelector(selectAdminDomain, (state) => state.journeyState);
const makeSelectLegalDocuments = () => createSelector(selectAdminDomain, (state) => state.legalDocuments);
const makeSelectCashDrawerTransactions = () =>
  createSelector(selectAdminDomain, (state) => state.cashDrawerTransactions);
const makeSelectCashDrawers = () => createSelector(selectAdminDomain, (state) => state.cashDrawers);
const makeSelectCashDrawersPagination = () => createSelector(selectAdminDomain, (state) => state.cashDrawersPagination);
const makeSelectDealsByIds = () => createSelector(selectAdminDomain, (state) => state.adminDealsByIds);
const makeSelectAdminProductImages = () => createSelector(selectAdminDomain, (state) => state.adminProductImages);
const makeSelectSearchedCRMMembership = () => createSelector(selectAdminDomain, (state) => state.searchedCRMMembership);
const makeSelectPurchaseReportsByProducts = () =>
  createSelector(selectAdminDomain, (state) => state.purchaseReportsByProducts);
const makeSelectPurchaseReportsByProductsPerBranch = () =>
  createSelector(selectAdminDomain, (state) => state.purchaseReportsByProductsPerBranch);
const makeSelectPurchaseReportsFromVendors = () =>
  createSelector(selectAdminDomain, (state) => state.purchaseReportsFromVendors);
const makeSelectPurchaseReportsFromVendorsPerBranch = () =>
  createSelector(selectAdminDomain, (state) => state.purchaseReportsFromVendorsPerBranch);
const makeSelectIngredientsRecountingReports = () =>
  createSelector(selectAdminDomain, (state) => state.ingredientsRecountingReports);
const makeSelectIngredientsRecountingReport = () =>
  createSelector(selectAdminDomain, (state) => state.ingredientsRecountingReport);
const makeSelectDealsReportsSoldByCount = () =>
  createSelector(selectAdminDomain, (state) => state.dealsReportsSoldByCount);
const makeSelectOrderTransactionsFinanceSummaryReports = () =>
  createSelector(selectAdminDomain, (state) => state.orderTransActionsFinanceSummaryReports);
const makeSelectShoppingOrdersFinanceSummaryReports = () =>
  createSelector(selectAdminDomain, (state) => state.shoppingOrdersFinanceSummaryReports);
const makeSelectShoppingOrdersPaymentSummaryReports = () =>
  createSelector(selectAdminDomain, (state) => state.shoppingOrdersPaymentSummaryReports);
const makeSelectCustomersSatisfactionReviewsReports = () =>
  createSelector(selectAdminDomain, (state) => state.customersSatisfactionReviewsReports);

const makeSelectInventoryHistoryReports = () =>
  createSelector(selectAdminDomain, (state) => state.inventoryHistoryReports);

const makeSelectCustomersTaxingReports = () =>
  createSelector(selectAdminDomain, (state) => state.customersTaxingReports);
const makeSelectCustomersDisSatisfactionReviewsReports = () =>
  createSelector(selectAdminDomain, (state) => state.customersDisSatisfactionReviewsReports);
const makeSelectSubmittedPurchasesReports = () =>
  createSelector(selectAdminDomain, (state) => state.submittedPurchasesReports);
const makeSelectSubmittedPurchasesReportsPerBranch = () =>
  createSelector(selectAdminDomain, (state) => state.submittedPurchasesReportsPerBranch);

const makeSelectAdminVendors = () => createSelector(selectAdminDomain, (state) => state.adminVendors);
const makeSelectBusinessCategories = () => createSelector(selectAdminDomain, (state) => state.businessCategories);

const makeSelectWarehouseReportingCategories = () =>
  createSelector(selectAdminDomain, (state) => state.warehouseReportingCategories);

const makeSelectOrderTransactionFinancePaymentsType = () =>
  createSelector(selectAdminDomain, (state) => state.orderTransactionFinancePaymentTypes);

const makeSelectOrderTransactionPerPaymentsTypePerSaleChannel = () =>
  createSelector(selectAdminDomain, (state) => state.orderTransactionPerPaymentTypesPerSalesChannel);

const makeSelectDiscountCodeReports = () => createSelector(selectAdminDomain, (state) => state.discountCodeReports);

const makeSelectAdminVendor = () => createSelector(selectAdminDomain, (state) => state.adminVendor);
const makeSelectAdminVendorItems = () => createSelector(selectAdminDomain, (state) => state.adminVendorItems);
const makeSelectFirstAndLastReport = () => createSelector(selectAdminDomain, (state) => state.FirstAndLastReport);

const makeSelectTotalRequestedPurchaseItems = () =>
  createSelector(selectAdminDomain, (state) => state.totalRequestedPurchaseItems);

const makeSelectOrderAggregate = () => createSelector(selectAdminDomain, (state) => state.orderAggregate);

const makeSelectCRMMemberShipsByQuery = () => createSelector(selectAdminDomain, (state) => state.CRMMembershipByQuery);
const makeSelectCRMMemberShipsPaginationByQuery = () =>
  createSelector(selectAdminDomain, (state) => state.CRMMembershipPaginationByQuery);
const makeSelectMembershipEventLogs = () => createSelector(selectAdminDomain, (state) => state.membershipEventLogs);

const makeSelectMemberhsipEventLogsPagination = () =>
  createSelector(selectAdminDomain, (state) => state.CRMMemberhsipEventLogsPagination);

const makeSelectCrmLevels = () => createSelector(selectAdminDomain, (state) => state.crmLevels);

const makeSelectCrmLevel = () => createSelector(selectAdminDomain, (state) => state.crmLevelItem);

const makeSelectCrmSegments = () => createSelector(selectAdminDomain, (state) => state.crmSegments);

const makeSelectCrmSegmentsPagination = () => createSelector(selectAdminDomain, (state) => state.crmSegmentsPagination);

const makeSelectCrmSegmentItem = () => createSelector(selectAdminDomain, (state) => state.crmSegmentItem);

const makeSelectAggregateRating = () => createSelector(selectAdminDomain, (state) => state.aggregateRating);

const makeSelectCrmLabels = () => createSelector(selectAdminDomain, (state) => state.crmLabels);

const makeSelectAutomatedProcess = () => createSelector(selectAdminDomain, (state) => state.automatedProcessItem);

const makeSelectAutomatedProcessesPagination = () =>
  createSelector(selectAdminDomain, (state) => state.automatedProcessesPagination);

const makeSelectAutomatedProcesses = () => createSelector(selectAdminDomain, (state) => state.automatedProcesses);

const makeSelectIngredients = () => createSelector(selectAdminDomain, (state) => state.ingredients);

const makeSelectIngredientsPagination = () => createSelector(selectAdminDomain, (state) => state.ingredientsPagination);

const makeSelectIngredient = () => createSelector(selectAdminDomain, (state) => state.ingredient);
const makeSelectModifierSets = () => createSelector(selectAdminDomain, (state) => state.modifierSets);
const makeSelectModifiersPagination = () => createSelector(selectAdminDomain, (state) => state.modifierSetsPagination);

const makeSelectModifierSet = () => createSelector(selectAdminDomain, (state) => state.modifierSet);
const makeSelectAdminAllProducts = () => createSelector(selectAdminDomain, (state) => state.adminAllProducts);
const makeSelectCallRequest = () => createSelector(selectAdminDomain, (state) => state.callRequests);

const makeSelectReportCallRequest = () => createSelector(selectAdminDomain, (state) => state.reportsCallRequests);

const makeSelectReviewsResponse = () => createSelector(selectAdminDomain, (state) => state.reviewsResponse);

const makeSelectReviewsResponsePaginationByQuery = () =>
  createSelector(selectAdminDomain, (state) => state.reviewsResponsePaginationByQuery);

const makeSelectInvoiceFactorResponse = () => createSelector(selectAdminDomain, (state) => state.invoiceFactor);
const makeSelectDiscountCodeData = () => createSelector(selectAdminDomain, (state) => state.discountCodeData);

const makeSelectDiscountCodeDataById = () => createSelector(selectAdminDomain, (state) => state.discountCodeDataById);

const makeSelectCampaignList = () => createSelector(selectAdminDomain, (state) => state.campaigns);

const makeSelectCampaignItem = () => createSelector(selectAdminDomain, (state) => state.campaignDetail);

const makeSelectCampaignPagination = () => createSelector(selectAdminDomain, (state) => state.campaignsPagination);

const makeSelectProductsDeactivationData = () =>
  createSelector(selectAdminDomain, (state) => state.productsDeactivation);

const makeSelectGrossSalesReportData = () => createSelector(selectAdminDomain, (state) => state.grossSalesReportData);

const makeSelectReviewsTemplate = () => createSelector(selectAdminDomain, (state) => state.reviewsTemplate);

const makeSelectAutomatedProcessType = () => createSelector(selectAdminDomain, (state) => state.automatedProcessType);

const makeSelectAutomatedProcessesCreditReports = () =>
  createSelector(selectAdminDomain, (state) => state.automatedProcessCreditReport);

const makeSelectCampaignCreditReports = () => createSelector(selectAdminDomain, (state) => state.campaignCreditReport);

const makeSelectAvailabilityDomain = () => createSelector(selectAdminDomain, (state) => state.availability_domain);

const makeSelectCostsList = () => createSelector(selectAdminDomain, (state) => state.costsList);
const makeSelectCostsCategory = () => createSelector(selectAdminDomain, (state) => state.costsCategory);
const makeSelectCostsPagination = () => createSelector(selectAdminDomain, (state) => state.revalCostsPagination);
const makeSelectPaymentMethods = () => createSelector(selectAdminDomain, (state) => state.paymentMethods);

const makeSelectCampaignsBySegment = () => createSelector(selectAdminDomain, (state) => state.campaignsBySegment);
const makeSelectCampaignBySegment = () => createSelector(selectAdminDomain, (state) => state.campaignBySegment);

export default makeSelectAdmin;

export {
  makeSelectCampaignsBySegment,
  makeSelectCampaignBySegment,
  makeSelectModifierSet,
  makeSelectModifiersPagination,
  makeSelectModifierSets,
  makeSelectIngredientsPagination,
  makeSelectIngredients,
  makeSelectShoppingAdminOrderInvoice,
  makeSelectDealsByIds,
  makeSelectShoppingAdminOrdersSummary,
  makeSelectOrderDetail,
  makeSelectOrderCRM,
  makeSelectCMSLessons,
  makeSelectFormResponsesNextPage,
  makeSelectFormResponsePagination,
  makeSelectFormResponses,
  makeSelectForms,
  makeSelectCallRequests,
  makeSelectPageViews,
  selectAdminDomain,
  makeSelectShoppingAdminOrders,
  makeSelectShoppingAdminOrder,
  makeSelectAdminReviews,
  makeSelectAdminReview,
  makeSelectAdminSelectedDeliveryDate,
  makeSelectShoppingAdminOrdersPagination,
  makeSelectIsDomainFree,
  makeSelectShoppingAdminAnalyticsData,
  makeSelectAdminProducts,
  makeSelectAdminProductsPagination,
  makeSelectAdminProduct,
  makeSelectBusinessTransactions,
  makeSelectBusinessBranchesTransactions,
  makeSelectBusinessDeals,
  makeSelectBusinessBranchesDeals,
  makeSelectBusinessReviews,
  makeSelectBusinessShoppingOrders,
  makeSelectBusinessBranchesShoppingOrders,
  makeSelectBusinessTopSellingDeals,
  makeSelectBusinessBranchesReviews,
  makeSelectPOSDevice,
  makeSelectPOSDevices,
  makeSelectDealReport,
  makeSelectIngredientReport,
  makeSelectAdminTransactions,
  makeSelectAdminTransactionsPagination,
  makeSelectOrderTransactions,
  makeSelectReceivedPurchases,
  makeSelectSubmittedPurchasesPagination,
  makeSelectReceivedPurchasesPagination,
  makeSelectSubmittedPurchases,
  makeSelectPurchase,
  makeSelectReportsData,
  makeSelectAdminReviewsPagination,
  makeSelectJourneyState,
  makeSelectLegalDocuments,
  makeSelectCashDrawerTransactions,
  makeSelectCashDrawers,
  makeSelectCashDrawersPagination,
  makeSelectAdminProductImages,
  makeSelectSearchedCRMMembership,
  makeSelectPurchaseReportsByProducts,
  makeSelectPurchaseReportsByProductsPerBranch,
  makeSelectPurchaseReportsFromVendors,
  makeSelectPurchaseReportsFromVendorsPerBranch,
  makeSelectIngredientsRecountingReports,
  makeSelectIngredientsRecountingReport,
  makeSelectDealsReportsSoldByCount,
  makeSelectOrderTransactionsFinanceSummaryReports,
  makeSelectShoppingOrdersFinanceSummaryReports,
  makeSelectShoppingOrdersPaymentSummaryReports,
  makeSelectAdminVendors,
  makeSelectCustomersSatisfactionReviewsReports,
  makeSelectSubmittedPurchasesReports,
  makeSelectSubmittedPurchasesReportsPerBranch,
  makeSelectCustomersDisSatisfactionReviewsReports,
  makeSelectWarehouseReportingCategories,
  makeSelectBusinessCategories,
  makeSelectOrderTransactionFinancePaymentsType,
  makeSelectOrderTransactionPerPaymentsTypePerSaleChannel,
  makeSelectDiscountCodeReports,
  makeSelectInventoryHistoryReports,
  makeSelectCustomersTaxingReports,
  makeSelectAdminVendor,
  makeSelectAdminVendorItems,
  makeSelectTotalRequestedPurchaseItems,
  makeSelectOrderAggregate,
  makeSelectFirstAndLastReport,
  makeSelectCRMMemberShipsByQuery,
  makeSelectCRMMemberShipsPaginationByQuery,
  makeSelectCrmLevels,
  makeSelectCrmLevel,
  makeSelectAggregateRating,
  makeSelectCrmSegments,
  makeSelectCrmSegmentItem,
  makeSelectCrmSegmentsPagination,
  makeSelectCrmLabels,
  makeSelectEventActions,
  makeSelectAutomatedProcess,
  makeSelectAutomatedProcesses,
  makeSelectAutomatedProcessesPagination,
  makeSelectIngredient,
  makeSelectAdminAllProducts,
  makeSelectCallRequest,
  makeSelectReportCallRequest,
  makeSelectDiscountCodeData,
  makeSelectDiscountCodeDataById,
  makeSelectReviewsResponse,
  makeSelectReviewsResponsePaginationByQuery,
  makeSelectInvoiceFactorResponse,
  makeSelectNikTimeoutError,
  makeSelectCampaignList,
  makeSelectCampaignItem,
  makeSelectCampaignPagination,
  makeSelectProductsDeactivationData,
  makeSelectGrossSalesReportData,
  makeSelectBusinessShoppingData,
  makeSelectReviewsTemplate,
  makeSelectAutomatedProcessType,
  makeSelectAutomatedProcessesCreditReports,
  makeSelectCampaignCreditReports,
  makeSelectMembershipEventLogs,
  makeSelectMemberhsipEventLogsPagination,
  makeSelectAvailabilityDomain,
  makeSelectCostsCategory,
  makeSelectCostsPagination,
  makeSelectCostsList,
  makeSelectPaymentMethods,
};
