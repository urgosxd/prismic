import { useEffect } from "react"

export const useOnClickOutside = (ref, handler, events) => {
  if (!events) events = ["mousedown", "touchstart"]
  useEffect(() => {
    const detectedClickOutside = event =>
      !ref.current.contains(event.target) && handler()
    for (const event of events)
      document.addEventListener(event, detectedClickOutside)
    return () => {
      for (const event of events) {
        document.removeEventListener(event, detectedClickOutside)
      }
    }
  }, [ref, handler, events])
}
