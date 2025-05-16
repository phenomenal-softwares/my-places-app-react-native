import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'user_places';

export async function savePlacesToStorage(places) {
  try {
    const jsonValue = JSON.stringify(places);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.log('Error saving places to storage:', error);
  }
}

export async function loadPlacesFromStorage() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log('Error loading places from storage:', error);
    return [];
  }
}
