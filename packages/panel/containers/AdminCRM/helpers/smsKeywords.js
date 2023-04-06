import {
  AMOUNT_KEYWORD,
  BUSINESS_TITLE_KEYWORD,
  CREDIT_AMOUNT_KEYWORD,
  DISCOUNT_CEILING_KEYWORD,
  DISCOUNT_CODE_KEYWORD,
  DISCOUNT_FLOOR_KEYWORD,
  DISCOUNT_PERCENT_KEYWORD,
  EXPIRY_DATE_KEYWORD,
  MEMBERSHIP_NAME_KEYWORD,
  MEMBERSHIP_TOTAL_GIFT_KEYWORD,
  MEMBERSHIP_TOTAL_POINT_KEYWORD,
} from "../constants";

const allSmsKeywords = [
  AMOUNT_KEYWORD,
  BUSINESS_TITLE_KEYWORD,
  CREDIT_AMOUNT_KEYWORD,
  EXPIRY_DATE_KEYWORD,
  MEMBERSHIP_NAME_KEYWORD,
  MEMBERSHIP_TOTAL_GIFT_KEYWORD,
  MEMBERSHIP_TOTAL_POINT_KEYWORD,
  DISCOUNT_CODE_KEYWORD,
  DISCOUNT_PERCENT_KEYWORD,
  DISCOUNT_CEILING_KEYWORD,
  DISCOUNT_FLOOR_KEYWORD,
];

export const replacePersinaSmsKeywordWithEnglish = (smsContent) => {
  if (!smsContent) return "";
  const bracketsRegExp = /\[(.*?)\]/g;
  const transformedSmsContent = smsContent.replaceAll(bracketsRegExp, (e) => {
    const value = e?.replaceAll(/(\[|\])/g, "");
    const smsKeywordAtSmsConstants =
      allSmsKeywords?.find(
        (smsKeywordItem) => smsKeywordItem.name === value?.trim()
      ) || null;
    return smsKeywordAtSmsConstants?.value
      ? `[${smsKeywordAtSmsConstants?.value}]`
      : e;
  });
  return transformedSmsContent;
};

export const replaceEnglishSmsKeywordsWithPersian = (smsContent) => {
  if (!smsContent) return "";
  const regex = new RegExp(
    `(${allSmsKeywords.map((item) => item.value).join("|")})`,
    "g"
  );
  const transformedSmsContent = smsContent.replaceAll(regex, (e) => {
    const smsKeywordAtSmsConstants = allSmsKeywords.find(
      (smsKeywordItem) => smsKeywordItem.value === e.trim()
    );
    return smsKeywordAtSmsConstants.name;
  });
  return transformedSmsContent;
};
