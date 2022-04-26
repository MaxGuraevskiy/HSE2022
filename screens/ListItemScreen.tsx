import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { OpenSansBold, OpenSansRegular } from "../components/StyledText";
import { RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Layout, { normalize } from "../constants/Layout";

const DATA = [
  {
    id: "0",
    title: "TERMIT",
    oldPrice: 14999,
    newPrice: 13999,
    image:
      "https://cdn.sptmr.ru/upload/resize_cache/iblock/33d/800_800_1/53195980299.jpg",
    description: "Сноуборд детский Termit Jockey",
    categories: ["Snowboard", "Ski", "Ski suit"],
  },
  {
    id: "1",
    title: "HEAD",
    oldPrice: 54999,
    newPrice: 53999,
    image:
      "https://cdn.sptmr.ru/upload/resize_cache/iblock/94d/800_800_1/53592420299.jpg",
    description: "Сноуборд Head Architect",
    categories: ["Snowboard", "Ski mask", "Boots"],
  },
  {
    id: "2",
    title: "CAPITA",
    oldPrice: 83999,
    newPrice: 81999,
    image:
      "https://cdn.sptmr.ru/upload/resize_cache/iblock/102/800_800_1/51472840299.jpg",
    description: "Сноуборд CAPITA Ultrafear",
    categories: ["Snowboard", "Gloves", "Helmet"],
  },
  {
    id: "3",
    title: "TERMIT",
    oldPrice: 27999,
    newPrice: 24999,
    image:
      "https://cdn.sptmr.ru/upload/resize_cache/iblock/ba8/800_800_1/48282040299.jpg",
    description: "Сноуборд Termit Helios",
    categories: ["Snowboard", "Other"],
  },
];

const Wrapper = () => {
  return (
    <View
      style={{
        backgroundColor: "lightgray",
        width: "90%",
        height: 3,
        marginLeft: "5%",
      }}
    />
  );
};

const Item = ({ item, onPress, navigation }: any) => {
    console.log(navigation)
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Item", {item: item})}
      style={styles.item}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textView}>
        <OpenSansBold style={styles.text}>{item.title}</OpenSansBold>
        <OpenSansRegular style={styles.text}>
          {item.description}
        </OpenSansRegular>
        <OpenSansBold style={[styles.text, { alignSelf: "flex-end" }]}>
          {item.newPrice}₽
        </OpenSansBold>
      </View>
    </TouchableOpacity>
  );
};

function ListItemScreen(
  { route }: any,
): JSX.Element {
  const [listItem, setListItem] = React.useState(DATA);
  const selectedCategory = route.params.category;
  //   console.log(selectedCategory);
  console.log(route.params.navigation);
  const [selectedId, setSelectedId] = React.useState(null);
  const colorScheme = useColorScheme();

  const renderItem = ({ item }: any) => {
    return (
      <Item
        item={item}
        navigation={route.params.navigation}
      />
    );
  };

  const [refreshing, setRefreshing] = React.useState(false);

  function getData(data: any[]) {
    data = data.map((d) => ({
      id: d.id.toString(),
      title: d.title,
      oldPrice: d.oldPrice,
      newPrice: d.newPrice,
      image: d.image,
      description: d.description,
      categories: d.categories,
    }));
    console.log(data);
    data = data.filter((x) => x.categories.includes(selectedCategory));
    console.log(data);
    setListItem(data);
  }

  const getListItem = async () => {
    setListItem([]);
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
    getListItem();
  }, []);

  return (
    <View style={[styles.container, styles.center]}>
      <FlatList
        data={listItem}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={styles.list}
        contentContainerStyle={{}}
        onRefresh={getListItem}
        refreshing={refreshing}
        ItemSeparatorComponent={Wrapper}
        ListEmptyComponent={() => (
          <OpenSansRegular>
            {" "}
            Ни одной вещи не было найдено по данной категории
          </OpenSansRegular>
        )}
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
    width: Layout.window.width - 20,
  },
  item: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: normalize(12),
  },
  image: {
    width: Layout.window.width / 3,
    minHeight: Layout.window.width / 3,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textView: {
    flexDirection: "column",
    width: Layout.window.width / 1.5 - 20,
    height: "100%",
    alignItems: "flex-start",
    paddingLeft: 5,
  },
});

export default ListItemScreen;
