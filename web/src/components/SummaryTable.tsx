import { useEffect, useState } from 'react';
import { api } from '../libs/axios';
import { HabitDay } from './HabitDay';
import { generateDatesFromYearBeginning } from '../utils/generateDatesFromYearBeginning';
import dayjs from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDatesFromYearBeginning();
const minSummaryDatesSize = 18 * 7; // 18 weeks, 4.2 months
const amountOfDaysToFill = minSummaryDatesSize - summaryDates!.length;

interface Summary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('summary');
      setSummary(response.data);
    }

    fetchData();
  }, [])

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className='text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold'>
            {weekDay}
          </div>
        ))}
      </div>

      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summaryDates?.map(date => {
          const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day'));

          return (
            <HabitDay 
              amount={dayInSummary?.amount}
              date={date}
              completed={dayInSummary?.completed} 
              key={date.toString()} 
            />
          )
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill })
          .map((_, index) => <div key={index} className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed' />)
        }
      </div>
    </div>
  );
}

export { SummaryTable };
