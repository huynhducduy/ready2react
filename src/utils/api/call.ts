import axios from 'axios'

import isAuthenticated from '@/auth/isAuthenticated'
import isAuthenticatedPubSubChannel from '@/auth/isAuthenticatedPubSubChannel'

const call = axios.create({
  adapter: 'fetch',
})

call.interceptors.response.use(function (response) {
  isAuthenticatedPubSubChannel.pub(isAuthenticated())
  return response
})

export default call
