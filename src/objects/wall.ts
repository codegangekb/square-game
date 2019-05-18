import { TOWN_HEIGHT, WALL_HEIGHT, WALL_START, WALL_WIDTH, WALL_X } from './constants';


const GENERATE_LEFT_WALL = (WALLS_LIST) => {
    const LEFT_WALLS_QUANTITY = 4;
    let offset = WALLS_LIST[0].y + TOWN_HEIGHT;
    for (let i = 1; i < LEFT_WALLS_QUANTITY; i++) {
        offset += WALL_WIDTH + TOWN_HEIGHT;
        WALLS_LIST.push({
            x: WALL_X,
            y: offset,
            rotate: Math.PI * 1.5
        })
    }

    return WALLS_LIST;
};


export const GET_WALL_LIST = () => {
    const WALLS_LIST = [
        {
            x: WALL_X,
            y: WALL_START,
            rotate: Math.PI * 1.5
        }
    ];

    return WALLS_LIST.concat(GENERATE_LEFT_WALL(WALLS_LIST));
};
