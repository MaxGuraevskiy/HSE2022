import * as React from "react";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
} from "react-native";

import { View } from "../components/Themed";
import { OpenSansBold, OpenSansRegular } from "../components/StyledText";
import SwipeRow from "../components/SwipeRow";
import Context from "../components/Context";
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
    categories: ["snowboard", 'Ski', 'Ski suit'],
  },
  {
    id: "1",
    title: "HEAD",
    oldPrice: 54999,
    newPrice: 53999,
    image:
      "https://cdn.sptmr.ru/upload/resize_cache/iblock/94d/800_800_1/53592420299.jpg",
    description: "Сноуборд Head Architect",
    categories: ["snowboard", 'Ski mask', 'Boots'],
  },
  {
    id: "2",
    title: "CAPITA",
    oldPrice: 83999,
    newPrice: 81999,
    image:
      "https://cdn.sptmr.ru/upload/resize_cache/iblock/102/800_800_1/51472840299.jpg",
    description: "Сноуборд CAPITA Ultrafear",
    categories: ["snowboard", 'Gloves', 'Helmet'],
  },
  {
    id: "3",
    title: "TERMIT",
    oldPrice: 27999,
    newPrice: 24999,
    image:
      "https://cdn.sptmr.ru/upload/resize_cache/iblock/ba8/800_800_1/48282040299.jpg",
    description: "Сноуборд Termit Helios",
    categories: ["snowboard", 'Other'],
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
    ></View>
  );
};

function BagScreen({ route }: any, { navigation }: RootTabScreenProps<"Bag">) {
  //   const { itemId, otherParam } : any = route.params
  const [bin, setBin] = React.useState(DATA);
  // const [bin, setBin]  = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);
  const colorScheme = useColorScheme();
  // const {setIsAuth, jwt, setJwt} = useContext(Context)
  const [refreshing, setRefreshing] = useState(false);

  function getData(data: any[]) {
    console.log(data);
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
    setBin(data);
  }

  const getBag = async () => {
    setBin([]);
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

    getData(DATA) // убрать, когда будет работать сервер

    setRefreshing(false);
  };

  useEffect(() => {
    getBag();
  }, []);

  const deleteItem = (item: any) => {
    const updatedData = bin.filter((d) => d !== item);
    // Animate list to close gap when item is deleted
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setBin(updatedData);
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer " + jwt);

    // var requestOptions = {
    //     method: 'DELETE',
    //     headers: myHeaders,
    //     redirect: 'follow'
    // };

    // fetch("https://checkpoint-server-db.herokuapp.com/api/pass/"+item.key, requestOptions)
    //     .then(response => response.json())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
  };

  const renderItem = ({ item }: any) => {
    return (
      <SwipeRow
        key={item.id}
        item={item}
        swipeThreshold={-150}
        onSwipe={deleteItem}
      >
        <TouchableOpacity style={styles.item}>
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
      </SwipeRow>
    );
  };

  return (
    <View style={[styles.container, styles.center]}>
      <FlatList
        data={bin}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
        onRefresh={getBag}
        refreshing={refreshing}
        style={styles.list}
        contentContainerStyle={{}}
        ItemSeparatorComponent={Wrapper}
        ListEmptyComponent={() => (
          <OpenSansRegular>Ваша корзина пуста...</OpenSansRegular>
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

export default BagScreen;
