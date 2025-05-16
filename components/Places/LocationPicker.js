import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButtton";
import LoadingOverlay from "../UI/LoadingOverlay";

function LocationPicker({onPickLocation}) {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused(); // Check if the screen is focused

  const [isFetching, setIsFetching] = useState(false); // New state for loading

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      }; // Get location from map if available
      setPickedLocation(mapPickedLocation); // Set picked location from map
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);

  useEffect(() => {
    if (!locationPermissionInformation) return;
    }, [locationPermissionInformation]);
  

  async function verifyPermissions() {
    try {
      const { granted, canAskAgain, status } = await requestPermission();
      if (!granted && !canAskAgain) {
        Alert.alert(
          "Permissions permanently denied",
          "Please enable location permissions in your system settings."
        );
        return false;
      }
  
      return granted;
    } catch (err) {
      console.error("Permission check error:", err);
      return false;
    }
  }
  

  async function getLocationHandler() {
    setIsFetching(true); // Activate loading state
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        setIsFetching(false); // Deactivate if permission denied
        return;
      }

      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Error", "Could not fetch location. Please try again.");
      console.error("Location Error:", error);
    } finally {
      setIsFetching(false); // Always deactivate loading state
    }
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  // Show loading overlay while fetching
  if (isFetching) {
    return <LoadingOverlay message="Fetching your location..." />;
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <>
            <Text>Picked Location:</Text>
            <Text>{`Lat: ${pickedLocation.lat}, Lng: ${pickedLocation.lng}`}</Text>
          </>
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
