import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

function Map() {
  return (
    <View style={styles.map}>
      <Text style={styles.text}>
        Sorry, React Native Maps not supported on the web!
      </Text>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  text: {
    fontSize: 20,
    color: Colors.primary100,
  },
});
