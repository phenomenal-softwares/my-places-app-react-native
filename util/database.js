import { openDatabaseAsync } from 'expo-sqlite';

let database;

export async function init() {
  try {
    if (!database) {
      database = await openDatabaseAsync('places.db');
    }

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);

  } catch (error) {
    console.error('Error initializing DB:', error);
    throw error;
  }
}

export async function insertPlace(place) {
  console.log("insertPlace called with:", place);

  if (!place || typeof place !== "object") {
    console.error("Invalid place object:", place);
    throw new Error("Invalid place data. Expected an object.");
  }

  if (!place.title || !place.imageUri || !place.location) {
    console.error("Missing required fields in place:", place);
    throw new Error("Missing data in place object.");
  }

  if (!database) {
    console.error("Database not initialized.");
    throw new Error("Database not initialized. Call init() first.");
  }

  try {
    let result;
    await database.withTransactionAsync(async (tx) => {
      result = await tx.executeSqlAsync(
        `INSERT INTO places (title, imageUri, lat, lng) VALUES (?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.location.lat,
          place.location.lng,
        ]
      );
    });

    console.log("Inserted place:", result);
    return result;
  } catch (error) {
    console.error("Error inserting place:", error);
    throw error;
  }
}
