import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { generateProgressPercentage } from '../utils/generateProgressPercentage';

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;
const dayMarginBetween = 8;
const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5);

interface HabitDayProps extends TouchableOpacityProps {
  date: Date;
  completed?: number;
  amount?: number;
}

function HabitDay({ date, amount = 0, completed = 0, ...rest }: HabitDayProps) {
  const percentage = generateProgressPercentage({ amount, completed });
  const today = dayjs().startOf('day');
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={{ width: daySize, height: daySize }} 
      className={clsx('border-2 rounded-lg m-1', {
        'bg-violet-500 border-violet-400': percentage >= 80,
        'bg-violet-600 border-violet-500': percentage >= 60 && percentage < 80,
        'bg-violet-700 border-violet-500': percentage >= 40 && percentage < 60,
        'bg-violet-800 border-violet-600': percentage >= 20 && percentage < 40,
        'bg-violet-900 border-violet-700': percentage > 0 && percentage < 20,
        'bg-zinc-900 border-zinc-800': percentage === 0,
        'border-2 border-zinc-400': isCurrentDay
      })} 
      {...rest}
    />
  );
}

export { HabitDay, dayMarginBetween, daySize };
