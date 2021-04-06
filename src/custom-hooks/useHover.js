import { useState, useRef, useEffect } from 'react';
const useHover = () => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef()

    handleMouseOver = () => setHovered(true)
    handleMouseLeave = () => setHovered(false)

    useEffect(() => {
        const node = ref.current;
        if(node) {
            document.addEventListener('mouseover',handleMouseOver)
            document.addEventListener('mouseleave',handleMouseLeave)
        }
        return () => {
            document.removeEventListener('mouseover',handleMouseOver)
            document.removeEventListener('mouseleave',handleMouseLeave)
        }
    },[])

    return {ref,hovered}
}

export default useHover;

