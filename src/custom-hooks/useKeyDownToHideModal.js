

/**Custom hook to hide and show modal  using a custom key from the keyboard */
import { useEffect } from 'react';
export const useKeyDownToHideModal = ({key = 27,handleFunc,showModal = false}) => {
   const handleKeyDown = (ev) => {
       if(ev.keyCode === key) handleFunc()
   }
   useEffect(() => {
       if(showModal) document.addEventListener('keydown', handleKeyDown)
       return () => {
           document.removeEventListener('keydown',handleKeyDown)
       }
   },[showModal,key])

}