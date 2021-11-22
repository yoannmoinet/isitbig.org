import { merge } from 'lodash';

import data from '../public/data.json';
import override from '../public/overrides.json';

export const useData = () => {
    return Object.values(merge(data, override));
};
