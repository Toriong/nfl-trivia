import { StyleSheet, View, Text } from 'react-native';
import TriviaScreen from './screens/TriviaScrn/MainContainer';
import { TriviaBusinessDataProvider } from './providers/TriviaBusinessDataProvider.js';
import { TriviaViewDataProvider } from './providers/TriviaViewDataProvider';

export default function App() {

  return (
    <TriviaViewDataProvider>
      <TriviaBusinessDataProvider>
        <TriviaScreen />
      </TriviaBusinessDataProvider>
    </TriviaViewDataProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
