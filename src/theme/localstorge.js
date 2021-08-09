import AsyncStorage from '@react-native-async-storage/async-storage';

const ENGINERS_LIST = '@storage_ENGINERS_LIST';
const SHIFTS = '@storage_SHIFTS';

export const _getEngineersAsync = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const oldData = await AsyncStorage.getItem(ENGINERS_LIST);

      let objCopy = {};

      if (oldData) {
        objCopy = JSON.parse(oldData);
        resolve(objCopy);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const _saveEngineersAsync = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(ENGINERS_LIST, JSON.stringify(data));
      resolve('Engineers was saved');
    } catch (error) {
      reject(error);
    }
  });
};

export const _addEngineersAsync = async userData => {
  return new Promise(async (resolve, reject) => {
    try {
      const oldData = await AsyncStorage.getItem(ENGINERS_LIST);
      let objCopy = {};
      if (oldData) {
        objCopy = JSON.parse(oldData);
        objCopy.unshift(userData);
        await AsyncStorage.setItem(ENGINERS_LIST, JSON.stringify(objCopy));
        resolve(objCopy);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const _editEngineerNamesAsync = async (id, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const oldData = await AsyncStorage.getItem(ENGINERS_LIST);
      let objCopy = {};
      if (oldData) {
        objCopy = JSON.parse(oldData);
        let stopLoop = false;
        for (let i = 0; i < objCopy.length; i++) {
          if (stopLoop) {
            break;
          }
          if (objCopy[i]?.id === id) {
            objCopy[i].name = name;
            stopLoop = true;
          }
        }
        await AsyncStorage.setItem(ENGINERS_LIST, JSON.stringify(objCopy));
        resolve(objCopy);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const _deleteEngineerNamesAsync = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const oldData = await AsyncStorage.getItem(ENGINERS_LIST);
      let objCopy = {};
      if (oldData) {
        objCopy = JSON.parse(oldData);
        const index = objCopy && objCopy.findIndex(item => item.id == id);
        if (index > -1) {
          objCopy.splice(index, 1);
        }
        await AsyncStorage.setItem(ENGINERS_LIST, JSON.stringify(objCopy));
        resolve(objCopy);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const _getShiftsAsync = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const oldData = await AsyncStorage.getItem(SHIFTS);

      let objCopy = {};

      if (oldData) {
        objCopy = JSON.parse(oldData);
        resolve(objCopy);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const _saveShiftsAsync = async data => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(SHIFTS, JSON.stringify(data));
      resolve('Shifts was saved');
    } catch (error) {
      reject(error);
    }
  });
};
