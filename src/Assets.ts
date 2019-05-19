export class Assets {
    private static instance: Assets;

    private constructor() {
    }

    static getInstance() {
        if (!Assets.instance) {
            Assets.instance = new Assets();
        }
        return Assets.instance;
    }

    isLoaded: boolean;

    assetsMap = {};

    assetsList = [
        'boss.svg',
        'cosmonaut.svg',
        'ded.svg',
        'deva-vesna.svg',
        'dodo.svg',
        'house.svg',
        'maxim_menailo.svg',
        'mer.svg',
        'naum-blik.svg',
        'pizza.svg',
        'player.svg',
        'rinat.svg',
        'roizman.svg',
        'salsa.svg',
        'shahrin.svg',
        'sheremet.svg',
        'square.svg',
        'ten-gubernatora.svg',
        'titushki.svg',
        'town.svg',
        'tsarikov.svg',
        'wall.svg',
        'wall1.svg',
        'wall2.svg',
        'wall3.svg',
        'wall4.svg',
        'wall5.svg',
        'yandex-eda.svg',
        'yandex-eda2.svg',
        'yandex-eda3.svg',
        'devi-u-popa.svg',
        'grupa2.svg',
        'human.svg',
        'we.svg',
        'yandex-eda-tri-parnya.svg'
    ];

    get(name) {
        return this.assetsMap[name];
    }

    private loadOne(name: string) {
        return new Promise((res) => {
            const image = new Image();
            image.src = 'public/' + name;
            image.onload = () => {
                this.assetsMap[name] = image;
                res();
            }
        });
    }

    load() {
        return Promise.all(
            this.assetsList.map(this.loadOne.bind(this))
        )
    }
}
