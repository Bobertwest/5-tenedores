import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import { Button } from "react-native-elements";
import { auth } from "../../utils/firebase";
import InfoUser from "../../components/Account/InfoUser";
import { useNavigation } from "@react-navigation/native";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [reloadUser, setReloadUser] = useState(false);

  useEffect(() => {
    (async () => {
      const user = auth.currentUser;
      setUserInfo(user);
    })();
    setReloadUser(false);
    setRefreshing(false);
  }, [reloadUser]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setReloadUser(true);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.viewUserInfo}>
        {userInfo && <InfoUser userInfo={userInfo} toastRef={toastRef} />}
        <AccountOptions
          userInfo={userInfo}
          toastRef={toastRef}
          setReloadUser={setReloadUser}
        />
        <Button
          title="Cerrar sesión"
          buttonStyle={styles.btnsCloseSession}
          titleStyle={styles.btnsCloseSessionText}
          onPress={() => auth.signOut()}
        />
        <Toast ref={toastRef} position="center" opacity={(0, 2)} />
        <Loading text={loadingText} isVisible={loading} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnsCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnsCloseSessionText: {
    color: "#00a680",
  },
});
