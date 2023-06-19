import Phaser from 'phaser';
export default class StartMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }
    preload() {
        // Load any assets here
    }
    create() {
        this.add.text(100, 100, 'Hello World', { color: 'black' });
    }
}
