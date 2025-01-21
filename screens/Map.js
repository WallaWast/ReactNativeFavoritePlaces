import MapView, { Marker } from 'react-native-maps';
import { Alert, StyleSheet } from 'react-native';
import { useCallback, useLayoutEffect, useState } from 'react';
import OutlinedButton from '../components/UI/OutlinedButton';
import IconButton from '../components/UI/IconButton';

const Map = ({ navigation }) => {
	const [selectedLocation, setSelectedLocation] = useState();

	const region = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	function selectLocationHandler(event) {
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
		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton icon='save' size={24} color={tintColor} onPress={savePickedLocationHandler} />
			),
		});
	}, [navigation, savePickedLocationHandler]);

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
