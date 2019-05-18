import { TOWN_HEIGHT, TOWN_START, WALL_HEIGHT, WALL_WIDTH, WALL_X } from './constants';

const GENERATE_LEFT_TOWN = (TOWN_LIST ) => {
    const LEFT_TOWNS_QUANTITY = 5;
    for (let i = 1; i < LEFT_TOWNS_QUANTITY; i++) {
        TOWN_LIST .push({
            x: WALL_X,
            y: TOWN_LIST [i - 1].y + WALL_WIDTH + TOWN_HEIGHT,
            rotate: Math.PI * 1.5
        })
    }

    return TOWN_LIST;
};

export const GET_TOWN_LIST = () => {
    const TOWN_LIST = [
        {
            x: 2100,
            y: TOWN_START,
            rotate: Math.PI * 1.5
        }
    ];

    return TOWN_LIST .concat(GENERATE_LEFT_TOWN(TOWN_LIST ));
};
