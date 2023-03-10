import clsx from 'clsx';
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import { HabitsList } from './HabitsList';
import dayjs from 'dayjs';

interface HabitDayProps {
  date: Date;
  completed?: number;
  amount?: number;
}

function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
  
  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfTheWeek = dayjs(date).format('dddd');

  return (
    <Popover.Root>
      <Popover.Trigger 
        className={clsx('w-10 h-10 border-2 rounded-lg', {
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
          'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
        })} 
      />

      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-lg bg-zinc-900 flex flex-col text-white'>
          <Popover.Arrow width={18} height={10} className='fill-zinc-900' />
          
          <span className='font-semibold text-zinc-400'>{dayOfTheWeek}</span>
          <span className='mt-1 font-bold leading-tight text-3xl'>{dayAndMonth}</span>
          <ProgressBar progress={completedPercentage} />
          <HabitsList date={date} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { HabitDay };
