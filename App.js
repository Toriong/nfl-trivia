import { StyleSheet } from 'react-native';
import TriviaScreen from './screens/TriviaScrn/MainContainer.js';

export default function App() {

  return <TriviaScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
