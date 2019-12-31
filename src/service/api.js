import { userTokens, request } from "./Auth";

function objToString(obj) {
  if (obj)
    return Object.entries(obj)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
  else return "";
}
export const post = async ({ url, data }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + userTokens.access
  };
  return await request(url, JSON.stringify(data), "POST", headers);
};

export const deleteRequest = async ({ url }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + userTokens.access
  };
  return await request(
    url, // `${url}?${objToString(data)}`,
    null,
    "DELETE",
    headers
  );
};

export const put = async ({ url, data }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + userTokens.access
  };
  return await request(url, JSON.stringify(data), "PUT", headers);
};

export const get = async ({ url, data }) => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + userTokens.access
  });
  return await request(
    url, //data ? `${url}?${objToString(data)}` :
    null,
    "GET",
    headers
  );
};
