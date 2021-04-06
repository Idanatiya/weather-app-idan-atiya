
import {useState} from 'react'

const useModal = () => {
    const [showModal,setShowModal] = useState(false);

    function toggle() {
        setShowModal(prevState => !prevState)
    }

    return {toggle,showModal}
}

export default useModal