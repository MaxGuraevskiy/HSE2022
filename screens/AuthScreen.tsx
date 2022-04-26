import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { Button, Platform, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";
import { OpenSansBold, OpenSansRegular } from "../components/StyledText";
import { userContext } from "../navigation";

function AuthScreen({ navigation, route }: any) {
  const [login, onChangeLogin] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const {user, setUser} = useContext(userContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Войти в аккаунт</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLogin}
          value={login}
          placeholder="Login"
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
        />
      </View>
      <Button
        onPress={() => {
          navigation.navigate('Profile')
          setUser({id: user.id, name: 'Max Guraevskiy', email: login, password: password})
        }}
        title="Войти"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 200,
  },
});
function merge(
  arg0: string,
  arg1: { user: { login: string; password: string } },
  merge: any
) {
  throw new Error("Function not implemented.");
}
