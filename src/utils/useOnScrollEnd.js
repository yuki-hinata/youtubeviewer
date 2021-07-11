import { useEffect } from "react";

export default (onScrollEnd) => {
    useEffect(() => {
        let cleanUp;
        if(!onScrollEnd){
            return cleanUp;
        }
        const scrollHandler = ({ target: { scrollingElement } }) => {
            const { scrollTop, scrollHeight, clientHeight } = scrollingElement
            if(scrollTop < scrollHeight - clientHeight){
                return;
            }
            onScrollEnd()
        }
        window.document.addEventListener('scroll', scrollHandler);
        cleanUp = () => {
            window.document.removeEventListener('scroll', scrollHandler)
        }
        return cleanUp
    }, [onScrollEnd])
}