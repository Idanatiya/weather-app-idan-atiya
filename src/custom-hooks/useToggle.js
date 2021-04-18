import {useState} from 'react'


const useToggle = (initialVal =  false) => {
    const [isToggled, setToggle] = useState(initialVal)

    const toggle = () => setToggle(prevState => !prevState)

    //Rename output, multiple uses of hook per component
    // return [isToggled,setToggle,toggle]

    //Named proprties, no order in retyrb
    return [isToggled,toggle];
}

export default useToggle