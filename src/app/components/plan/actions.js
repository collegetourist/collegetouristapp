export const fetch = (id) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `${process.env.API_HOST}/api/tours/${id}/visits`,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const changeStep = (step) => ({
  type: 'CHANGE_STEP',
  step
})
