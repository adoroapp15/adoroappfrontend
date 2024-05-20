import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const prefix = 'cache';
const expiryInMinutes = 5;

const store = async (key, value) => {
  const item = {
    value,
    timeStamp: moment().valueOf(),
  };

  try {
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (err) {
    console.log(err);
  }
};

const isExpired = item => {
  const now = moment(moment().valueOf());
  const storedTime = moment(item.timeStamp);
  return now.diff(storedTime, 'minutes') > expiryInMinutes;
};

const get = async key => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) {
      return null;
    }

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item.value;
  } catch (err) {
    console.log(err);
  }
};

export default {store, get};

// import {create} from 'apisauce';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import moment from 'moment';

// // Initialize an apisauce instance
// const api = create({
//   baseURL: 'https://backend-seven-gules.vercel.app', // Your API base URL
// });

// // Function to retrieve cached response
// const getCachedResponse = async key => {
//   try {
//     const cachedResponseJSON = await AsyncStorage.getItem(key);
//     if (cachedResponseJSON !== null) {
//       const cachedResponse = JSON.parse(cachedResponseJSON);
//       return cachedResponse;
//     }
//     return null; // Return null if no cached response found
//   } catch (error) {
//     console.error('Error retrieving cached response:', error);
//     return null;
//   }
// };

// // Function to cache response
// const cacheResponse = async (key, response) => {
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(response));
//   } catch (error) {
//     console.error('Error caching response:', error);
//   }
// };

// // Function to check if cached response is expired
// const isResponseExpired = (cachedResponse, cacheDurationInMinutes) => {
//   const currentTime = moment();
//   const cachedTime = moment(cachedResponse.timestamp);
//   const durationDiff = moment
//     .duration(currentTime.diff(cachedTime))
//     .asMinutes();
//   return durationDiff > cacheDurationInMinutes;
// };

// // Function to make API request with caching
// const getWithCache = async (cacheKey, cacheDurationInMinutes) => {
//   // Check if there is a cached response
//   let cachedResponse = await getCachedResponse(cacheKey);

//   // If there's a cached response and it's not expired, return it
//   if (
//     cachedResponse &&
//     !isResponseExpired(cachedResponse, cacheDurationInMinutes)
//   ) {
//     return cachedResponse.data;
//   }

//   // Otherwise, make a fresh API request
//   const response = await api.get('/endpoint'); // Adjust this based on your API endpoint
//   if (response.ok) {
//     // Cache the response for future use
//     const responseToCache = {
//       data: response.data,
//       timestamp: moment().toISOString(),
//     };
//     cacheResponse(cacheKey, responseToCache);
//     return response.data;
//   } else {
//     throw new Error('Failed to fetch data');
//   }
// };

// export {getWithCache};
