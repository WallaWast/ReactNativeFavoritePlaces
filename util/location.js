const GOOGLE_API_KEY = 'API_KEY';

export const getMapPreview = (lat, lon) => {
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lon}&key=${GOOGLE_API_KEY}`;
	return imagePreviewUrl;
};

export const getAddress = async (lat, lng) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Failed to fetch address. Please try again!');
	}

	const data = await response.json();
	const address = data.results[0].formatted_address;
	return address;
};
