export default class Canhao{
    constructor(cena, x, y) {
        this.cena = cena;
        this.x = x;
        this.y = y;
        this.sprite = cena.physics.add.sprite(x, y, 'canhao');
        this.sprite.body.setSize(32, 32);
        this.sprite.setScale(0.5);
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
    }
}