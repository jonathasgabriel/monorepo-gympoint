import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import CheckIn from '~/pages/CheckIn';
import ListOrder from '~/pages/HelpOrder/ListOrder';
import DetailOrder from '~/pages/HelpOrder/DetailOrder';
import NewOrder from '~/pages/HelpOrder/NewOrder';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({ SignIn }),
        App: createBottomTabNavigator(
          {
            CheckIn,
            HelpOrder: {
              screen: createStackNavigator(
                {
                  ListOrder,
                  DetailOrder,
                  NewOrder,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: false,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Help Order',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              labelStyle: {
                fontSize: 14,
              },
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
