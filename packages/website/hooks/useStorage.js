import { useState, useEffect } from 'react';

const getStorageValue = (key, defaultValue) => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
};

export const useStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    // Will only run on client side, so it's safe to use localStorage in there.
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
