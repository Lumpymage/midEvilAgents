import Phaser from 'phaser';
import StartMenu from './scenes/StartMenu';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [StartMenu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};
const game = new Phaser.Game(config);
