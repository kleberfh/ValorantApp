import axios from 'axios';
import { forEach, get } from 'lodash';

const instanceHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const instance = axios.create({
  baseURL: 'https://valorant-api.com/v1/',
  validateStatus: (status) => status >= 200 && status < 400,
});

const handleErrorsArray = (errors): string => {
  let errorsMessage = '';
  forEach(errors, (error) => {
    errorsMessage += `${error[0]} <br /> `;
  });
  return errorsMessage;
};

const requestErrorHandler = (response) => {
  const requestMessage = get(response, 'request.response', null);

  if (requestMessage) {
    const dataParse = JSON.parse(requestMessage);
    const errorMessage = get(dataParse, 'data.message', null);
    if (errorMessage) {
      return errorMessage;
    }
  }

  if (response.data) {
    const { data } = response;

    if (data.errors) {
      return handleErrorsArray(data.errors);
    }

    if (data.message) {
      return data.message;
    }

    return data;
  }

  if (response.response) {
    const { data } = response.response;

    if (data.errors) {
      return handleErrorsArray(data.errors);
    }

    if (data.message) {
      return data.message;
    }

    return data.toString;
  }

  if (response && response.data && response.data.data) {
    const errorData = response.data.data;

    if (errorData.message) {
      return errorData.message;
    }

    return errorData;
  }

  if (response.message) {
    return response.message.toString();
  }

  return response;
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const code = get(error, 'response.status', 400);
    if (code !== 404 && code !== 401) {
      console.log('Erro', requestErrorHandler(error), 'error');
    }
    return Promise.reject(error);
  }
);

export default async function ValorantApi(url: string, language: string = 'en-US') {
  const config = {
    headers: {
      ...instanceHeader,
    },
    params: {
      language
    }
  };

  return instance.request({
    url,
    method: 'get',
    ...config,
  });
}
