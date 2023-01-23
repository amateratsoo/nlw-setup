import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';

function Routes() {
  return (
    <View className='flex-1 bg-dark-900'>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}

export { Routes };
