import { TOWN_START, WALL_WIDTH, WALL_X } from './constants';

export const TOWN_LIST = (() => {
    const list_left = [{
        x: WALL_X,
        y: TOWN_START,
        rotate: Math.PI * 1.5
    },
        {
            x: WALL_X,
            y: TOWN_START + WALL_WIDTH * 5 + 36,
            rotate: Math.PI * 1.5
        }, {
            x: 3766, y: 1734, rotate: Math.PI * 0.74
        }, {
            rotate: Math.PI * 0.75,
            x: 4281,
            y: 1208,
        }, {
            x: 4285, y: 960, rotate: Math.PI * 1.5
        }];


    return list_left;
})();
