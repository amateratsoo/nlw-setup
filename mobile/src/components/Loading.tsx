import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

function Loading() {
  return (
    <View style={styles.container} >
      <ActivityIndicator color={colors.violet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark
  }
})

export { Loading };
