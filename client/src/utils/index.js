export function setToken(token) {
  window.localStorage.setItem('token', token);
}

export function getToken(){
  const token = window.localStorage.getItem('token')
  return token ? token : null
}

export function deleteToken() {
  window.localStorage.removeItem('token');
}
