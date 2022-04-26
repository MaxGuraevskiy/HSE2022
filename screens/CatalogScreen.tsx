import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import { View } from "../components/Themed";
import { OpenSansBold, OpenSansRegular } from "../components/StyledText";
import Colors from "../constants/Colors";
import Layout, { normalize } from "../constants/Layout";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";

const DATA = [
  {
    id: "0",
    title: "Snowboard",
    iconFamily: "FontAwesome5",
    iconName: "snowboarding",
  },
  {
    id: "1",
    title: "Ski",
    iconFamily: "FontAwesome5",
    iconName: "skiing",
  },
  {
    id: "2",
    title: "Ski suit",
    iconFamily: "MaterialCommunityIcons",
    iconName: "human-male-height",
  },
  {
    id: "3",
    title: "Ski mask",
    iconFamily: "FontAwesome5",
    iconName: "mask",
  },
  {
    id: "4",
    title: "Boots",
    iconFamily: "FontAwesome5",
    iconName: "shoe-prints",
  },
  {
    id: "5",
    title: "Gloves",
    iconFamily: "FontAwesome5",
    iconName: "mitten",
  },
  {
    id: "6",
    title: "Helmet",
    iconFamily: "MaterialCommunityIcons",
    iconName: "racing-helmet",
  },
  {
    id: "7",
    title: "Other",
    iconFamily: "FontAwesome5",
    iconName: "biohazard",
  },
];

function MCIIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  size: React.ComponentProps<typeof MaterialCommunityIcons>["size"];
}): JSX.Element {
  return <MaterialCommunityIcons {...props} />;
}

function FA5Icon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
  size: React.ComponentProps<typeof FontAwesome5>["size"];
}): JSX.Element {
  return <FontAwesome5 {...props} />;
}

function CatalogIcon({ item }: any): JSX.Element {
  const colorScheme = useColorScheme();
  const [iconSize, setIconSize] = React.useState(32);
  if (Layout.isSmallDevice) {
    setIconSize(24);
  }

  switch (item.iconFamily) {
    case "MaterialCommunityIcons": {
      return (
        <MCIIcon
          name={item.iconName}
          color={Colors[colorScheme].tabIconSelected}
          size={normalize(iconSize)}
        />
      );
    }
    case "FontAwesome5": {
      return (
        <FA5Icon
          name={item.iconName}
          color={Colors[colorScheme].tabIconSelected}
          size={normalize(iconSize)}
        />
      );
    }
    default: {
      return <FontAwesome5 name="dev" size={24} color="black" />;
    }
  }
}

const Item = ({ item, onPress, borderColor, selectedCategory, navigation }: any) => (
  <TouchableOpacity
    onPress={() => {navigation.navigate("ListItem",  {category: selectedCategory, navigation: navigation}) }}
    style={[styles.item, styles.center, borderColor]}
  >
    <CatalogIcon item={item} />
    <OpenSansRegular>{item.title}</OpenSansRegular>
  </TouchableOpacity>
);

function CatalogScreen({
  navigation,
}: RootTabScreenProps<"Catalog">): JSX.Element {
  const [catalog, setCatalog] = React.useState(DATA);
  const [selectedId, setSelectedId] = React.useState(1);
  const colorScheme = useColorScheme();
  function renderItem({ item }: any) {
    const borderColor = Colors[colorScheme].tabIconSelected;
    return (
      <Item
        item={item}
        selectedCategory={catalog[item.id].title}
        navigation={navigation}
        borderColor={{ borderColor }} />
    );
  }

  const [refreshing, setRefreshing] = React.useState(false);

  function getData(data: any[]) {
    // console.log(data);
    data = data.map((d) => ({
      id: d.id.toString(),
      title: d.title,
      iconFamily: d.iconFamily,
      iconName: d.iconName,
    }));
    // console.log(data);
    setCatalog(data);
  }

  const getCatalog = async () => {
    setCatalog([]);
    setRefreshing(true);
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer " + jwt);

    // var requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    // };

    // await fetch("https://checkpoint-server-db.herokuapp.com/api/pass/1/history?page=0&size=100", requestOptions)
    //     .then(response => response.json())
    //     .then(result => getData(result.result))
    //     .catch(error => console.log('error', error));

    getData(DATA); // убрать, когда будет работать сервер

    setRefreshing(false);
  };

  React.useEffect(() => {
    getCatalog();
  }, []);

  return (
    <View style={[styles.container, styles.center]}>
      <FlatList
        data={catalog}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        numColumns={2}
        onRefresh={getCatalog}
        refreshing={refreshing}
        style={styles.list}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListEmptyComponent={() => {
          Alert.alert("Ошибка", "Не удалось загрузить список категорий");
          return (
            <OpenSansRegular>
              Не удалось загрузить список категорий
            </OpenSansRegular>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    width: "100%",
    alignContent: "center",
  },
  item: {
    width: Layout.window.width / 2 - 20,
    // aspectRatio: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 5,
  },
});

export default CatalogScreen;
