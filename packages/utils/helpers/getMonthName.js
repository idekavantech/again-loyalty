export function getMonthName(monthId) {
  const months = [
    { id: 1, description: "farvardin" },
    { id: 2, description: "Ordibehesht" },
    { id: 3, description: "Khordad" },
    { id: 4, description: "Tir" },
    { id: 5, description: "Mordad" },
    { id: 6, description: "Shahrivar" },
    { id: 7, description: "stamp" },
    { id: 8, description: "Aban" },
    { id: 9, description: "Fire" },
    { id: 10, description: "Held" },
    { id: 11, description: "Avalanche" },
    { id: 12, description: "Esfand" },
  ];
  return months.find((month) => month.id === monthId)
    ? months.find((month) => month.id === monthId).description
    : null;
}
