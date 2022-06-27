import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import avatardefault from "../../../assets/img/avatar-default.jpg";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { auth, storage } from "../../utils/firebase";
import Loading from "../Loading";
import { useEffect } from "react";

export default function InfoUser(props) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
    updateControl,
    setRefreshing,
  } = props;

  useEffect(() => {
    updatePhoto();
  }, [updateControl]);

  const [loading, setLoading] = useState(false);

  const changeAvatar = async () => {
    const resultPermission = await Camera.requestPermissionsAsync();
    const resultPermissionCamera = await resultPermission.granted;

    if (!resultPermissionCamera) {
      toastRef.current.show("Es necesario aceptar los permisos de la galería");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("Haz cancelado la selección de imagen");
      } else {
        uploadImage(result.uri)
          .then(() => {
            updatePhoto();
          })
          .catch((error) => {
            setLoading(false);
            toastRef.current.show("Hubo un error");
          });
      }
    }
  };

  const uploadImage = async (uri) => {
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhoto = () => {
    storage
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await auth.currentUser.updateProfile(update);
        setRefreshing(false);
        setLoading(false);
        toastRef.current.show("Imagen subida");
      })
      .catch((error) => {
        setLoading(false);
        toastRef.current.show("Hubo un error");
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        containerStyle={styles.userInfoAvatar}
        source={photoURL ? { uri: photoURL } : avatardefault}>
        <Avatar.Accessory
          style={styles.accesory}
          iconStyle={styles.icon}
          onPress={() => changeAvatar()}
        />
      </Avatar>
      <View>
        <Text style={styles.name}>{displayName ? displayName : "Anónimo"}</Text>
        <Text>{email ? email : "Social media"}</Text>
      </View>
      <Loading isVisible={loading} text="Actualizando avatar" />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
    backgroundColor: "grey",
  },
  accesory: {
    borderRadius: 50,
    width: 25,
    height: 25,
  },
  icon: {
    fontSize: 12,
  },
  name: {
    fontWeight: "bold",
    paddingBottom: 5,
    fontSize: 18,
  },
});
