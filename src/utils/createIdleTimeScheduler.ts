const createIdleTimeScheduler = <T extends (...args: never[]) => void>(timeout = 3000) => {
  const thingsToDo: {execute: T; id: number}[] = []
  let isRequestIdleCallbackScheduled = false
  let currentId = 0

  const runScheduler = () => {
    // Only schedule the rIC if one has not already been set.
    if (isRequestIdleCallbackScheduled) return

    isRequestIdleCallbackScheduled = true

    if ('requestIdleCallback' in window) {
      // Wait at most two seconds before processing events.
      requestIdleCallback(process, {timeout})
    } else {
      process()
    }
  }

  const process = (deadline?: IdleDeadline) => {
    // Reset the boolean so future rICs can be set.
    isRequestIdleCallbackScheduled = false

    // If there is no deadline, just run as long as necessary.
    // This will be the case if requestIdleCallback doesn’t exist.
    if (typeof deadline === 'undefined')
      deadline = {
        didTimeout: false,
        timeRemaining: function () {
          return Number.MAX_VALUE
        },
      }

    // Go for as long as there is time remaining and work to do.
    while (deadline.timeRemaining() > 0 && thingsToDo.length > 0) {
      const thing = thingsToDo.pop()
      thing?.execute()
    }

    // Check if there are more events still to send.
    if (thingsToDo.length > 0) runScheduler()
  }

  const schedule = (thing: T) => {
    const id = currentId++
    thingsToDo.push({
      execute: thing,
      id,
    })
    runScheduler()
    return id
  }

  const clear = () => {
    thingsToDo.splice(0, thingsToDo.length)
  }

  const cancel = (id: number) => {
    const thingId = thingsToDo.findIndex(thing => thing.id === id)
    thingsToDo.splice(thingId, 1)
  }

  return {
    schedule,
    clear,
    cancel,
  }
}

export default createIdleTimeScheduler
