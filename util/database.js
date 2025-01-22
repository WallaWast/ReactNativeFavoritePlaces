import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

async function openDatabase() {
	return SQLite.openDatabaseAsync('places');
}

export async function init() {
	try {
		//console.log('Initializing database...');
		const db = await openDatabase();
		//console.log('Database instance obtained.');

		await db.withTransactionAsync(async () => {
			//console.log('Starting transaction...');
			await db.execAsync(
				`CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                );`
			);
			//console.log('Table created or already exists.');
		});

		//console.log('Transaction completed successfully.');
	} catch (error) {
		console.error('Error during database initialization:', error);
		throw error; // Re-throw error for further handling
	}
}

export async function insertPlace(place) {
	try {
		console.log('Place to add: ', place);
		const db = await openDatabase();
		const result = await db.runAsync(
			`INSERT
		    INTO places (title, imageUri, address, lat, lng)
		    VALUES (?, ?, ?, ?, ?)`,
			[place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
		);

		//console.log(result);
	} catch (error) {
		console.error('Error during insert new place:', error);
		throw error; // Re-throw error for further handling
	}
}

export const fetchPlaces = async () => {
	const places = [];
	try {
		const db = await openDatabase();
		const allRows = await db.getAllAsync(`SELECT * FROM places`, []);

		for (const place of allRows) {
			places.push(
				new Place(
					place.title,
					place.imageUri,
					{
						address: place.address,
						lat: place.lat,
						lng: place.lng,
					},
					place.id
				)
			);
		}

		return places;
	} catch (error) {
		console.error('Error during fetch places:', error);
		throw error; // Re-throw error for further handling
	}
};

export const fetchPlaceDetails = async (id) => {
	try {
		const db = await openDatabase();
		const place = await db.getFirstAsync(`SELECT * FROM places WHERE id = ?`, [id]);

		//console.log('Place details:', place);

		return new Place(
			place.title,
			place.imageUri,
			{
				address: place.address,
				lat: place.lat,
				lng: place.lng,
			},
			place.id
		);
	} catch (error) {
		console.error('Error during fetch place details:', error);
		throw error; // Re-throw error for further handling
	}
};
