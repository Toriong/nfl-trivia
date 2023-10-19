import { StyleSheet, View, Text } from 'react-native';
import { TriviaBusinessDataProvider } from './providers/TriviaBusinessDataProvider.js';
import { TriviaViewDataProvider } from './providers/TriviaViewDataProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import NavigationContainer from './NavigationContainer.js';

const queryClient = new QueryClient()

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <TriviaViewDataProvider>
        <TriviaBusinessDataProvider>
          <NavigationContainer />
        </TriviaBusinessDataProvider>
      </TriviaViewDataProvider>
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
