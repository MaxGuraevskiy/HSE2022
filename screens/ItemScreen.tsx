import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { View } from "../components/Themed";
import { OpenSansBold, OpenSansRegular } from "../components/StyledText";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Layout, { normalize } from "../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";

function ItemScreen({ route }: any): JSX.Element {
  const { id, title, oldPrice, newPrice, image, description, categories } =
    route.params.item;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
      <OpenSansRegular>{oldPrice}₽</OpenSansRegular>
      <OpenSansBold>{newPrice}₽</OpenSansBold>
      <OpenSansBold>{title}</OpenSansBold>
      <OpenSansRegular>{description}</OpenSansRegular>
      <OpenSansRegular>Попадает под категории [{[...categories].join(', ')}]</OpenSansRegular>
      <MaterialCommunityIcons.Button name={"shopping-outline"} onPress={() => {}}>В корзину</MaterialCommunityIcons.Button>
    </SafeAreaView>
  );
}

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  image: {
    width: Layout.window.width / 2,
    height: Layout.window.width / 2,
  },
});
