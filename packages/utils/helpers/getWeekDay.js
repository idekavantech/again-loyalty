export function getWeekDay(dayId) {
  if (!dayId) return null;
  const weekDays = [
    { id: "6", description: "Saturday" },
    { id: "7", description: "Sunday" },
    { id: "1", description: "Monday" },
    { id: "2", description: "Tuesday" },
    { id: "3", description: "Wednesday" },
    { id: "4", description: "Thursday" },
    { id: "5", description: "Friday" },
  ];
  return weekDays.find((day) => day.id === dayId.toString())
    ? weekDays.find((day) => day.id === dayId.toString()).description
    : null;
}
