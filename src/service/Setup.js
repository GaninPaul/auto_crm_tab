import AsyncStorage from '@react-native-community/async-storage';

const _SERVER_ADDRESS = "SERVER_ADDRESS";
let SERVER_ADDRESS = "http://192.168.10.133:8001";

export const SetUp = async () => {
  const serverAddress = await AsyncStorage.getItem(_SERVER_ADDRESS);
  console.log("serverAddress", serverAddress);
  if (!serverAddress || serverAddress === "" || serverAddress === undefined) {
    await AsyncStorage.setItem(_SERVER_ADDRESS, SERVER_ADDRESS);
  }
  SERVER_ADDRESS = serverAddress;
};

export const setServerAddress = serverAddress => {
  SERVER_ADDRESS = serverAddress;
  AsyncStorage.setItem(_SERVER_ADDRESS, serverAddress);
};

export const getServerAddress = () => SERVER_ADDRESS;
