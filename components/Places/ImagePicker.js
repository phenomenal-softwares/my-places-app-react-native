import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButtton";

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
  const [mediaPermissionInformation, requestMediaPermission] = useMediaLibraryPermissions();

  async function verifyPermissions() {
    let hasCameraPermission = cameraPermissionInformation?.status === PermissionStatus.GRANTED;
    let hasMediaPermission = mediaPermissionInformation?.status === PermissionStatus.GRANTED;
  
    if (!hasCameraPermission) {
      const cameraStatus = await requestCameraPermission();
      hasCameraPermission = cameraStatus.granted;
    }
  
    if (!hasMediaPermission) {
      const mediaStatus = await requestMediaPermission();
      hasMediaPermission = mediaStatus.granted;
    }
  
    if (!hasCameraPermission || !hasMediaPermission) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera and media library permissions to use this feature."
      );
      return false;
    }
  
    return true;
  }
  

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    
    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
    }
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
