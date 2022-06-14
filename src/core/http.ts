import { HTTPClient } from './httpClient'

export { http } from './httpClient'

const gatewayHost = __DEV__ ? 'https://gateway.test.weike.fm' : 'https://gateway-weike.lizhiweike.com'

export const gatewayRequest = new HTTPClient(
  { baseURL: gatewayHost, },
  '0000',
)

const adminHost = __DEV__ ? 'http://dev.admin.lizhiweike.com' : 'https://admin.lizhiweike.com'

export const adminRequest = new HTTPClient({
  baseURL: `${adminHost}/api`,
})
