import Phaser from 'phaser';

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'StartMenu' });
    }

    preload() {
        // Load any assets here
    }

    create() {
        this.add.text(100, 100, 'Hello World', { color: 'white' });
        const startButton = this.add.text(100, 200, 'Click to start!', { color: 'white' });
        startButton.setInteractive({ useHandCursor: true });
        startButton.on('pointerdown', () => {
            this.scene.start('MainScene');
        }
        );
    }
}
