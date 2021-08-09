import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/colors';

import ShiftsScreen from '../screens/ShiftsScreen';
import EngineersNavigation from './engineersNavigation';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'EngineersNavigation':
                iconName = focused ? 'people-circle' : 'people-circle-outline';
                break;
              case 'Shifts':
                iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.orange,
          tabBarInactiveTintColor: Colors.gray,
        })}>
        <Tab.Screen
          name="EngineersNavigation"
          component={EngineersNavigation}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Shifts" component={ShiftsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
