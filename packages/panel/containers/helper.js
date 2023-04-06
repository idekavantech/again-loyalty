// TODO: NAMING (TRANSACTIONS)
export const reportSerializer = (from, to, data) => {
  const datesRange = getDatesBetween(new Date(from), new Date(to));
  const serializedData = datesRange.map((date) => {
    const currentDate = new Date(date);
    const foundedData = data.filter((_data) => {
      const _dataDate = new Date(_data.timestamp);
      return (
        _dataDate.getDate() === currentDate.getDate() &&
        _dataDate.getMonth() === currentDate.getMonth() &&
        _dataDate.getFullYear() === currentDate.getFullYear()
      );
    });
    if (foundedData.length > 0) {
      return foundedData;
    }
    return {
      timestamp: currentDate.getTime(),
    };
  });
  return serializedData;
};
export const multibranchesReportSerializer = (
  from,
  to,
  data,
  isMultiBranch
) => {
  const datesRange = getDatesBetween(new Date(from), new Date(to));

  const serializedData = datesRange.map((date) => {
    const currentDate = new Date(date);
    const foundTransaction = data.filter((transaction) => {
      const transactionDate = new Date(transaction.timestamp);
      return (
        transactionDate.getDate() === currentDate.getDate() &&
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear()
      );
    });
    if (foundTransaction.length > 0 && isMultiBranch) {
      return foundTransaction;
    } else if (foundTransaction.length > 0 && !isMultiBranch) {
      return foundTransaction[0];
    }
    return {
      timestamp: currentDate.getTime(),
    };
  });
  return serializedData;
};
export const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  while (currentDate <= endDate) {
    dates.push(currentDate);

    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1 // Will increase month if over range
    );
  }
  return dates;
};

export const businessBranchesDataMerger = (_rawData, selectedBranches) => {
  const businessBranchesMergedData = _rawData.map((_dataPerDay) => {
    if (_dataPerDay.length > 0) {
      return _dataPerDay
        .filter((branchData) =>
          selectedBranches.includes(branchData.business_id)
        )
        .reduce(
          (previousBranchData, nextBranchData) => {
            Object.keys(nextBranchData).map((key) => {
              previousBranchData[key] =
                previousBranchData[key] &&
                typeof previousBranchData[key] === "number" &&
                key !== "timestamp"
                  ? previousBranchData[key] + nextBranchData[key]
                  : nextBranchData[key];
            });
            return previousBranchData;
          },
          { timestamp: _dataPerDay[0].timestamp }
        );
    } else return _dataPerDay;
  });
  return businessBranchesMergedData;
};

export const formatDate = (date) => {
  date.toISOString().split("T")[0];
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
export const previousDatesGenerator = (from, to) => {
  const comparedDataToDate = new Date(from);
  const diffrenceOfFromTo =
    (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 3600 * 24);
  const comparedDataFromDate = new Date(comparedDataToDate);
  comparedDataFromDate.setDate(
    comparedDataFromDate.getDate() - diffrenceOfFromTo
  );
  return [formatDate(comparedDataFromDate), formatDate(comparedDataToDate)];
};

export const convertEnglishNumToPersianNum = (enNum) => {
  return enNum.toString().replace(/\d/g, function (d) {
    return priceFormatter(String.fromCharCode(d.charCodeAt(0) + 1728));
  });
};
