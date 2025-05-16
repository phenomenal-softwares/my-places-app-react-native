import { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import IconButton from "../components/UI/IconButton";

function AllPlaces({ navigation, route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  const addedPlaceIds = useRef(new Set());

  useEffect(() => {
    const newPlace = route.params?.place;

    if (isFocused && newPlace && !addedPlaceIds.current.has(newPlace.id)) {
      setLoadedPlaces((curPlaces) => [newPlace, ...curPlaces]);
      addedPlaceIds.current.add(newPlace.id);
    }

    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
        icon="add"
        size={24}
        color={tintColor}
        onPress={() => navigation.navigate("AddPlace")}
      />
      ),
    });
  }, [isFocused, route.params?.place, navigation]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
