/**
 * Pub/Sub across multiple browser tabs
 *
 * @export
 * @class PubSubChannel
 */
export default class PubSubChannel<M = unknown> {
  private publisher: BroadcastChannel
  private subscriber: BroadcastChannel

  constructor(channelName: string) {
    this.publisher = new BroadcastChannel(channelName)
    this.subscriber = new BroadcastChannel(channelName)
  }

  pub(data: M) {
    this.publisher.postMessage(data)
  }

  sub(listener: (event: MessageEvent<M>) => unknown, options?: boolean | AddEventListenerOptions) {
    this.subscriber.addEventListener('message', listener, options)
  }

  unSub(
    listener: (event: MessageEvent<M>) => unknown,
    options?: boolean | AddEventListenerOptions,
  ) {
    this.subscriber.removeEventListener('message', listener, options)
  }
}
