import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Habits, NewHabit } from '../screens/screens';

const { Navigator, Screen } = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
      <Screen name='home' component={Home} />
      <Screen name='habits' component={Habits} />
      <Screen name='newHabit' component={NewHabit} />
    </Navigator>
  );
}

export { AppRoutes };
