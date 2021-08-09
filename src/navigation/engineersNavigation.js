import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import faker from 'faker';

import Colors from '../theme/colors';
import EngineersScreen from '../screens/EngineersScreen';
import {_addEngineersAsync} from '../theme/localstorge';
import {_fetchEnginers} from '../screens/EngineersScreen/store/actions';
import EngineerScreen from '../screens/EngineerScreen';

const Stack = createNativeStackNavigator();

const EngineersNavigation = () => {
  const dispatch = useDispatch();
  const addEngineer = () => {
    const onPressFunction = async () => {
      const newData = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        imageUrl: faker.image.avatar(),
      };
      await _addEngineersAsync(newData);
      dispatch(_fetchEnginers());
    };

    return (
      <TouchableOpacity onPress={onPressFunction}>
        <View style={{marginRight: 20}}>
          <Ionicons name="person-add-outline" size={25} color={Colors.orange} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Stack.Navigator initialRouteName="Engineers">
      <Stack.Screen
        name="Engineers"
        component={EngineersScreen}
        options={{
          headerRight: addEngineer,
        }}
      />
      <Stack.Screen name="Engineer" component={EngineerScreen} />
    </Stack.Navigator>
  );
};

export default EngineersNavigation;
