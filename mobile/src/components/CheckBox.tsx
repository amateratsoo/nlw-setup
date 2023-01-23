import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

interface CheckBoxProps extends TouchableOpacityProps {
  isChecked?: boolean;
  title: string;
  fontWeight?: '400' | '600' | '700' | '800';
}

function CheckBox({ isChecked = false, title, fontWeight = '600', ...rest }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row mb-2 items-center'
      {...rest}
    >
      {isChecked ?
        <View className='h-8 w-8 bg-green-500 border border-green-500 rounded-md items-center justify-center'>
          <Feather name='check' size={20} color={colors.white} />
        </View>
        :
        <View className='h-8 w-8 bg-zinc-900 border border-zinc-800 rounded-md' />  
      }

      <Text 
        className='text-white text-base ml-3'
        style={{ fontWeight: fontWeight }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export { CheckBox };
