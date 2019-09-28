import { getServerAddress } from "../service/Setup";

export const makeRequest = async (url, data, type, headers) => {
  //const request = await
  return fetch(getServerAddress() + url, {
    method: type,
    body: data,
    headers: headers
  });
  /*console.log(request);
  if (request.status < 400) return request;
  else throw { status: request.status, message: request };*/
};

export const parseRequestData = async request => {
  const json = await request.json();
  if (request.status < 400) return json;
  else
    throw { status: request.status, message: json.non_field_errors, request };
};

export async function baseRequest(url, data, type, headers) {
  const response = await fetch(getServerAddress() + url, {
    method: type,
    body: data,
    headers: headers
  })
    .then(async response => {
      try {
        if (response.status === 204 || response.status === 404) {
          return { statusCode: response.status };
        }
        const json = await response.json();
        return { json, statusCode: response.status };
      } catch (e) {
        return { statusCode: response.status };
      }
    })
    .catch(error => {
      throw {
        status: error.status,
        /*message: error.non_field_errors,*/ error
      };
    });
  const { json, statusCode } = response;
  if (statusCode >= 400) {
    throw { status: statusCode, message: "400>" };
  }
  return json ? json : {};
}
export async function withTimeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject({ message: "Time out reject" });
    }, ms);
    promise.then(resolve, reject);
  });
}

