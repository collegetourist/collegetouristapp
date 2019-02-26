export const loadTourist = () => ({
  type: 'LOCAL_GET',
  key: 'tourist_id',
  request: 'LOAD_TOURIST_REQUEST',
  success: 'LOAD_TOURIST_SUCCESS',
  failure: 'LOAD_TOURIST_FAILURE'
})

export const removeTourist = () => ({
  type: 'LOCAL_REMOVE',
  key: 'tourist_id',
  request: 'REMOVE_TOURIST_REQUEST',
  success: 'REMOVE_TOURIST_SUCCESS',
  failure: 'REMOVE_TOURIST_FAILURE'
})

export const loadToken = () => ({
  type: 'LOCAL_GET',
  key: 'token',
  request: 'LOAD_TOKEN_REQUEST',
  success: 'LOAD_TOKEN_SUCCESS',
  failure: 'LOAD_TOKEN_FAILURE'
})

export const saveToken = (token) => ({
  type: 'LOCAL_SET',
  key: 'token',
  value: token,
  request: 'SAVE_TOKEN_REQUEST',
  success: 'SAVE_TOKEN_SUCCESS',
  failure: 'SAVE_TOKEN_FAILURE'
})

export const removeToken = () => ({
  type: 'LOCAL_REMOVE',
  key: 'token',
  request: 'REMOVE_TOKEN_REQUEST',
  success: 'REMOVE_TOKEN_SUCCESS',
  failure: 'REMOVE_TOKEN_FAILURE'
})

export const loadSession = (token) => ({
  type: 'API_REQUEST',
  method: 'GET',
  token,
  endpoint: `/api/session`,
  request: 'LOAD_SESSION_REQUEST',
  success: 'LOAD_SESSION_SUCCESS',
  failure: 'LOAD_SESSION_FAILURE'
})

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  token
})

export const setTourist = (tourist_id) => ({
  type: 'SET_TOURIST',
  tourist_id
})

export const signout = (token) => ({
  type: 'SIGNOUT'
})
