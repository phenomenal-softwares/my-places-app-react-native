import { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  const addedPlaceIds = useRef(new Set());

  useEffect(() => {
    const newPlace = route.params?.place;

    if (isFocused && newPlace && !addedPlaceIds.current.has(newPlace.id)) {
      setLoadedPlaces((curPlaces) => [newPlace, ...curPlaces]);
      addedPlaceIds.current.add(newPlace.id);
    }
  }, [isFocused, route.params?.place]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
