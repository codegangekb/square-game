import { TOWN_HEIGHT, TOWN_START, WALL_HEIGHT, WALL_START, WALL_WIDTH, WALL_X } from './constants';

// export const WALLS_LIST = [
//     {
//         x: WALL_X,
//         y: 919,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1058,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1205,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1425,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1355,
//         rotate: Math.PI * 1.5
//     },
//     {
//         x: WALL_X,
//         y: 1524,
//         rotate: Math.PI * 1.06
//     },
// ];

export const WALLS_LIST = (() => {
    const list_left = [{
        x: WALL_X,
        y: WALL_START - 1,
        rotate: Math.PI * 1.5
    }];

    for (let i = 0; i < 4; i++) {
        list_left.push(
            {
                x: WALL_X,
                y: list_left[i].y + WALL_WIDTH,
                rotate: Math.PI * 1.5
            }
        );
    }

    const list_bottom_first = [{
        x: WALL_X,
        y: list_left[list_left.length - 1].y + 140,
        rotate: Math.PI * 1.07
    }];

    for (let i = 0; i < 9; i++) {
        list_bottom_first.push({
            x: list_bottom_first[i].x + 115,
            y: list_bottom_first[i].y + 25,
            rotate: Math.PI * 1.07
        })
    }

    const list_bottom_second = [{
        x: list_bottom_first[list_bottom_first.length - 1].x + 140,
        y: list_bottom_first[list_left.length - 1].y + 140,
        rotate: Math.PI * 1.1
    }];

    for (let i = 0; i < 9; i++) {
        list_bottom_second.push({
            x: list_bottom_first[i].x + 115,
            y: list_bottom_first[i].y + 25,
            rotate: Math.PI * 1.1
        })
    }

    // for(let i = 0; i < 3; i++) {
    //     list_left.push(
    //         {
    //             x: WALL_X,
    //             y:
    //         }
    //     );
    // }

    return list_left.concat(list_bottom_first);
})();
