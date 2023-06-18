import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Load any assets here
    }

    create() {
        // Here, we'll create our menu
        this.add.text(100, 100, 'MidEvil Agents', { color: '#0f0' });

        const playButton = this.add.text(100, 200, 'Play', { color: '#0f0' });
        playButton.setInteractive();

        playButton.on('pointerdown', () => { 
            // Start the game scene
            this.scene.start('GameScene');
        });
    }
}
