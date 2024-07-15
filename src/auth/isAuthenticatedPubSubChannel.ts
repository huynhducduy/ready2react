import {APP_NAME} from '@/constants/config'
import PubSubChannel from '@/utils/PubSubChannel'

const isAuthenticatedPubSubChannel = new PubSubChannel<boolean>(`${APP_NAME}-is-authenticated`)
export default isAuthenticatedPubSubChannel
