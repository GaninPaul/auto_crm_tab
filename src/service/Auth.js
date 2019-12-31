import {
  makeRequest,
  parseRequestData,
  withTimeout,
  baseRequest
} from "./request";
import AsyncStorage from '@react-native-community/async-storage';

let isAuth = false;
export const Auth = async () => {
  try {
    if (await verifyTokens()) {
      isAuth = true;
    }
  } catch (e) {
    alert(e);
  }
};

export const SetIsAuth = value => {
  isAuth = value;
};
export const IsAuth = () => isAuth;

export let userTokens = {
  access: "",
  refresh: ""
};
export const createUserJWT = async ({ username, password }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  let request = await makeRequest(
    "/api/jwt/create",
    JSON.stringify({ username, password }),
    "POST",
    headers
  );

  userTokens = await parseRequestData(request);
  SetIsAuth(true);
  console.log("create new tokens", userTokens);
  await AsyncStorage.setItem("user_token_access", userTokens.access);
  await AsyncStorage.setItem("user_tokens_refresh", userTokens.refresh);
  return false;
};

export const verifyTokens = async () => {
  let accessToken = await AsyncStorage.getItem("user_token_access");
  let refreshToken = await AsyncStorage.getItem("user_tokens_refresh");

  userTokens.access = accessToken;
  userTokens.refresh = refreshToken;

  if (accessToken && refreshToken) {
    console.log("accessToken is have");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    let request = await makeRequest(
      "/api/jwt/verify",
      JSON.stringify({ token: accessToken }),
      "POST",
      headers
    );

    if (request.status === 200) {
      console.log("auth success");
      return true;
    }
    request = await makeRequest(
      "/api/jwt/refresh",
      JSON.stringify({ refresh: refreshToken }),
      "POST",
      headers
    );

    if (request.status === 200) {
      const data = await parseRequestData(request);
      updateAccessToken(data.access);
      return true;
    }

    return false;
  }
  console.log("accessToken is not have");
  return false;
};

export const getAccessToken = () => userTokens.access;
export const updateAccessToken = accessToken => {
  AsyncStorage.setItem("user_token_access", accessToken);
  userTokens.access = accessToken;
};

export const deleteToken = () => {
  userTokens = {
    access: "",
    refresh: ""
  };
};

async function refreshToken() {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const request = await makeRequest(
      "/api/jwt/refresh",
      JSON.stringify({ refresh: refreshToken }),
      "POST",
      headers
    );
    if (request.status === 200) {
      const data = await parseRequestData(request);
      updateAccessToken(data.access);
      return true;
    }
  } catch (e) {
    throw { message: "cant refresh token" };
  }
}
export async function request(url, data, type, headers) {
  try {
    return await withTimeout(60000, baseRequest(url, data, type, headers));
  } catch (e) {
    if (e.statusCode === 403) {
      await refreshToken();
    }
  }
}
