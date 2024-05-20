import {create} from 'apisauce';
import cache from '../utility/cache';

const apiClient = create({
  baseURL: 'https://backend-seven-gules.vercel.app',
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    await cache.store(url, response.data); // Cache the response
    return response;
  }

  const data = await cache.get(url); // Retrieve data from cache
  return data ? {ok: true, data} : response;
};

export default apiClient;
