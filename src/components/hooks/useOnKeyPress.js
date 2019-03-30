import {useEffect} from 'react'

function useOnKeyPress(chosenKey, callback) {
    const handleKeyPress = (e) => {
        if(e.key === chosenKey) callback()
    }
    useEffect(()=> {
        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])
  }

  export default useOnKeyPress