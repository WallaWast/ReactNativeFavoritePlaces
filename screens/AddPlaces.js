import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../util/database';

const AddPlaces = ({ navigation }) => {
	async function createPlaceHandler(place) {
		//console.log('New Place', place);
		await insertPlace(place);
		navigation.navigate('AllPlaces');
	}

	return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlaces;
