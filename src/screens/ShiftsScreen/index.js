import * as React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { useEffect, useMemo, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {_fetchShifts, _saveShifts} from './store/actions';

const ShiftsScreen = () => {
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [shiftEngineers, setShiftEngineers] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  const {
    shifts: {shifts, isLoading},
    fakeEngineers: {engineers},
  } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    let newData = {
      [selectedDay]: {
        selected: true,
        disableTouchEvent: true,
      },
    };

    shifts?.forEach(({date}) => {
      newData[date] = {...newData[date], marked: true};
    });

    if (JSON.stringify(markedDates) !== JSON.stringify(newData)) {
      setMarkedDates(() => newData);
    }
  }, [selectedDay, shifts]);

  useEffect(() => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    setSelectedDay(() => today);

    dispatch(_fetchShifts());
  }, []);

  useEffect(() => {
    fetchEngineers();
  }, [shifts, selectedDay]);

  const fetchEngineers = () => {
    const findShiftEngineers =
      shifts && shifts.find(({date}) => date === selectedDay);

    if (findShiftEngineers?.engineers) {
      setShiftEngineers(() => findShiftEngineers.engineers);
    } else {
      setShiftEngineers(() => []);
    }
  };

  const onDayPress = day => {
    setSelectedDay(() => day.dateString);
  };

  const renderItem = (id, title, avatarUrl) => {
    return (
      <View
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
          </View>
        </View>
      </View>
    );
  };

  const onPressSpin = async () => {
    const getRandomNumber = () => {
      return Math.floor(Math.random() * engineers.length);
    };
    const randomEngineer = engineers[getRandomNumber()];
    selectedDay &&
      randomEngineer &&
      dispatch(_saveShifts(selectedDay, randomEngineer));
  };

  const spinerWheel = useMemo(() => {
    if (shiftEngineers?.length >= 2) {
      return null;
    }
    return (
      <View
        style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
        <TouchableOpacity onPress={onPressSpin}>
          <View style={{marginRight: 20}}>
            <Ionicons
              name="ios-aperture-outline"
              size={60}
              color={Colors.orange}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }, [shiftEngineers]);

  return (
    <View style={{flex: 1}}>
      <Calendar
        style={{marginBottom: 10}}
        hideExtraDays={false}
        current={new Date()}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
      {spinerWheel}
      <FlatList
        data={shiftEngineers}
        renderItem={({item: {id, name, imageUrl}}) =>
          renderItem(id, name, imageUrl)
        }
        refreshing={isLoading}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ShiftsScreen;
