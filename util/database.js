import * as SQLite from 'expo-sqlite';

async function openDatabase() {
	return SQLite.openDatabaseAsync('places');
}

export async function init() {
	try {
		console.log('Initializing database...');
		const db = await openDatabase();
		console.log('Database instance obtained.');

		await db.withTransactionAsync(async () => {
			console.log('Starting transaction...');
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
			console.log('Table created or already exists.');
		});

		console.log('Transaction completed successfully.');
	} catch (error) {
		console.error('Error during database initialization:', error);
		throw error; // Re-throw error for further handling
	}
}
