import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const setStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    storage.set(key, JSON.stringify(value));
    return;
  }

  storage.set(key, value);
};

export const getStorage = (key: string) => {
  const value = storage.getString(key);

  if (value === undefined) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const removeStorageItem = (key: string) => {
  storage.delete(key);
};

export const clearStorage = () => {
  storage.clearAll();
};
