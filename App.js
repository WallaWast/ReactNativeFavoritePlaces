import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState, useCallback } from 'react';
import { init } from './util/database';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	useEffect(() => {
		async function prepare() {
			await init();
			setAppIsReady(true);
		}
		prepare();
	}, []);

	if (!appIsReady) {
		return null;
	}

	SplashScreen.hide();

	return (
		<>
			<StatusBar style='dark' />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: Colors.primary500 },
						headerTintColor: Colors.gray700,
						contentStyle: { backgroundColor: Colors.gray700 },
					}}
				>
					<Stack.Screen
						name='AllPlaces'
						component={AllPlaces}
						options={({ navigation }) => ({
							title: 'Your Favorite Places',
							headerRight: ({ tintColor }) => (
								<IconButton icon='add' size={24} color={tintColor} onPress={() => navigation.navigate('AddPlaces')} />
							),
						})}
					/>
					<Stack.Screen
						name='AddPlaces'
						component={AddPlaces}
						options={{
							title: 'Add a new Place',
						}}
					/>
					<Stack.Screen name='Map' component={Map} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
