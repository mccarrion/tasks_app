import { AsyncStorage } from 'react-native';

// Need to get token from local storage to add it for token with Auth prefix
const userToken = AsyncStorage.getItem('userToken');

// Global Constants
export const API_URL = 'http://localhost:8080';
export const AUTH_TOKEN = `Bearer ${userToken}`;