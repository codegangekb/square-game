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

    const list_top = [{
        x: WALL_X + 125 ,
        y: WALL_START - 14,
        rotate: 0.039
    }];

    for (let i = 0; i < 16; i++) {
        list_top.push({
            x: list_top[i].x + 119.5,
            y: list_top[i].y + 3.6,
            rotate: 0.039
        });
    }

    const list_bottom_first = [{
        x: WALL_X,
        y: list_left[list_left.length - 1].y + 140,
        rotate: Math.PI * 1.07
    }];

    for (let i = 0; i < 9; i++) {
        list_bottom_first.push({
            x: list_bottom_first[i].x + 116,
            y: list_bottom_first[i].y + 26,
            rotate: Math.PI * 1.07
        })
    }

    const list_bottom_second = [{
        x: list_bottom_first[list_bottom_first.length - 1].x + 114,
        y: list_bottom_first[list_left.length - 1].y + 154,
        rotate: Math.PI * 0.95
    }];

    for (let i = 0; i < 2; i++) {
        list_bottom_second.push({
            x: list_bottom_second[i].x + 118,
            y: list_bottom_second[i].y - 18,
            rotate: Math.PI * 0.95
        })
    }

    const list_bottom_third = [{
        x: list_bottom_second[list_bottom_second.length - 1].x + 150,
        y: list_bottom_second[list_bottom_second.length - 1].y - 30,
        rotate: Math.PI * 0.74
    }];

    for (let i = 0; i < 5; i++) {
        list_bottom_third.push({
            x: list_bottom_third[i].x + 82,
            y: list_bottom_third[i].y - 84,
            rotate: Math.PI * 0.75
        })
    }

    const list_right = [{
        x: list_bottom_third[list_bottom_third.length - 1].x + 96,
        y: list_bottom_third[list_bottom_third.length - 1].y - 100,
        rotate: Math.PI * -1.5
    },
    {
        x: list_bottom_third[list_bottom_third.length - 1].x + 96,
        y: list_bottom_third[list_bottom_third.length - 1].y - 215,
        rotate: Math.PI * -1.5
    }];


    console.log(list_right);

    // for(let i = 0; i < 3; i++) {
    //     list_left.push(
    //         {
    //             x: WALL_X,
    //             y:
    //         }
    //     );
    // }

    return list_left.concat(list_bottom_first).concat(list_bottom_second).concat(list_bottom_third).concat(list_right).concat(list_top);
})();
