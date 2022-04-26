/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import ModalScreen from "../screens/ModalScreen";
import ListItemScreen from "../screens/ListItemScreen";
import ItemScreen from "../screens/ItemScreen";
import AuthScreen from "../screens/AuthScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CatalogScreen from "../screens/CatalogScreen";
import WarehouseScreen from "../screens/WarehouseScreen";
import BagScreen from "../screens/BagScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export const userContext = React.createContext<{
  user: {
    id: string;
    name: string;
    password: string;
    email: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      password: string;
      email: string;
    }>
  >;
}>({
  user: {
    id: "0",
    name: "Max Guraevskiy",
    password: "qwerty123",
    email: "mdguraevskiy@edu.hse.ru",
  },
  setUser: () => {},
});

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [user, setUser] = React.useState({
    id: "0",
    name: "Max Guraevskiy",
    password: "qwerty123",
    email: "mdguraevskiy@edu.hse.ru",
  });

  return (
    <userContext.Provider value={{ user, setUser }}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </userContext.Provider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen name="ListItem" component={ListItemScreen} />
      <Stack.Screen name="Item" component={ItemScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Catalog"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => {
          //       //
          //       navigation.navigate("Modal");
          //     }}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}
          //   >
          //     <SimpleLineIcons
          //       name="logout"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="Catalog"
        component={CatalogScreen}
        options={{
          title: "Catalog",
          tabBarIcon: ({ color }) => <TabBarIcon name="grid" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Warehouse"
        component={WarehouseScreen}
        options={{
          title: "Warehouse",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="warehouse"
              color={color}
              size={40}
              style={{ marginBottom: 0, marginRight: 5 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Bag"
        component={BagScreen}
        options={{
          title: "Bag",
          tabBarIcon: ({ color }) => <TabBarIcon name="basket" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof SimpleLineIcons>["name"];
  color: string;
}) {
  return (
    <SimpleLineIcons
      size={30}
      style={{ marginBottom: 0, marginRight: 5 }}
      {...props}
    />
  );
}
