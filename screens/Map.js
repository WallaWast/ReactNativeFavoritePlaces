import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import IconButton from '../components/UI/IconButton';

const Map = ({ navigation, route }) => {
	const initialLocation = route.params && {
		latitude: route.params.initialLat,
		longitude: route.params.initialLng,
	};

	const [selectedLocation, setSelectedLocation] = useState(initialLocation);

	const region = {
		latitude: initialLocation ? initialLocation.latitude : 37.78,
		longitude: initialLocation ? initialLocation.longitude : -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	function selectLocationHandler(event) {
		if (initialLocation) {
			return;
		}

		const lat = event.nativeEvent.coordinate.latitude;
		const lng = event.nativeEvent.coordinate.longitude;

		setSelectedLocation({ latitude: lat, longitude: lng });
	}

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert('No location picked!', 'Please pick a location on the map.', [{ text: 'Okay' }]);
			return;
		}
		navigation.navigate('AddPlaces', { pickedLat: selectedLocation.latitude, pickedLng: selectedLocation.longitude });
	}, [navigation, selectedLocation]);

	useLayoutEffect(() => {
		if (initialLocation) {
			return;
		}

		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton icon='save' size={24} color={tintColor} onPress={savePickedLocationHandler} />
			),
		});
	}, [navigation, initialLocation, savePickedLocationHandler]);

	return (
		<MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
			{selectedLocation && <Marker coordinate={selectedLocation}></Marker>}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});
