/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Profile: {
            screens: {
              ProfileScreen: 'one',
              Modal: 'modal',
              Auth: 'auth',
            },
          },
          Catalog: {
            screens: {
              CatalogScreen: 'two',
              ListItem: 'listItem',
              Item: 'item',
            },
          },
          Warehouse: {
            screens: {
              WarehouseScreen: 'three',
            },
          },
          Bag: {
            screens: {
              BagScreen: 'four',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
