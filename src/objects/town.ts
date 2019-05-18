import { TOWN_HEIGHT, TOWN_START, WALL_HEIGHT, WALL_WIDTH, WALL_X } from './constants';

// export const TOWN_LIST = [
//     {
//         x: WALL_X,
//         y: TOWN_START,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1040,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1190,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1344,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1524,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X + 120,
//         y: 1544,
//         rotate: Math.PI * 1.06
//     },
// ];


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
    }];

    // for (let i = 0; i < 4; i++) {
    //     list_left.push(
    //         {
    //             x: WALL_X,
    //             y: list_left[i].y + TOWN_HEIGHT + WALL_WIDTH - 10,
    //             rotate: Math.PI * 1.5
    //         }
    //     );
    // }

    return list_left;
})();
