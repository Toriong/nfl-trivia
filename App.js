import { StyleSheet } from 'react-native';
import TriviaScreen from './screens/TriviaScrn/MainContainer.js';
import { TriviaBusinessProvider } from './providers/TriviaBusinessDataProvider.js';

export default function App() {

  // return (
  //   <TriviaBusinessProvider>
  //     <TriviaScreen />
  //   </TriviaBusinessProvider>
  // );
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
