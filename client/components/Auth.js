import decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

function isExpired(token) {
  const jwt = decode(token);
  if (jwt.exp < (Date.now() / 1000)) {
    return true;
  } else {
    return false;
  }
}

export default function isAuthenticated() {
  // Get token from storage
  const token = SecureStore.getItemAsync('auth_token');
  return !!token && !isExpired(token);
};