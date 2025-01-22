import { useEffect, useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../util/database';

const AllPlaces = () => {
	const [loadedPlaces, setLoadedPlaces] = useState([]);
	const isfocused = useIsFocused();

	useEffect(() => {
		async function loadPlaces() {
			const places = await fetchPlaces();
			setLoadedPlaces(places);
		}

		if (isfocused) {
			loadPlaces();
		}
	}, [isfocused]);

	return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
