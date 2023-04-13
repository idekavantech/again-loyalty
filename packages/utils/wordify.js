function wordifyfa(num = 0, level = 0) {
  function toEnglishDigits(num) {
    if (typeof num !== "string") return num;
    const faDigits = "۰۱۲۳۴۵۶۷۸۹";
    const arDigits = "٠١٢٣٤٥٦٧٨٩";
    let output = "";
    for (let ipos = 0; ipos < num.length; ipos++) {
      let faIndex = faDigits.indexOf(num[ipos]);
      if (faIndex >= 0) {
        output += faIndex.toString();
        continue;
      }
      let arIndex = arDigits.indexOf(num[ipos]);
      if (arIndex >= 0) {
        output += arIndex.toString();
        continue;
      }
      output += num[ipos];
    }
    return parseInt(output.replace(/,/g, ""));
  }

  if (num === null) {
    return "";
  }

  num = toEnglishDigits(num);

  // convert negative number to positive and get wordify value
  if (num < 0) {
    num = num * -1;
    return "Negative" + wordifyfa(num, level);
  }
  if (num === 0) {
    if (level === 0) {
      return "Zero";
    } else {
      return "";
    }
  }
  let result = "";
  const yekan = [
      " One",
      " two",
      " Three",
      " Four",
      " Five",
      " Six",
      " Seven",
      " eight",
      " No",
    ],
    dahgan = [
      " twenty",
      " C.",
      " Forty",
      " Fifty",
      " Sixty",
      " Seventy",
      " Eighty",
      " Ninety",
    ],
    sadgan = [
      " One hundred",
      " two hundred",
      " three hundred",
      " four hundred",
      " five hundred",
      " six hundred",
      " seven hundred",
      " eight hundred",
      " nine hundred",
    ],
    dah = [
      " Is",
      " Eleven",
      " twelve",
      " Thirteen",
      " fourteen",
      " Fifteen",
      " Sixteen",
      " Seventeen",
      " Eighteen",
      " Nineteen",
    ];
  if (level > 0) {
    result += " And";
    level -= 1;
  }

  if (num < 10) {
    result += yekan[num - 1];
  } else if (num < 20) {
    result += dah[num - 10];
  } else if (num < 100) {
    result += dahgan[Math.floor(num / 10) - 2] + wordifyfa(num % 10, level + 1);
  } else if (num < 1000) {
    result +=
      sadgan[Math.floor(num / 100) - 1] + wordifyfa(num % 100, level + 1);
  } else if (num < 1000000) {
    result +=
      wordifyfa(Math.floor(num / 1000), level) +
      " Thousand" +
      wordifyfa(num % 1000, level + 1);
  } else if (num < 1000000000) {
    result +=
      wordifyfa(Math.floor(num / 1000000), level) +
      " Million" +
      wordifyfa(num % 1000000, level + 1);
  } else if (num < 1000000000000) {
    result +=
      wordifyfa(Math.floor(num / 1000000000), level) +
      " billion" +
      wordifyfa(num % 1000000000, level + 1);
  } else if (num < 1000000000000000) {
    result +=
      wordifyfa(Math.floor(num / 1000000000000), level) +
      " Trip" +
      wordifyfa(num % 1000000000000, level + 1);
  }

  return result;
}

export function wordifyRials(num) {
  return wordifyfa(num, 0) + " Rial";
}
export function wordifyTomans(num) {
  return wordifyfa(num, 0) + " Toman";
}
export function wordifyRialsInTomans(num) {
  if (typeof num == "string") {
    num = parseInt(num);
  }
  if (num >= 10 || num <= -10) {
    num = Math.floor(num / 10);
  } else {
    num = 0;
  }
  return wordifyfa(num, 0) + " Toman";
}
