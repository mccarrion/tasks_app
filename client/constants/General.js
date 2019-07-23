import { AsyncStorage } from 'react-native';

// Global Constants
export const API_URL = 'http://localhost:8080';

// Need to get token from local storage
export const AUTH_TOKEN = async () => {
  try {
    const retrievedToken = await AsyncStorage.getItem("userToken");
    return retrievedToken;
  } catch(error) {
    alert("Token retrieval failed");
  }
}
