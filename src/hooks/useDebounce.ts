import {useCallback, useRef} from "react";

export const useDebounce = (callback: any, ms: number) => {
    const timer = useRef<any>();

    const debouncedCallback = useCallback((...args) => {

        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            console.log(...args)
            callback(...args)
        }, ms)
    }, [callback, ms])

    return debouncedCallback;
};