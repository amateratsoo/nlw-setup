import '../libs/dayjs';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Header } from '../components/Header';
import { HabitDay, daySize } from '../components/HabitDay';
import { Loading } from '../components/Loading';
import { generateDatesFromYearBeginning } from '../utils/generateDatesFromYearBeginning';
import { api } from '../libs/axios';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDatesFromYearBeginning();
const minSummaryDatesSize = 10 * 7; // 6 weeks, 4.2 months
const amountOfDaysToFill = minSummaryDatesSize - summaryDates!.length;

interface Summary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

function Home() {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState<null | boolean>(null);
  const [summary, setSummary] = useState<Summary[]>([]);

  async function fetchData() {
    try {
      setIsLoading(true);

      const response = await api.get('summary');
      setSummary(response.data);
    }

    catch (error) {
      console.log(error);
      Alert.alert('Oooops', 'Algo deu errado, por favor tente mais tarde');
    }

    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  if (isLoading) return <Loading />

  return (
    <View className='flex-1 px-8 pt-4 bg-dark-900'>
      <Header />

      <View className='flex-row mb-2 mt-1'>
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className='font-bold text-xl text-zinc-400 text-center mx-1'
            style={{ width: daySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 52 }}
      >
        <View className='flex-row flex-wrap'>
          {summaryDates?.map(date => {
            const dayInSummary = summary.find(day => dayjs(date).isSame(day.date, 'day'));

            return (
              <HabitDay 
                key={date.toString()}
                amount={dayInSummary?.amount}
                date={date}
                completed={dayInSummary?.completed} 
                onPress={() => navigate('habits', { date: date.toString() })} 
              />
            );
          })}
          {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill })
            .map((_, index) => (
              <View
                key={index}
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                style={{ width: daySize, height: daySize }} 
              />
            ))
          }
        </View>
      </ScrollView>
    </View>
  );
}

export { Home };
