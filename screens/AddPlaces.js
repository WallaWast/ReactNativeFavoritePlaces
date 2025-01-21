import PlaceForm from '../components/Places/PlaceForm';

const AddPlaces = ({ navigation }) => {
	function createPlaceHandler(place) {
		console.log('New Place', place);
		navigation.navigate('AllPlaces', { place: place });
	}

	return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
