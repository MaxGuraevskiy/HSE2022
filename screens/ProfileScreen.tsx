import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Entypo, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { userContext } from "../navigation";

import { View } from "../components/Themed";
import { OpenSansBold, OpenSansRegular } from "../components/StyledText";
import Context from "../components/Context";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Layout, { normalize } from "../constants/Layout";

const DATA = {
  id: "0",
  name: "Max Guraevskiy",
  password: "qwerty123",
  email: "mdguraevskiy@edu.hse.ru",
};

const getUserText = (user: any): JSX.Element => {
  console.log(user);
  // if (user == undefined || user.name == '' || user == {})
  //   return <OpenSansBold>Ввойдите в аккаунт</OpenSansBold>;

  // else
  return (
    <View>
      <OpenSansBold>{user.name}</OpenSansBold>
      <OpenSansRegular>{user.email}</OpenSansRegular>
    </View>
  );
};

function ProfileScreen(
  { navigation }: RootTabScreenProps<"Profile">,
  { route }: any
) {
  const {user, setUser} = useContext(userContext);
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'flex-end' }}>
        <SimpleLineIcons.Button
          name={"logout"}
          onPress={() => {
            navigation.navigate("Modal");
          }}
        >
          Выход
        </SimpleLineIcons.Button>
      </View>
      <OpenSansBold style={styles.text}>{user.name}</OpenSansBold>
      <OpenSansRegular>{user.email}</OpenSansRegular>
      <View style={{ paddingVertical: 20 }}>
        <Ionicons.Button
          name={"ios-enter-outline"}
          onPress={() => {
            navigation.navigate("Auth");
          }}
        >
          Вход
        </Ionicons.Button>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  text: {
    marginVertical: 10,
  },
});
