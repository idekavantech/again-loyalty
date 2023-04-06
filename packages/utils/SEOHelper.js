import { englishNumberToPersianNumber } from "./helpers/englishNumberToPersianNumber";
import escapeRegExp from "./helpers/escapeRegExp";

export const SEOAnalyser = ({
  seo_title: title = "",
  body = "",
  raw_body = "",
  business_url = "",
  keyphrase = "",
  slug = "",
  meta_description = "",
}) => {
  const situations_persian_title = {
    0: `Bad`,
    1: `medium`,
    2: `Good`,
  };
  const internalLinkAnalysis = () => {
    function urlify(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      let internalLinks = 0;
      text.replace(urlRegex, function (url) {
        if (url && url.includes(business_url)) {
          internalLinks = 2;
        }
      });
      return internalLinks;
    }
    const score = urlify(raw_body);

    const descriptions = {
      0: `There is no link to other website pages. Try to create an internal link.`,
      1: `Just[number] There is link to other website pages. Create more internal links.`,
      2: ` [number] There is link to other website pages. Great!`,
    };

    return {
      title: "Internal link",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  const outboundLinkAnalysis = () => {
    function urlify(text) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      let outboundLinks = 0;
      text.replace(urlRegex, function (url) {
        if (url && !url.includes(business_url)) {
          outboundLinks = 2;
        }
      });
      return outboundLinks;
    }
    const score = urlify(raw_body);

    const descriptions = {
      0: `There is no output link on the page. Create at least one output link in the post.`,
      1: ``,
      2: `There is an output link on the page. Very good!`,
    };

    return {
      title: "External link",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  const metaDescriptionLengthAnalysis = () => {
    let score = 0;
    const isBad = meta_description.length > 180 || meta_description.length < 50;
    const isNormal =
      meta_description.length < 180 && meta_description.length > 50;
    const isGood =
      meta_description.length > 110 && meta_description.length < 130;

    let badPersianText =
      isBad && meta_description.length < 50
        ? "Too short(Less than 2 characters)"
        : "";
    badPersianText =
      isBad && meta_description.length > 180
        ? "very tall(More than 2 characters)"
        : badPersianText;
    badPersianText =
      isBad && meta_description.length === 0 ? "Completely empty" : badPersianText;

    let normalPersianText =
      isNormal && meta_description.length < 120
        ? "Athletes(1 to 2 characters)"
        : "";
    normalPersianText =
      isNormal && meta_description.length > 120
        ? "Much(1 to 2 characters)"
        : normalPersianText;

    if (isGood) {
      score = 2;
    } else if (isNormal) {
      score = 1;
    }
    const descriptions = {
      0: `Meta Description${badPersianText} Is. Rewrite meta descriptions.`,
      1: `The length of the meta description${normalPersianText} Is. Correct the meta description.`,
      2: `The length of the meta description is as good as. How good!`,
    };
    return {
      title: "The length of the meta description",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  const keyphraseExistanceInSlug = () => {
    let score =
      slug && keyphrase && slug.replace(/-/g, " ").includes(keyphrase) ? 2 : 0;

    const descriptions = {
      0: `You have not used the keyword in Slag. Try to use the focal keyword in Slag.`,
      1: ``,
      2: `In the slag of"${slug}" You've used it. Great!`,
    };
    return {
      title: "The existence of the keyword in the slag",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  const keyphraseExistanceInFirstParagraph = () => {
    let introParagraph = body.length > 120 ? body.substr(120) : body;
    const score =
      introParagraph && keyphrase && introParagraph.includes(keyphrase) ? 2 : 0;
    const descriptions = {
      0: `In the introduction of the text, the keyword did not apply. Be sure to use the focal keyword at the start of the text.`,
      1: ``,
      2: ` In the introduction to the text you have used the keyword. How great!`,
    };
    return {
      title: "Existence of keywords in the introduction of the text",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  const keyphraseLengthAnalysis = () => {
    let score = 0;
    const isBad = keyphrase.length > 40 || keyphrase.length < 4;
    const isNormal = keyphrase.length <= 40 && keyphrase.length >= 4;
    const isGood = keyphrase.length > 6 && keyphrase.length < 32;

    let badPersianText =
      isBad && keyphrase.length < 4 ? "Too short(Less than 2 characters)" : "";
    badPersianText =
      isBad && keyphrase.length > 40
        ? "very tall(More 5 characters)"
        : badPersianText;
    let normalPersianText =
      isNormal && keyphrase.length < 6 ? "Athletes(1 to 2 characters)" : "";
    normalPersianText =
      isNormal && keyphrase.length > 32
        ? "Much(1 to 2 characters)"
        : normalPersianText;

    if (isGood) {
      score = 2;
    } else if (isNormal) {
      score = 1;
    }
    const descriptions = {
      0: `Focal word${badPersianText} Is. Rewrite the focal point.`,
      1: `The length of the focal word${normalPersianText} Is. Correct the focal word.`,
      2: `The number of selected keyword characters is appropriate. good job!`,
    };
    return {
      title: "The length of the focal word",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  const keyphraseDensityAnalysis = () => {
    const regex = new RegExp(escapeRegExp(keyphrase), "g"); // same as inv.replace(/\b1x\b/g, "")
    const numberOfTitle = (body.match(regex) || []).length;
    const numberOfwords = body.split(" ").length;
    const density = (numberOfTitle / numberOfwords) * 100;

    let score = 0;
    const isBad = density > 3 || density < 0.5;
    const isNormal =
      (density < 1 && density > 0.5) || (density < 3 && density > 2);
    const isGood = density > 1 && density < 2;

    let badPersianText =
      isBad && density < 0.5 ? "very little(Less than half a percent)" : "";
    badPersianText =
      isBad && density > 3 ? "very much(More 2 %)" : badPersianText;
    let normalPersianText =
      isNormal && density < 1 && density > 0.5 ? "Athletes(۰.1 to 2 percent)" : "";
    normalPersianText =
      isNormal && density < 3 && density > 2 ? "Much(1 to 2 percent)" : "";

    if (isGood) {
      score = 2;
    } else if (isNormal) {
      score = 1;
    }
    const descriptions = {
      0: `Focal keyword density${badPersianText} Is. Rewrite the text.`,
      1: `The focal keyword density in the text${normalPersianText} Is. Correct the text so that keywords are not low or high.`,
      2: `The focal keyword in the text as much(1 to 2 percent) Is. Very good!`,
    };
    return {
      title: "Focal word density",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  const bodyLength = () => {
    let score = 0;
    const keys = body.split(" ").length;
    const isNormal = keys >= 200 && keys < 500;
    const isGood = keys >= 500;
    if (isGood) {
      score = 2;
    } else if (isNormal) {
      score = 1;
    }
    const descriptions = {
      0: `Your text too short${englishNumberToPersianNumber(
        keys
      )} Word(Less than 2 words) Is. Write a longer text.`,
      1: `Your text short(${englishNumberToPersianNumber(
        keys
      )} Word) Is. Try to add some to the text.`,
      2: `Your text${englishNumberToPersianNumber(keys)} It has a word. How great!`,
    };
    return {
      title: "The number of text words",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };

  const existanceOfKeyphraseInTitle = () => {
    let score = 0;
    const isGood = title && keyphrase && title.includes(keyphrase);
    if (isGood) {
      score = 2;
    }
    const descriptions = {
      0: `You have not used the focal keyword in the page title. Be sure to use the keyword in the page title.`,
      1: ``,
      2: `In the page title, you use the focal keyword. Is it good!`,
    };
    return {
      title: "The existence of keywords in the title",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  const titleLength = () => {
    let score = 0;
    const chars = title ? title.length : 0;
    const isNormal = chars >= 30 && chars <= 60;
    const isGood = chars >= 40 && chars <= 50;
    if (isGood) {
      score = 2;
    } else if (isNormal) {
      score = 1;
    }

    const descriptions = {
      0: `SEO title${
        chars < 30
          ? "Too short(Less than 2 characters)"
          : chars > 60
          ? "very tall(More than 2 characters)"
          : ""
      } Is. Rewrite the SEO title.`,
      1: `SEO title${
        chars > 50
          ? "Much(1 to 2 characters)"
          : chars < 40
          ? "Short(1 to 2 characters)"
          : ""
      } Is. Try the title of the SEO${
        chars > 50 ? "Short" : chars < 40 ? "Taller" : ""
      } write.`,
      2: `SEO title length is appropriate. good job!`,
    };
    return {
      title: "SEO title",
      description: descriptions[score],
      situation: situations_persian_title[score],
      score,
    };
  };
  let score = 0;
  const result = {
    internal_link: internalLinkAnalysis(),
    outbound_link: outboundLinkAnalysis(),
    meta_descripttion_length: metaDescriptionLengthAnalysis(),
    keyphrase_existance_in_slug: keyphraseExistanceInSlug(),
    keyphrase_existance_in_first_paragraph:
      keyphraseExistanceInFirstParagraph(),
    keyphrase_length: keyphraseLengthAnalysis(),
    keyphrase_density: keyphraseDensityAnalysis(),
    body_length: bodyLength(),
    keyphrase_existance_in_title: existanceOfKeyphraseInTitle(),
    title_length: titleLength(),
  };
  Object.keys(result).forEach((key) => {
    score += result[key].score;
  });
  result.score = score;
  if (result.score > 12) {
    result.score_description = "Good";
  } else if (result.score >= 8) {
    result.score_description = "medium";
  } else if (result.score < 8) {
    result.score_description = "Bad";
  }
  return result;
};
