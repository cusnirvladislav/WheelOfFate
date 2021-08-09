import * as React from 'react';
import {Button, Image, TextInput, View} from 'react-native';
import Colors from '../../theme/colors';
import {useState} from 'react';
import {
  _deleteEngineerNamesAsync,
  _editEngineerNamesAsync,
} from '../../theme/localstorge';
import {_fetchEnginers} from '../EngineersScreen/store/actions';
import {useDispatch} from 'react-redux';

const EngineerScreen = ({route, navigation}) => {
  const {engineer} = route.params;
  const [name, onChangeName] = useState(engineer.title);
  const dispatch = useDispatch();

  const onUpdate = async () => {
    await _editEngineerNamesAsync(engineer.id, name);
    dispatch(_fetchEnginers());
    navigation.goBack();
  };
  const onDelete = async () => {
    await _deleteEngineerNamesAsync(engineer.id);
    dispatch(_fetchEnginers());
    navigation.goBack();
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 30,
        }}>
        <View
          style={{
            borderRadius: 150,
            width: 150,
            height: 150,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: engineer.avatarUrl}}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </View>
      </View>
      <View>
        <TextInput
          style={{
            margin: 12,
            borderWidth: 1,
            backgroundColor: Colors.white,
            borderColor: Colors.orange,
            borderRadius: 40,
            padding: 15,
          }}
          onChangeText={onChangeName}
          value={name}
        />
        {engineer.title !== name && (
          <Button title="Update" color={Colors.orange} onPress={onUpdate} />
        )}
        <Button title="Delete" color="red" onPress={onDelete} />
      </View>
    </View>
  );
};

export default EngineerScreen;
