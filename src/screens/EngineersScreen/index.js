import * as React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {_fetchEnginers} from './store/actions';

const EngineersScreen = ({navigation}) => {
  const {engineers, isLoading} = useSelector(
    ({fakeEngineers}) => fakeEngineers,
  );
  const dispatch = useDispatch();

  const fetchEnginers = useCallback(() => {
    dispatch(_fetchEnginers());
  }, []);

  const renderItem = (id, title, avatarUrl) => {
    const onPressFunction = () => {
      navigation.navigate('Engineer', {
        engineer: {id, title, avatarUrl},
      });
    };

    return (
      <TouchableOpacity
        onPress={onPressFunction}
        style={{
          borderRadius: 40,
          marginHorizontal: 10,
          marginVertical: 5,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.white,
            padding: 10,
          }}>
          <View
            style={{
              borderRadius: 50,
              width: 50,
              height: 50,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: avatarUrl}}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: Colors.black, marginLeft: 20}}>{title}</Text>
            <Ionicons name="chevron-forward" size={15} color={Colors.gray} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{paddingTop: 5}}>
      <FlatList
        data={engineers}
        renderItem={({item: {id, name, imageUrl}}) =>
          renderItem(id, name, imageUrl)
        }
        refreshing={isLoading}
        onRefresh={fetchEnginers}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default EngineersScreen;
