import { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { api } from '../libs/axios';
import { NavigateToPrevButton } from '../components/NavigateToPrevButton';
import { CheckBox } from '../components/CheckBox';

const possibleWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function NewHabit() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState('');

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prev => prev.filter(weekDay => weekDay != weekDayIndex))
    }

    else {
      setWeekDays(prev => [...prev, weekDayIndex]);
    }
  }

  async function createNewHabit() {
    try {
      if (!title || weekDays.length === 0) return;

      await api.post('habits', {
        title,
        weekDays
      });
  
      Alert.alert('Parabéns 🎉', 'Está a um passo de se tornar uma melhor versão de você mesmo')
  
      setTitle('');
      setWeekDays([]);
    }

    catch (error) {
      console.log(error);
      Alert.alert('Ooops', 'Algo deu errado, por favor tente mais tarde');
    }
  }

  return (
    <View className='flex-1 bg-dark-900 px-8 pt-14'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <NavigateToPrevButton />

        <Text className='mt-6 text-white font-bold text-3xl'>
          Criar hábito
        </Text>

        <Text className='mt-6 text-white font-semibold text-base'>
          Qual seu comprometimento?
        </Text>

        <TextInput 
          className='h-12 pl-4 rounded-md mt-3 bg-zinc-800 text-white border-2 border-zinc-800 focus:border-zinc-700'
          placeholder='ex.: Exercícios, dormir bem, etc...'
          placeholderTextColor={colors.zinc['400']}
          value={title}
          onChangeText={event => setTitle(event.trim())}
        />

        <Text className='mt-4 mb-3 text-white font-semibold text-base'>
          Qual a recorrência?
        </Text>

        {possibleWeekDays.map((weekDay, index) => (
          <CheckBox 
            title={weekDay}
            isChecked={weekDays.includes(index)}
            fontWeight='400'
            key={weekDay}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
          onPress={createNewHabit}
        >
          <Feather name='check' size={20} color={colors.white} />
          <Text className='font-semibold text-base text-white ml-2'>
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export { NewHabit };
