import { useState } from 'react'

const useCounter = (defaultValue?: number) => {

    // useEffect(() => {

    // }, [])

    const [counter, setCounter] = useState(defaultValue || 0);
    const incrementCounter = (args : number) => setCounter((prev) => prev + args || 1);
    return [counter, incrementCounter]
}

export default useCounter