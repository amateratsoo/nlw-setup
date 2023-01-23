import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { api } from '../libs/axios';
import * as CheckBox from './CheckBox';

interface HabitsListProps {
  date: Date;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>
  completedHabits: string[];
}

function HabitsList({ date }: HabitsListProps) {
  const [habitInfo, setHabitsInfo] = useState<HabitsInfo>();
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('day', {
        params: {
          date: date.toISOString()
        }
      });

      setHabitsInfo(response.data);
      console.log(response.data)
    }

    fetchData();
  }, []);

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted = habitInfo?.completedHabits.includes(habitId);
    await api.patch(`/habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitInfo!.completedHabits.filter(id => id !== habitId);
    }

    else {
      completedHabits = [...habitInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitInfo!.possibleHabits,
      completedHabits
    })
  }

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitInfo?.possibleHabits.map(habit => (
        <CheckBox.Popover 
          key={habit.id} 
          title={habit.title}
          disabled={isDateInPast}
          checked={habitInfo.completedHabits.includes(habit.id)}
          onCheckedChange={() => handleToggleHabit(habit.id)}
        />
      ))}
    </div>
  );
}

export { HabitsList };
