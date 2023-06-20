/**
 *
 * @param date  takes Date from component and returns date format : "19.06.2023"
 */
export const changeDateFormat = (date: Date) => {
  const newDate = new Date(date);
  return `${newDate.getDate().toString().padStart(2, "0")}.${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${newDate.getFullYear().toString()}`;
};
