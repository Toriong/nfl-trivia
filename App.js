import { StyleSheet, View, Text } from 'react-native';
import { TriviaBusinessDataProvider } from './providers/TriviaBusinessDataProvider.js';
import { TriviaViewDataProvider } from './providers/TriviaViewDataProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';;
import TriviaScreen from './screens/TriviaScrn/MainContainer';
import ResultScreen from './screens/ResultsScrn/MainContainer'

const queryClient = new QueryClient()
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <TriviaViewDataProvider>
        <TriviaBusinessDataProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="TriviaScreen" component={TriviaScreen} />
            </Stack.Navigator>
          </NavigationContainer>
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
