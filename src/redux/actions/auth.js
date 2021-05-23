export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: 'AUTH_LOGOUT',
  };
}

export const fetchAuthLogin = () => ({
  type: 'FETCH_AUTH_LOGIN',
});

export const AutoLogout = () => ({
  type: 'AUTO_LOGOUT',
});

export const fetchAuthAccess = (login, password, isLogin) => ({
  type: 'FETCH_AUTH_ACCESS',
  payload: {
    login,
    password,
    isLogin,
  },
});

export function authSuccess(token) {
  return {
    type: 'AUTH_SUCCESS',
    token,
  };
}

export const fetchAuthStart = () => ({
  type: 'FETCH_AUTH_START',
});

export const fetchAuthFinish = () => ({
  type: 'FETCH_AUTH_FINISH',
});

export const authError = () => ({
  type: 'AUTH_ERROR',
});
