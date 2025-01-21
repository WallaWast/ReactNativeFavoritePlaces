import { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';

const AllPlaces = ({ route }) => {
	const [loadedPlaces, setLoadedPlaces] = useState([]);
	const isfocused = useIsFocused();

	useEffect(() => {
		if (isfocused && route.params) {
			setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
		}
	}, [isfocused, route]);

	return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
