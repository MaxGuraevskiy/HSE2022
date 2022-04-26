import { FlatList, StyleSheet, TouchableOpacity, ImageBackground, Image, Button } from 'react-native';

import * as React from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'

const Wrapper = () => {
    return(
        <View style={{backgroundColor: 'lightgray', width: '90%', height: 3, marginLeft:  '5%'}}>

        </View>
    )
}

const Item = ({ item, onPress, borderColor }: any) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View style={{flexDirection: 'row', alignItems:'center'}}>
      <Image source={{uri: item.uri}} style={{ width: 100, height: 100}} resizeMode='contain'/>
    <View  style={{flexDirection: 'column', }}>
        <Text style={{fontSize: 22}}>{item.brand}</Text>
        <Text style={{fontSize: 12}}>{item.name}</Text>
    </View>
    </View>
    <View  style={{flexDirection: 'column', }}>
        <Text style={{fontSize: 22}}>{item.date}</Text>
        <Text style={{fontSize: 12}}>{item.time}</Text>
    </View>
  </TouchableOpacity>
);

function WarehouseScreen( {route} : any, {navigation} : RootTabScreenProps<'Catalog'> ) {
  const [DATA, setDATA] = React.useState([
    {
      id: '1',
      uri: 'https://cdn.sptmr.ru/upload/resize_cache/iblock/33d/800_800_1/53195980299.jpg',
      brand: 'TERMIT',
      name: 'Сноуборд детский Termit Jockey',
      price: 13999
    },
    {
      id: '2',
      uri: 'https://cdn.sptmr.ru/upload/resize_cache/iblock/94d/800_800_1/53592420299.jpg',
      brand: 'HEAD',
      name: 'Сноуборд Head Architect',
      price: 53999
    },
    {
      id: '3',
      uri: 'https://cdn.sptmr.ru/upload/resize_cache/iblock/102/800_800_1/51472840299.jpg',
      brand: 'CAPITA',
      name: 'Сноуборд CAPITA Ultrafear',
      price: 81999  
    },
    {
      id: '4',
      uri: 'https://cdn.sptmr.ru/upload/resize_cache/iblock/ba8/800_800_1/48282040299.jpg',
      brand: 'TERMIT',
      name: 'Сноуборд Termit Helios',
      price: 24999  
    },
    {
      id: '5',
      uri: 'https://cdn.sptmr.ru/upload/resize_cache/iblock/0d1/800_800_1/53591370299.jpg',
      brand: 'BURTON',
      name: 'Сноуборд Burton Instigator',
      price: 67999  
    },
])
//   const { itemId, otherParam } : any = route.params
  const [selectedId, setSelectedId] = React.useState(null);
  const colorScheme = useColorScheme();

  const renderItem = ({ item } : any) => {
    const borderColor = Colors[colorScheme].tabIconSelected

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
          // navigation.navigate('Profile')
        }}
        borderColor={{borderColor}}
      />
    );
  }

  return (
    <View style={[styles.container, styles.center]}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        style={styles.list}
        contentContainerStyle={{}}
        ItemSeparatorComponent={Wrapper}
        ListFooterComponent={() => (
        <Button
          onPress={() => {}}
          title="Добавить вещь на склад"
          color="#841584"
        />
        )}
        ListEmptyComponent={()=>(<Text style={{fontSize:24, justifyContent: 'center', alignItems: 'center', alignSelf:'center', paddingBottom: 20}}>Ваш склад пуст</Text>)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    width: "100%",
    // alignContent: "center",
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  itemName: {

  }

});

export default WarehouseScreen

// ListFooterComponent={() => (<Button
//   onPress={() => {}}
//   title="Добавить вещь на склад"
//   color="#841584"
//   accessibilityLabel="Learn more about this purple button"
// />
// )}
// ListEmptyComponent={()=>(<Text style={{fontSize:24, justifyContent: 'center', alignItems: 'center', alignSelf:'center', paddingBottom: 20}}>Ваш склад пуст</Text>)}
