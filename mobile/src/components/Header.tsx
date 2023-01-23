import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/logo.svg';

function Header() {
  const { navigate } = useNavigation();

  return (
    <View className='w-full flex-row items-center justify-between'>
      <Logo width={118} height={118} />
      
      <TouchableOpacity
        className='flex-row h-11 px-4 border border-violet-500 rounded-lg items-center'
        activeOpacity={0.7}
        onPress={() => navigate('newHabit')}
      >
        <Feather
          name='plus'
          color={colors.violet['500']}
          size={20}
        />

        <Text className='text-white ml-3 font-semibold text-base'>
          Novo
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export { Header };
