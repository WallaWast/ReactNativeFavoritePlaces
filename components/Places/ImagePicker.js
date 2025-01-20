import { Alert, Image, View, Text, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

function ImagePicker() {
	const [pickedImage, setPickedImage] = useState();
	const [camerPermissionInformation, requestPermission] = useCameraPermissions();

	async function verifyPermission() {
		console.log('Current camera permission status:', camerPermissionInformation.status);

		if (camerPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			console.log('Permission response:', permissionResponse);
			return permissionResponse.granted;
		}

		if (camerPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert('Insufficient Permission!', 'You need to grant camera permission to use this app.');
			return false;
		}

		return true;
	}

	async function takeImageHandler() {
		const hasPermission = await verifyPermission();

		if (!hasPermission) {
			return;
		}

		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		console.log(image);
		setPickedImage(image.assets[0].uri);
	}

	let imagePreview = <Text>No image taken yet.</Text>;

	if (pickedImage) {
		imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton icon='camera' onPress={takeImageHandler}>
				Take picture
			</OutlinedButton>
		</View>
	);
}

export default ImagePicker;

const styles = StyleSheet.create({
	imagePreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
