import { useState, useEffect } from "react"

const useSlide = (value, initialCount = 0) => {
  const [currentSlide, setCurrentSlide] = useState(initialCount)

  useEffect(() => {
    let rotationInterval = setInterval(() => {
      if (currentSlide >= value.length - 1) {
        setCurrentSlide(0)
      } else {
        setCurrentSlide(currentSlide + 1)
      }
    }, 5000)
    return () => {
      clearInterval(rotationInterval)
    }
  }, [currentSlide])

  return [currentSlide]
}

export default useSlide
