import React from 'react';

const useStickyState = (key, defaultValue, callback) => {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        if (callback) {
            let v = callback(value);
            window.localStorage.setItem(key, JSON.stringify(v));
            setValue(v);
        } else
            window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export {
    useStickyState
}
