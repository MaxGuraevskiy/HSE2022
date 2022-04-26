import { StatusBar } from "expo-status-bar";
import React, {useContext} from "react";
import { Button, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { OpenSansBold, OpenSansRegular } from "../components/StyledText";
import { View } from "../components/Themed";
import { userContext } from "../navigation";

export default function ModalScreen({ navigation, route }: any) {
  const {user, setUser} = useContext(userContext);
  return (
    <View style={styles.container}>
      <OpenSansBold>Вы выходите из аккаунта</OpenSansBold>
      <OpenSansRegular>Мы надеемся, вы нас не покидаете...</OpenSansRegular>
      <OpenSansRegular>Подтвердите выход</OpenSansRegular>
      <Ionicons.Button
        onPress={() => {
          navigation.navigate('Profile')
          setUser({id: user.id, name: '', email: 'Войдите в аккаунт', password: ''})
        }}
        name={'ios-arrow-back-circle-outline'}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
