import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { NavigateToPrevButton } from '../components/NavigateToPrevButton';
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';

interface Params {
  date: string;
}

function Habits() {
  const { date } = useRoute().params as Params;

  const parsedDate = dayjs(date);
  const dayOfTheWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM')

  return (
    <View className='flex-1 bg-dark-900 px-8 pt-14'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <NavigateToPrevButton />

        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfTheWeek}
        </Text>

        <Text className='text-white font-bold text-3xl'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={50} />

        <View className='mt-6'>
          <CheckBox
            title='Beber 3L de água'
          />

          <CheckBox 
            title='Treino brabo'
            isChecked
          />
        </View>
      </ScrollView>
    </View>
  );
}

export { Habits };
