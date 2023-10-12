import { StyleSheet, View, Text } from 'react-native';
import TriviaScreen from './screens/TriviaScrn/MainContainer';
import { TriviaBusinessDataProvider } from './providers/TriviaBusinessDataProvider.js';
import { TriviaViewDataProvider } from './providers/TriviaViewDataProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import DimensionsProvider from './providers/DimensionsProvider';

const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <DimensionsProvider>
        <TriviaViewDataProvider>
          <TriviaBusinessDataProvider>
            <TriviaScreen />
          </TriviaBusinessDataProvider>
        </TriviaViewDataProvider>
      </DimensionsProvider>
    </QueryClientProvider>
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
