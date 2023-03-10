import dayjs from 'dayjs';

function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf('year');
  const today = new Date();

  let dates: Date[] = [];
  let compareDate = firstDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day')
  }

  return dates;
}

export { generateDatesFromYearBeginning };
