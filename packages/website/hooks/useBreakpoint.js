import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const getWindowValue = (width, breakpoints) => {
    if (width < breakpoints.sm) {
        return 'xs';
    } else if (width >= breakpoints.sm && width < breakpoints.md) {
        return 'sm';
    } else if (width >= breakpoints.md && width < breakpoints.lg) {
        return 'md';
    } else if (width >= breakpoints.lg && width < breakpoints.xl) {
        return 'lg';
    } else if (width >= breakpoints.xl) {
        return 'xl';
    }
};

export const useBreakpoint = (breakpoints) => {
    const [breakpoint, setBreakpoint] = useState(getWindowValue(window.innerWidth, breakpoints));
    useEffect(() => {
        const iw = throttle(() => {
            setBreakpoint(getWindowValue(window.innerWidth, breakpoints));
        }, 200);
        window.addEventListener('resize', iw);
        return () => window.removeEventListener('resize', iw);
    }, []);

    return breakpoint;
};
