export function getMonthName(monthId) {
  const months = [
    { id: 1, description: "فروردین" },
    { id: 2, description: "اردیبهشت" },
    { id: 3, description: "خرداد" },
    { id: 4, description: "تیر" },
    { id: 5, description: "مرداد" },
    { id: 6, description: "شهریور" },
    { id: 7, description: "مهر" },
    { id: 8, description: "آبان" },
    { id: 9, description: "آذر" },
    { id: 10, description: "دی" },
    { id: 11, description: "بهمن" },
    { id: 12, description: "اسفند" },
  ];
  return months.find((month) => month.id === monthId)
    ? months.find((month) => month.id === monthId).description
    : null;
}
