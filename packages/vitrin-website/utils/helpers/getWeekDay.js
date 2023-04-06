export function getWeekDay(dayId) {
  if (!dayId) return null;
  const weekDays = [
    { id: "6", description: "شنبه" },
    { id: "7", description: "یک‌شنبه" },
    { id: "1", description: "دوشنبه" },
    { id: "2", description: "سه‌شنبه" },
    { id: "3", description: "چهارشنبه" },
    { id: "4", description: "پنج‌شنبه" },
    { id: "5", description: "جمعه" },
  ];
  return weekDays.find((day) => day.id === dayId.toString())
    ? weekDays.find((day) => day.id === dayId.toString()).description
    : null;
}
