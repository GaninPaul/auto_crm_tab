import AsyncStorage from "@react-native-community/async-storage";

const _SERVER_ADDRESS = "SERVER_ADDRESS";
const _USER = "USER";
const _PASSWORD = "PASSWORD";
let DEFAULT = {
  [_SERVER_ADDRESS]: "http://192.168.10.133:8001",
  [_USER]: "admin",
  [_PASSWORD]: "123456"
};

async function getVar(value) {
  const savedValue = await AsyncStorage.getItem(value);
  if (!savedValue || savedValue === "" || savedValue === undefined) {
    await AsyncStorage.setItem(value, DEFAULT[value]);
  }
  return savedValue;
}
export const SetUp = async () => {
  DEFAULT[_SERVER_ADDRESS] = await getVar(_SERVER_ADDRESS);
  DEFAULT[_USER] = await getVar(_USER);
  DEFAULT[_PASSWORD] = await getVar(_PASSWORD);
};

export const setServerAddress = value => {
  DEFAULT[_SERVER_ADDRESS] = value;
  AsyncStorage.setItem(_SERVER_ADDRESS, value);
};

export const setUsername = value => {
  DEFAULT[_USER] = value;
  AsyncStorage.setItem(_USER, value);
};

export const setPassword = value => {
  DEFAULT[_SERVER_ADDRESS] = value;
  AsyncStorage.setItem(_PASSWORD, value);
};

export const getServerAddress = () => DEFAULT[_SERVER_ADDRESS];
export const getUsername = () => DEFAULT[_USER];
export const getPassword = () => DEFAULT[_PASSWORD];
