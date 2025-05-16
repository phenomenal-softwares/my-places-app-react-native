import { useEffect } from "react";
import { ScrollView, StyleSheet, Image, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButtton";
import { Colors } from "../constants/colors";

function PlaceDetails({ route, navigation }) {
    const { title, imageUri, lat, lng } = route.params;
  
    useEffect(() => {
      navigation.setOptions({
        title: title,
      });
    }, [navigation, title]);
  
    function showOnMapHandler() {
        navigation.navigate("Map", {
          initialLat: lat,
          initialLng: lng,
          isReadOnly: true,
        });
      }      
  
    return (
      <ScrollView>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}</Text>
          </View>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View on Map
          </OutlinedButton>
        </View>
      </ScrollView>
    );
  }  

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
