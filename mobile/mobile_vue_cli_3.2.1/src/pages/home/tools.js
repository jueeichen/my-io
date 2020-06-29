
let timer = ""
export const _debounce = (func, wait, ...args) => {
    return () => {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            func(args)
            timer = null
        }, wait);
    }
}
export const _throttle = (func, wait, ...args) => {
    return () => {
        if (!timer) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func(args)
            }, wait);
        }


    }
}